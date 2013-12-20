/**
 * License: MIT
 * Author: Ryan (Havvy) Scheel
 *
 * Note: command.isSubcommand is for a custom CommandHandler.
 */


var dados = require("dados");
var Hrandom = require('hrandom');

module.exports = function TennuLuckModule (tennu) {
    var Random = new Hrandom(Date.now());

    function roll (command) {
        var request = command.args.join("");
        var result = dados.roll(request);

        if (command.isSubcommand) {
            return result;
        }

        if(!isNaN(result)) {
            return "Rolling " + request + " | Result: " + result;
        } else {
            return "Failed to roll " + request + ".";
        }
    }

    function which (command) {
        var chosen =  Random.nextElement(command.args);

        if (command.isSubcommand) {
            return chosen;
        }

        return 'Choosing ' + chosen + '.');
    }

    function sample (command) {
        var args = command.args.slice();
        var n = Math.floor(+args.shift());

        if (n === 0) {
            return "Sampling nothing.";
        }

        if (n < 0) {
            return "Error: Cannot sample negative options.";
        }

        if (n > args.length) {
            return "Not enough options to sample.";
        }

        var sampled = Random.nextElements(args, n);

        if (command.isSubcommand) {
            return sampled;
        }

        return 'Sampled [' + sampled.join(', ') + ']';
    }

    return {
        exports : {
            "Random" : Random
        },

        handlers : {
            "!roll" : roll,
            "!choose !which" : which,
            "!sample" : sample
        }
    };

};