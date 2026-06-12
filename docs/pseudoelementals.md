# Pseudoelementals

## Rock Paper Scissors
Pseudoelementals is rock paper scissors with a twist. Only one object is a rock, paper, scissors. By playing as many duels as the player wants, they have to identify aliases, to be either rock paper or scissors.

- Water beats fire
- Fire beats earth
- Earth beats water

The game board has six slots. One of which is water, fire, or earth. The goal of the game is for the player to identify what pseudoelement an artifact is made of. The theming may suggest clues, hard metal objects are pseudoelementals of fire, anything flammable are pseudoelementals of earth, and magical objects, including gemstones, are pseudoelementals of water. Still, even if the player can figure out and predict the pseudoelementals, they still need to play the game in order to declare its pseudoelement.

## Game-state index & GUI visual index
Working with this component taught me to seperate source-of-truth-state from the visual corresponding state.

## Technical
### function handleCpuRotateDisc at rps.events
The handleRotate function may only accept 1 or -1. Passing another value such as 2 will cause issues with the transition between the roof and the floor values, creating a mismatch. To make it spin further than just one slot, simply call the function twice or more.
```js
// incorrect ❌
handleRotate(-2);

// correct ✅
handleRotate(-1);
handleRotate(-1);
```