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

            if (args.length === 0) {
                return 'Format: sample <n> <option>...';
            }

            const n = Math.floor(+args.shift());

            if (Object.is(n, NaN)) {
                return "Error: First argument must be a number.";
            }

            if (n === 0) {
                return 'Error: Sampling nothing.';
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

            commands: ['choose', 'which', 'coin', 'roll', 'sample'],

            help: {
                'choose': [
                    '!choose <option>...',
                    '',
                    'Randomly chooses one of the options.',
                    'Ex: !choose A B C',
                    '<bot> Choosing C.'
                ],

                'which': 'Alias for !choose',

                'roll': [
                    '!roll <formula>',
                    '',
                    'Rolls the give formula.',
                    'Has support for +, *, /, -, `d`, ()',
                    'Unknown characters and `d` operators on the outside are stripped.',
                    'Ex: !roll (4d5 + 1d2d3) * 3',
                    '<bot> Rolling (4d5 + 1d2d3) * 3 | Result: 51',
                    '',
                    'Ex: !roll 1d6 for damaging the grue',
                    '<bot>: Rolling 1d6 for damaging the grue | Result: 6'
                ],

                'sample': [
                    '!sample <n> <option>...',
                    '',
                    'Chooses n options from the list of options.',
                    'Ex: sample 2 A B C D E F',
                    '<bot> Sampled [D, F]'
                ],

                'coin': [
                    '!coin',
                    '',
                    'Bot responds with either "Heads" or "Tails"'
                ]
            }
        };
    }
};