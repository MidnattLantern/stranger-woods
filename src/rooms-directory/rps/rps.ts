import type { ISlot } from "./models";
import { rpsBatch } from "./rps.batch";
import { rpsELifecycle } from "./rps.elifecycle";
import { rpsStoryController } from "./rps.story";
import "./rps.styles.scss";
import { rpsUI, rpsUIAssignTable } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";
import batchPreset1 from "./batch-preset-1.json";
import { rpsAssignTable } from "./rps.assign-table";

function rockPaperScissors(
    rpsSceneWrapper: any = null,
    playerSelectedSlotIndex: number = 0,
    playerDiscRotationIndex: number = 0,
    playerRpsBatch: ISlot[],
    cpuSelectedSlotIndex: number = 0,
    cpuDiscRotationIndex: number = 0,
    cpuRpsBatch: ISlot[],
    assignTableOpen: boolean = false
) {
    const gameSessionWrapper = rpsUI.gameSessionWrapper();
    const buttonsTable = rpsUI.buttonsTable();
    const rpsPlayerButtons = rpsUI.rpsPlayerButtons();
    const rpsCpuButtons = rpsUI.rpsCpuButtons();
    const duelRailway = rpsUI.duelRailway();
    const playerRailwayItem = rpsUI.playerRailwayItem();
    const cpuRailwayItem = rpsUI.cpuRailwayItem();

    // Assign table
    const assignTableWrapper = rpsUIAssignTable.assignTableWrapper();
    const assignTableTableContainer = rpsUIAssignTable.assignTableTableContainer();
    const showHideAssignTableButton = rpsUIAssignTable.showHideAssignTableButton();
    const rpsAssignTableTable = rpsAssignTable.rpsAssignTableTable();

    // assignTableWrapper.addEventListener("click", rpsAssignTable.handleToggleAssignTable);
    showHideAssignTableButton.addEventListener("click", rpsAssignTable.handleToggleAssignTable);

    assignTableWrapper.append(assignTableTableContainer, showHideAssignTableButton);

    function getShowHideAssignTableButton() {
        return showHideAssignTableButton;
    };

    function getAssignTableOpen() {
        return assignTableOpen;
    };

    function toggleAssignTableOpen() {
        console.log("foo");
        assignTableOpen = !assignTableOpen;
        if (assignTableOpen) {
            setTimeout(() => {
                rpsAssignTableTable.classList.remove("hide-table");
            }, 150);
            assignTableTableContainer.append(rpsAssignTableTable);
            assignTableWrapper.classList.add("assign-table__expanded");
        } else {
            setTimeout(() => {
                assignTableTableContainer.innerHTML = '';
                assignTableWrapper.classList.remove("assign-table__expanded");
            }, 150);
            rpsAssignTableTable.classList.add("hide-table");
        }
    };

    function initialize() {
        rpsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
        rpsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
        rpsSceneWrapper.setAttribute("tabindex", 0);
        sceneWrapper.append(rpsSceneWrapper);
        rpsStoryController.handleInitializeStoryline();
        rpsELifecycle.beginFullscreenNextStorylineLifecycle();
        rpsSceneWrapper.focus();
        // test
        setPlayerRpsBatch(batchPreset1);
        setCpuRpsBatch(rpsBatch.shuffleBatch("fire"));
    }

    function getRpsSceneWrapper() {
        return rpsSceneWrapper;
    }

    function getDuelRailway() {
        return duelRailway;
    }

    // ======
    // player
    // ======
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

    function getRpsPlayerButtons() {
        return rpsPlayerButtons;
    }

    function getPlayerRailwayItem() {
        return playerRailwayItem;
    }

    function getPlayerRpsBatch() {
        return playerRpsBatch;
    }

    function setPlayerRpsBatch(newBatch: ISlot[] | any) {
        playerRpsBatch = newBatch;
    }
    // ======

    // ===
    // cpu
    // ===
    function getCpuSelectedSlotIndex() {
        return cpuSelectedSlotIndex;
    }

    function setCpuSelectedIndex(newIndex: number) {
        cpuSelectedSlotIndex = newIndex;
    }

    function getCpuDiscRotationIndex() {
        return cpuDiscRotationIndex;
    }

    function setCpuDiscRotationIndex(newIndex: number) {
        cpuDiscRotationIndex = newIndex;
    }

    function getCpuRailwayItem() {
        return cpuRailwayItem;
    }

    function getCpuRpsBatch() {
        return cpuRpsBatch;
    }

    function setCpuRpsBatch(newBatch: ISlot[]) {
        cpuRpsBatch = newBatch;
    }
    // ===

    function handleBeginRpsGame() {
        rpsELifecycle.endFullscreenNextStorylineLifecycle();
        dialogueBox.hideDialogueBox();
        rpsSceneWrapper.focus();

        rpsSceneWrapper.append(gameSessionWrapper);
        gameSessionWrapper.append(buttonsTable, assignTableWrapper);
        buttonsTable.append(
            rpsPlayerButtons,
            rpsCpuButtons,
            duelRailway
        );
        duelRailway.append(
            playerRailwayItem,
            cpuRailwayItem
        );

        rpsELifecycle.beginPlayerSlotsLifecycle();
        rpsELifecycle.beginCpuSlotsLifecycle();
    }

    function handleEndRpsGame() {
        rpsSceneWrapper.remove();
        rpsSceneWrapper = null;
    }

    return {
        initialize,
        getRpsSceneWrapper,
        getDuelRailway,
        getPlayerSelectedSlotIndex,
        setPlayerSelectedIndex,
        getPlayerDiscRotationIndex,
        setPlayerDiscRotationIndex,
        getRpsPlayerButtons,
        getPlayerRailwayItem,
        getPlayerRpsBatch,
        setPlayerRpsBatch,
        getCpuSelectedSlotIndex,
        setCpuSelectedIndex,
        getCpuDiscRotationIndex,
        setCpuDiscRotationIndex,
        getCpuRailwayItem,
        getCpuRpsBatch,
        setCpuRpsBatch,
        handleBeginRpsGame,
        handleEndRpsGame,
        getShowHideAssignTableButton,
        getAssignTableOpen,
        toggleAssignTableOpen
    }
}

export const rps = rockPaperScissors();