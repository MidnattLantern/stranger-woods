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
import expandTableIcon from "@assets/expand-table-icon.svg?raw";
import closeTableIcon from "@assets/close-table-icon.svg?raw";
import { rpsAnimate } from "./rps.animate";

function rockPaperScissors(
    rpsSceneWrapper: any = null,
    playerSelectedSlotIndex: number = 0,
    playerDiscRotationIndex: number = 0,
    playerRpsBatch: ISlot[],
    cpuSelectedSlotIndex: number = 0,
    cpuDiscRotationIndex: number = 0,
    cpuRpsBatch: ISlot[],
    assignTableOpen: boolean = false,
    assignTableSelectedIndex: number = 0
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
    const rpsAssignTableTable = rpsUIAssignTable.assignTableContents();

    showHideAssignTableButton.addEventListener("click", toggleAssignTableOpen);

    assignTableWrapper.append(showHideAssignTableButton, assignTableTableContainer);

    function getShowHideAssignTableButton() {
        return showHideAssignTableButton;
    };

    function getAssignTableOpen() {
        return assignTableOpen;
    };

    function getAssignTableSelectedIndex() {
        return assignTableSelectedIndex;
    };

    function setAssignTableSelectedIndex(newIndex: number) {
        assignTableSelectedIndex = newIndex;
    };

    function toggleAssignTableOpen() {
        assignTableOpen = !assignTableOpen;
        if (assignTableOpen) {
            setTimeout(() => {
                rpsAssignTableTable.classList.remove("hide-table");
                const focusAssignItem = document.getElementById(`assign-item-index-${assignTableSelectedIndex}`);
                const switchElementVesselToActivate = document.getElementById(`switch-element-vessel-${assignTableSelectedIndex}`);
                switchElementVesselToActivate?.append(rpsAssignTable.elementSelector());
                if (!focusAssignItem) return;
                focusAssignItem.classList.add("assign-table__focused-item");
                focusAssignItem.focus();
                rpsAnimate.openElementSlider();
            }, 100);
            rpsELifecycle.pauseMouseTapInputLifecycle();
            rpsELifecycle.pausePlayerSlotsLifecycle();
            rpsELifecycle.resumeAssignTableInputLifecycle();
            showHideAssignTableButton.innerHTML = `Hide assign table ${closeTableIcon}`;
            assignTableTableContainer.append(rpsAssignTableTable);
            assignTableWrapper.classList.add("assign-table__expanded");
        } else {
            setTimeout(() => {
                assignTableTableContainer.innerHTML = '';
                assignTableWrapper.classList.remove("assign-table__expanded");
                rpsELifecycle.resumeMouseTapInputLifecycle();
                rpsELifecycle.resumePlayerSlotsLifecycle();
                rpsELifecycle.pauseAssignTableInputLifecycle();
                rpsSceneWrapper.focus();
            }, 100);
            showHideAssignTableButton.innerHTML = `Show assign table ${expandTableIcon}`;
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
        // mock data
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
        rpsELifecycle.beginCanToggleAssignTable();
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
        toggleAssignTableOpen,
        getAssignTableSelectedIndex,
        setAssignTableSelectedIndex
    }
}

export const rps = rockPaperScissors();