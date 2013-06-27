Tennu IRC Framework Luck Module

This module provides four commands for a Tennu Bot.

## Roll

Roll's dice, as per the `dados` module.

<user>tennu: roll 4d6+12
<tennu>Rolling 4d6+12 | Result: 25

## Which and Choose

Takes a list of choices, and randomly selects one.

<user>tennu: choose A B C
<tennu>Choosing B.

## Sample

Takes a number and a list of choices, and randomly selects that number of
choices from the list.

<user>tennu: sample 2 A B C D
<tennu>Sampled: [A, D]