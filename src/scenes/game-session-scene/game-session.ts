//import { memory } from "../../rooms-directory/memory/memory";
import { rockPaperScissors } from "../../rooms-directory/rock-paper-scissors/rock-paper-scissors";

export function renderGameSessionScene() {
    var roomDice: number;
    roomDice = Math.random();
    console.log(roomDice);
    if (roomDice <= 0.5) {
        rockPaperScissors();
    } else {
        rockPaperScissors();
    }
}