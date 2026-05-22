import { rpsEvents } from "./rps.events";
import { rpsStoryController } from "./rps.story";
import "./rps.styles.scss";
import { rpsUI } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";

function rockPaperScissors() {
    // let rpsResources = null;
    let rpsSceneWrapper: any = null;
    let playerSelectedSlotIndex: number = 0;
    let playerDiscRotationIndex: number = 0;

    function initialize() {
        rpsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
        rpsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
        rpsSceneWrapper.setAttribute("tabindex", 0);
        sceneWrapper.append(rpsSceneWrapper);
        rpsStoryController.handleInitializeStoryline();
        rpsEvents.beginFullscreenNextStorylineLifecycle();
        // rpsResources = { rpsSceneWrapper };
        rpsSceneWrapper.focus();
    };

    function getRpsSceneWrapper() {
        return rpsSceneWrapper;
    };

    function getPlayerSelectedSlotIndex() {
        return playerSelectedSlotIndex;
    };

    function setPlayerSelectedIndex(newIndex: number) {
        playerSelectedSlotIndex = newIndex;
    };

    function getPlayerDiscRotationIndex() {
        return playerDiscRotationIndex;
    }

    function setPlayerDiscRotationIndex(newIndex: number) {
        playerDiscRotationIndex = newIndex;
    }

    function handleBeginRpsGame() {
        rpsEvents.endFullscreenNextStorylineLifecycle();
        dialogueBox.hideDialogueBox();
        rpsSceneWrapper.focus();

        const gameSessionWrapper = rpsUI.gameSessionWrapper();
        const buttonsTable = rpsUI.buttonsTable();
        const rpsPlayerButtons = rpsUI.rpsPlayerButtons();

        rpsSceneWrapper.append(gameSessionWrapper);
        gameSessionWrapper.append(buttonsTable);
        buttonsTable.append(rpsPlayerButtons);

        // rpsResources = { gameSessionWrapper, buttonsTable, rpsPlayerButtons };
        rpsEvents.beginPlayerSlotsLifecycle();
    }

    function handleEndRpsGame() {
        rpsSceneWrapper.remove();
        rpsSceneWrapper = null;
        // rpsResources = null;
    }

    return {
        initialize,
        getRpsSceneWrapper,
        getPlayerSelectedSlotIndex,
        setPlayerSelectedIndex,
        getPlayerDiscRotationIndex,
        setPlayerDiscRotationIndex,
        handleBeginRpsGame,
        handleEndRpsGame
    }
}

export const rps = rockPaperScissors();