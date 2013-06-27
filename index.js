var dados = require("dados");
var Hrandom = require('hrandom');

module.exports = function TennuLuckModule (tennu) {
    var Random = new Hrandom(Date.now());

    function roll (command) {
        var result = dados.roll(command.args.join(""));

        if(!isNaN(result)) {
            tennu.say(command.channel, "Rolling " + command.args.join(" ") + " | Result: " + result);
        } else {
            tennu.say(command.channel, "Failed to roll " + command.args.join(" ") + ".");
        }
    }

    function which (command) {
        var chosen =  Random.nextElement(command.args);
        tennu.say(command.channel, 'Choosing ' + chosen + '.');
    }

    function sample (command) {
        var args = command.args.slice();
        var n = Math.floor(+args.shift());

        if (n === 0) {
            tennu.say(command.channel, "Sampling nothing.");
            return;
        }

        if (n < 0) {
            tennu.say(command.channel, "Error: Cannot sample negative options.");
            return;
        }

        if (n > args.length) {
            tennu.say(command.channel, "Not enough options to sample.");
            return;
        }

        var sampled = Random.nextElements(args, n);
        tennu.say(command.channel, 'Sampled [' + sampled.join(', ') + ']');
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