/**
 * License: ISC
 * Author: Ryan (Havvy) Scheel
 */


const dados = require('dados');
const Hrandom = require('hrandom');
const format = require('util').format;

module.exports = {
    init: function TennuLuckModule (tennu) {
        const Random = new Hrandom(Date.now());

        function roll (command) {
            const request = command.args.join('');
            const result = dados.roll(request);

            if(!isNaN(result)) {
                return format('Rolling %s | Result: %s', command.args.join(' '), result);
            } else {
                return format('Failed to roll %s.', request);
            }
        }

        function which (command) {
            const chosen = Random.nextElement(command.args);

            return format('Choosing %s.', chosen);
        }

        function sample (command) {
            const args = command.args.slice();
            const n = Math.floor(+args.shift());

            if (n === 0) {
                return 'Error Sampling nothing.';
            }

            if (n < 0) {
                return 'Error: Cannot sample negative options.';
            }

            if (n > args.length) {
                return 'Error: Not enough options to sample.';
            }

            const sampled = Random.nextElements(args, n);

            return 'Sampled [' + sampled.join(', ') + ']';
        }

        function coin (command) {
            var flip = Random.nextBoolean();

            if (flip) {
                return 'Heads';
            } else {
                return 'Tails';
            }
        }

        return {
            exports : {
                'Random' : Random
            },

            handlers : {
                '!coin': coin,
                '!roll' : roll,
                '!choose !which' : which,
                '!sample' : sample
            },

            commands: ['choose', 'which', 'coin', 'roll', 'sample']
        };

    }
};