import { rpsEvents } from "./rps.events";
import { rpsStoryController } from "./rps.story";
import "./rps.styles.scss";
import { rpsUI } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";

function rockPaperScissors() {
    const rpsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();

    function initialize() {
        rpsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
        sceneWrapper.append(rpsSceneWrapper);
        rpsStoryController.handleInitializeStoryline();
        //test
        // handleBeginRpsGame();
    }

    function handleBeginRpsGame() {   
        dialogueBox.hideDialogueBox();

        const gameSessionWrapper = rpsUI.gameSessionWrapper();
        const buttonsTable = rpsUI.buttonsTable();
        const rpsPlayerButtons = rpsUI.rpsPlayerButtons();

        rpsSceneWrapper.append(gameSessionWrapper);
        gameSessionWrapper.append(buttonsTable);
        buttonsTable.append(rpsPlayerButtons);

        rpsEvents.beginPlayerSlot1Lifecycle();
        rpsEvents.beginPlayerSlot2Lifecycle();
        rpsEvents.beginPlayerSlot3Lifecycle();
    }

    function handleEndRpsGame() {
        rpsEvents.endPlayerSlot1Lifecycle();
        rpsEvents.endPlayerSlot2Lifecycle();
        rpsEvents.endPlayerSlot3Lifecycle();
    }

    return {
        initialize,
        handleBeginRpsGame,
        handleEndRpsGame
    }
}

export const rps = rockPaperScissors();