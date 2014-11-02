// const sinon = require('sinon');
const assert = require('better-assert');
// const equal = require('deep-eql');
const inspect = require('util').inspect;
const format = require('util').format;

const debug = false;
const logfn = debug ? console.log.bind(console) : function () {};

const LuckPlugin = require('../plugin');

describe "Luck Plugin:" {
    var luck;

    const call = function (handler, command) {
        return luck.handlers[handler].call(null, command);
    }

    beforeEach {
        luck = LuckPlugin.init({}, {});
    }

    it "!coin returns either head or tails" {
        const res = call("!coin", {});

        assert(res === "Heads" || res === "Tails");
    }

    describe "!sample" {
        it "returns a help message with no arguments" {
            const res = call("!sample", {args: []});

            assert(res === "Format: sample <n> <option>...");
        }

        it "returns an error message when sampling zero" {
            const res = call("!sample", {args: ["0"]});

            assert(res === "Error: Sampling nothing.");
        }

        it "returns an error when sampling more than the total" {
            const res = call("!sample", {args: ["1"]});

            assert(res === "Error: Not enough options to sample.");
        }

        it "returns an error when sampling a negative number" {
            const res = call("!sample", {args: ["-1"]});

            assert(res === "Error: Cannot sample negative options.");
        }

        it "returns an error when sampling a NaN" {
            const res = call("!sample", {args: ["this_is_not_a_number"]});

            assert(res === "Error: First argument must be a number.");
        }

        it "returns the only value given when sampling one of a single argument" {
            const res = call("!sample", {args: ["1", "only"]});

            assert(res === "Sampled [only]");
        }

        it "comma deliminates values in the sampled results `array`" {
            const res = call("!sample", {args: ["2", "first", "second"]});
            const sampled = res.slice(res.indexOf("[") + 1, -1).split(", ");

            assert(sampled.length === 2);
            assert(sampled.indexOf("first") !== -1);
            assert(sampled.indexOf("second") !== -1);
        }

        it "only gives the sampled number of elements in the set" {
            const res = call("!sample", {args: ["1", "first", "second"]});
            const sampled = res.slice(res.indexOf("[") + 1, -1).split(", ");

            assert(sampled.length === 1);

            const firstInSample = sampled.indexOf("first") !== -1;
            const secondInSample = sampled.indexOf("second") !== -1;

            assert((firstInSample || secondInSample) && !(firstInSample && secondInSample));
        }
    }
}