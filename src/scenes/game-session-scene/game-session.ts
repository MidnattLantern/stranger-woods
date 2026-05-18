//import { memory } from "../../rooms-directory/memory/memory";
import { rps } from "../../rooms-directory/rps/rps";

export function renderGameSessionScene() {
    var roomDice: number;
    roomDice = Math.random();
    console.log(roomDice);
    if (roomDice <= 0.5) {
        rps.initialize();
    } else {
        rps.initialize();
    }
}