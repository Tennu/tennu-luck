/**
 * License: MIT
 * Author: Ryan (Havvy) Scheel
 *
 * Note: command.isSubcommand is for a custom CommandHandler.
 */


const dados = require('dados');
const Hrandom = require('hrandom');

module.exports = {
    init: function TennuLuckModule (tennu) {
        const Random = new Hrandom(Date.now());

        function roll (command) {
            const request = command.args.join('');
            const result = dados.roll(request);

            if(!isNaN(result)) {
                return 'Rolling ' + request + ' | Result: ' + result;
            } else {
                return 'Failed to roll ' + request + '.';
            }
        }

        function which (command) {
            const chosen = Random.nextElement(command.args);

            return 'Choosing ' + chosen + '.');
        }

        function sample (command) {
            const args = command.args.slice();
            const n = Math.floor(+args.shift());

            if (n === 0) {
                return 'Sampling nothing.';
            }

            if (n < 0) {
                return 'Error: Cannot sample negative options.';
            }

            if (n > args.length) {
                return 'Not enough options to sample.';
            }

            const sampled = Random.nextElements(args, n);

            return 'Sampled [' + sampled.join(', ') + ']';
        }

        return {
            exports : {
                'Random' : Random
            },

            handlers : {
                '!roll' : roll,
                '!choose !which' : which,
                '!sample' : sample
            }
        };

    }
};