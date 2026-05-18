import { rpsEvents } from "./rps.events";
import "./rps.styles.scss";
import { rpsUI } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";

export function rockPaperScissors() {
    const gameSessionWrapper = rpsUI.gameSessionWrapper();

    const rockPaperScissorsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
    rockPaperScissorsSceneWrapper.append(dialogueBox.dialogueBoxContainer);

    function handleBeginRpsGame() {
        dialogueBox.hideDialogueBox();
        rockPaperScissorsSceneWrapper.append(gameSessionWrapper);
        rpsEvents.beginPlayerSlot1Lifecycle();
        rpsEvents.beginPlayerSlot2Lifecycle();
        rpsEvents.beginPlayerSlot3Lifecycle();
    }

    function handleEndRpsGame() {
        rpsEvents.endPlayerSlot1Lifecycle();
        rpsEvents.endPlayerSlot2Lifecycle();
        rpsEvents.endPlayerSlot3Lifecycle();
        rockPaperScissorsSceneWrapper.innerHTML = '';
    }

    // core ui collectors
    const buttonsTable = rpsUI.buttonsTable();
    const rpsPlayerButtons = rpsUI.rpsPlayerButtons();
    const rpsComputerButtons = rpsUI.rpsComputerButtons();
    const duelStatusTable = rpsUI.duelStatusTable();

    // core ui assemblers
    sceneWrapper.append(rockPaperScissorsSceneWrapper);
    gameSessionWrapper.append(buttonsTable, duelStatusTable);
    buttonsTable.append(rpsPlayerButtons, rpsComputerButtons);

    //initialization
    handleBeginRpsGame();
}