# Pseudoelementals

## Rock Paper Scissors
Pseudoelementals is rock paper scissors with a twist. Only one object is a rock, paper, scissors. By playing as many duels as the player wants, they have to identify aliases, to be either rock paper or scissors.

- Water beats fire
- Fire beats earth
- Earth beats water

The game board has six slots. One of which is water, fire, or earth. The goal of the game is for the player to identify what pseudoelement an artifact is made of. The theming may suggest clues, hard metal objects are pseudoelementals of fire, anything flammable are pseudoelementals of earth, and magical objects, including gemstones, are pseudoelementals of water. Still, even if the player can figure out and predict the pseudoelementals, they still need to play the game in order to declare its pseudoelement.

## Game-state index & GUI visual index
Working with this component taught me to seperate source-of-truth-state from the visual corresponding state.

## event handling and lifecycle
rps.lifecycle-events.ts export a library of functions. These may only be accessed and used by rps.elifecycle.ts