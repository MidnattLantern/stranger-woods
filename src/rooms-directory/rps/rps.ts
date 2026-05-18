import { rpsEvents } from "./rps.events";
import { rpsStoryController } from "./rps.story";
import "./rps.styles.scss";
import { rpsUI } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";

function rockPaperScissors() {
    let rpsResources = null;
    let rpsSceneWrapper: any = null;
    let playerSelectedSlotIndex: number = 2;

    function initialize() {
        rpsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
        rpsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
        rpsSceneWrapper.setAttribute("tabindex", 0);
        sceneWrapper.append(rpsSceneWrapper);
        rpsStoryController.handleInitializeStoryline();
        rpsResources = { rpsSceneWrapper };
    }

    function getRpsSceneWrapper() {
        return rpsSceneWrapper;
    };

    function getPlayerSelectedSlotIndex() {
        return playerSelectedSlotIndex;
    };

    function setPlayerSelectedIndex(newIndex: number) {
        playerSelectedSlotIndex = newIndex;
    };

    function handleBeginRpsGame() {
        dialogueBox.hideDialogueBox();
        rpsSceneWrapper.focus();

        const gameSessionWrapper = rpsUI.gameSessionWrapper();
        const buttonsTable = rpsUI.buttonsTable();
        const rpsPlayerButtons = rpsUI.rpsPlayerButtons();

        rpsSceneWrapper.append(gameSessionWrapper);
        gameSessionWrapper.append(buttonsTable);
        buttonsTable.append(rpsPlayerButtons);

        rpsResources = { gameSessionWrapper, buttonsTable, rpsPlayerButtons };
        rpsEvents.beginPlayerSlot1Lifecycle();
        rpsEvents.beginPlayerSlot2Lifecycle();
        rpsEvents.beginPlayerSlot3Lifecycle();
        rpsEvents.beginKeyboardInputLifecycle();        
    }

    function handleEndRpsGame() {
        rpsEvents.endPlayerSlot1Lifecycle();
        rpsEvents.endPlayerSlot2Lifecycle();
        rpsEvents.endPlayerSlot3Lifecycle();
        rpsEvents.endKeyboardInputLifecycle();

        rpsSceneWrapper.remove();
        rpsSceneWrapper = null;
        rpsResources = null;
    }

    return {
        initialize,
        getRpsSceneWrapper,
        getPlayerSelectedSlotIndex,
        setPlayerSelectedIndex,
        handleBeginRpsGame,
        handleEndRpsGame
    }
}

export const rps = rockPaperScissors();