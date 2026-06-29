import type { ISlot } from "./models";
import { rpsBatch } from "./rps.batch";
import { rpsELifecycle } from "./rps.elifecycle";
import { rpsStoryController } from "./rps.story";
import "./rps.styles.scss";
import { rpsUI, rpsUIAssignTable } from "./rps.ui";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";
import batchPreset1 from "./batch-preset-1.json";
import type { IAssignedElementTable } from "./models";
import { rpsEvents } from "./rps.events";

function rockPaperScissors(
    rpsSceneWrapper: any = null,
    playerSelectedSlotIndex: number = 0,
    playerDiscRotationIndex: number = 0,
    playerRpsBatch: ISlot[],
    cpuSelectedSlotIndex: number = 0,
    cpuDiscRotationIndex: number = 0,
    cpuRpsBatch: ISlot[],
    assignTableOpen: boolean = false,
    assignTableSelectedIndex: number = 0,
    assignItems: HTMLTableRowElement[] = []
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
    const assignTableContainer = rpsUIAssignTable.assignTableContainer();
    const showHideAssignTableButton = rpsUIAssignTable.showHideAssignTableButton();
    let assignTableContents: null | HTMLTableElement;

    // Assign table assigned elements for items
    let assignedElementTable: IAssignedElementTable[] = [
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"},
        { element: "fire"}
    ];

    function getAssignTableWrapper() {
        if (assignTableWrapper) {
            return assignTableWrapper;
        } else {
            console.error("assignTableWrapper either hasn't been initialized or couldn't be found");
        }
    }

    function getAssignTableContainer() {
        if (assignTableContainer) {
            return assignTableContainer;
        } else {
            console.error("assignTableContainer either hasn't been initialized or couldn't be found");
        }
    }

    function getAssignTableContents() {
        if (assignTableContents) {
            return assignTableContents;
        } else {
            console.error("assignTableContents either hasn't been initialized or couldn't be found");
        }
    };

    function getAssignedElementTable() {
        return assignedElementTable;
    };
    function getAssignedElementItem(targetIndex: number) {
        return assignedElementTable[targetIndex];
    };
    function setAssignedElementTable(targetIndex: number, value: null | "fire" | "water" | "earth") {
        assignedElementTable[targetIndex].element = value;
    };

    function getAssignItems() {
        return assignItems;
    };

    function appendAssignItem(newItem: HTMLTableRowElement) {
        assignItems.push(newItem);
    }

    showHideAssignTableButton.addEventListener("click", toggleAssignTableOpen);

    assignTableWrapper.append(showHideAssignTableButton, assignTableContainer);

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
            rpsEvents.handleOpenAssignTable();
        } else {
            rpsEvents.handleCloseAssignTable();
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
        setPlayerRpsBatch(batchPreset1);
        setCpuRpsBatch(rpsBatch.shuffleBatch("fire"));
        assignTableContents = rpsUIAssignTable.assignTableContents();
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
    };

    function setPlayerDiscRotationIndex(newIndex: number) {
        playerDiscRotationIndex = newIndex;
    };

    function getRpsPlayerButtons() {
        return rpsPlayerButtons;
    };

    function getPlayerRailwayItem() {
        return playerRailwayItem;
    };

    function getPlayerRpsBatch() {
        return playerRpsBatch;
    };

    function setPlayerRpsBatch(newBatch: ISlot[] | any) {
        playerRpsBatch = newBatch;
    };
    // ======

    // ===
    // cpu
    // ===
    function getCpuSelectedSlotIndex() {
        return cpuSelectedSlotIndex;
    };

    function setCpuSelectedIndex(newIndex: number) {
        cpuSelectedSlotIndex = newIndex;
    };

    function getCpuDiscRotationIndex() {
        return cpuDiscRotationIndex;
    };

    function setCpuDiscRotationIndex(newIndex: number) {
        cpuDiscRotationIndex = newIndex;
    };

    function getCpuRailwayItem() {
        return cpuRailwayItem;
    };

    function getCpuRpsBatch() {
        return cpuRpsBatch;
    };

    function setCpuRpsBatch(newBatch: ISlot[]) {
        cpuRpsBatch = newBatch;
    };
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
    };

    function handleEndRpsGame() {
        rpsSceneWrapper.remove();
        rpsSceneWrapper = null;
    };

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
        setAssignTableSelectedIndex,
        getAssignedElementTable,
        getAssignedElementItem,
        setAssignedElementTable,
        getAssignItems,
        appendAssignItem,
        getAssignTableContents,
        getAssignTableContainer,
        getAssignTableWrapper
    }
};

export const rps = rockPaperScissors();