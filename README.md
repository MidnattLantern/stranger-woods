# Strange Woods
Live link: [MidnattLantern.github.io/stranger-woods](https://MidnattLantern.github.io/stranger-woods/)

## Table of contents
1. [Initial source & acknowledgement](#initial-source--acknowledgement)
2. [About the game](#about-the-game)
3. [How to play](#how-to-play)
4. [Code base & architectire](#code-base--architectire)
5. [Technologies](#technologies)
6. [Acknowledgements](#acknowledgements)

## Initial source & acknowledgement
This is Midnatt Lantern's forked edition, expanded and refactored solo according to their direction. The initial source can be found at: [github.com/Medieinstitutet/fed25d-js-intro-grupparbete-the-dopefish-admirers](https://github.com/Medieinstitutet/fed25d-js-intro-grupparbete-the-dopefish-admirers)

Initial staff team:
- [Alma Isaksson](https://github.com/MidnattLantern),
- [Linn Boekhout](https://github.com/Linboe),
- [Alda Catovic](https://github.com/aldacat-fed),
- [Isabelle Reynolds](https://github.com/isabelletherese),
- [Kimi Leminaho](https://github.com/Prxjec-t),
- [Rasmus Fransson](https://github.com/RasmusFranssonHub)

## About the Game
Stranger Woods is a digital escape room experience set in a mysterious woodland filled with secrets and wonders. Legend has it that those who enter may never return — but brave souls who dare to venture in may discover incredible things.

The game consists of multiple interconnected rooms. The first few each conceal hidden artifacts, and collecting them is the key to unlocking and conquering the Final Room and claiming your escape. However, not all artifacts are what they seem, some of which are impostors. Using either imporstor in the Final Room will make it unsolvable, so choose wisely. If you find yourself stuck, you may need to retrace your steps and hunt down the correct artifact before time runs out.

Stranger Woods is a part of vocational training in frontend development. This game was initially developed in a team, but this fork is a solo continuation of the developer Alma Isaksson.

## How to Play
- You have a 50-minute total timer to escape the forest. Every second counts.
- Each room has its own individual timer, solve the room before time runs out. If you fail, you must replay it and the lost time is deducted from your total.
- Collect the artifacts hidden in each of the first five rooms. The artifacts are required to complete the Final Room.
- Complete the game fast enough and you may earn a place on the Top 10 Highscore — and share your results with the world.

### Pseudoelementals (Rock Paper Scissors)
Pseudoelementals is rock paper scissors with a twist. Only one object is a rock, paper, scissors. By playing as many duels as the player wants, they have to identify aliases, to be either rock paper or scissors.

- Water beats fire
- Fire beats earth
- Earth beats water

The game board has six slots. One of which is water, fire, or earth. The goal of the game is for the player to identify what pseudoelement an artifact is made of. The theming may suggest clues, hard metal objects are pseudoelementals of fire, anything flammable are pseudoelementals of earth, and magical objects, including gemstones, are pseudoelementals of water. Still, even if the player can figure out and predict the pseudoelementals, they still need to play the game in order to declare its pseudoelement.

## Code base & architectire
### Dialogue handling
Any dialogue should be stored as json data inside the stories-data directory.

## Technologies
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Acknowledgements
- https://www.vecteezy.com/
- https://se.pinterest.com/pin/5840674512148924/
- https://se.pinterest.com/pin/836614068286535645/
