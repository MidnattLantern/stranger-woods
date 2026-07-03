import { rps } from "./rps";
import { rpsEvents } from "./rps.events";
import { rpsGame } from "./rps.game";

// =====
// begin
// =====
function beginFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleFullscreenNextStoryline);
}

function beginPlayerSlotsLifecycle() {
    const playerBatchData = rps.getPlayerRpsBatch();
    const batchRange: number = playerBatchData.length -1; // -1 counters back to 0 base index
    if (playerBatchData.length !== 12) {
        console.error("Player's batch must have 12 items");
        return;
    }
    for (let i: number = 0; i <= batchRange; i++) {
        const playerSlotIImage = document.getElementById(`playerSlot${i}Image`);
        if (!playerSlotIImage) return;
        playerSlotIImage.setAttribute("href", playerBatchData[i].assetSource);
    }
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
    beginMouseTapInputLifecycle();
}

function beginCpuSlotsLifecycle() {
    const cpuBatchData = rps.getCpuRpsBatch();
    const batchRange: number = cpuBatchData.length -1; // -1 counters back to 0 base index
    if (cpuBatchData.length !== 12) {
        console.error("Cpu's batch must have 12 items");
        return;
    }
    for (let i: number = 0; i <= batchRange; i++) {
        const cpuSlotIImage = document.getElementById(`cpuSlot${i}Image`);
        if (!cpuSlotIImage) return;
        cpuSlotIImage.setAttribute("href", cpuBatchData[i].assetSource);
    }
}

function beginMouseTapInputLifecycle() {
    const selLSlotBtnFocArea = document.getElementById("selLSlotBtnFocArea"); // element from the SVG
    const selRSlotBtnFocArea = document.getElementById("selRSlotBtnFocArea"); // element from the SVG
    const initiateButtonFocArea = document.getElementById("initiateButtonFocArea"); // element from the SVG
    function handleInitiateDuel() {
        rpsGame.initiateDuel();
    }

    selLSlotBtnFocArea?.addEventListener("click", rpsEvents.handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea?.addEventListener("click", rpsEvents.handleClickTapRotateDiscRight);
    initiateButtonFocArea?.addEventListener("click", handleInitiateDuel);
}

function beginCanToggleAssignTable() {
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleToggleAssignTable);
}

function beginAssignTableInputLifecycle() {
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleNavigateAssignTable);
}
// =====

// =====
// pause
// =====
function pausePlayerSlotsLifecycle() {
    rps.getRpsSceneWrapper()?.removeEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
    rps.getRpsPlayerButtons().classList.add("element-events-paused");
}

function pauseMouseTapInputLifecycle() {
    const selLSlotBtnFocArea = document.getElementById("selLSlotBtnFocArea"); // element from the SVG
    const selRSlotBtnFocArea = document.getElementById("selRSlotBtnFocArea"); // element from the SVG
    if ( !selLSlotBtnFocArea || !selRSlotBtnFocArea) return;

    selLSlotBtnFocArea.removeEventListener("click", rpsEvents.handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea.removeEventListener("click", rpsEvents.handleClickTapRotateDiscRight);
    selLSlotBtnFocArea.classList.add("element-events-paused");
    selRSlotBtnFocArea.classList.add("element-events-paused");
}

function pauseClickAssignTableInputLifecycle() {
    const elementSelectorBodyLeft = document.getElementById("elementSelectorBodyLeft");
    elementSelectorBodyLeft?.removeEventListener("click", rpsEvents.handleClickNavigateAssignTableLeft);
    const elementSelectorBodyRight = document.getElementById("elementSelectorBodyRight");
    elementSelectorBodyRight?.removeEventListener("click", rpsEvents.handleClickNavigateAssignTableRight);
}

function pauseAssignTableInputLifecycle() {
    rps.getRpsSceneWrapper()?.removeEventListener("keydown", rpsEvents.handleNavigateAssignTable);
}
// =====

// ======
// resume
// ======
function resumePlayerSlotsLifecycle() {
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
    rps.getRpsPlayerButtons().classList.remove("element-events-paused");
}

function resumeMouseTapInputLifecycle() {
    const selLSlotBtnFocArea = document.getElementById("selLSlotBtnFocArea"); // element from the SVG
    const selRSlotBtnFocArea = document.getElementById("selRSlotBtnFocArea"); // element from the SVG
    if ( !selLSlotBtnFocArea || !selRSlotBtnFocArea) return;

    selLSlotBtnFocArea.addEventListener("click", rpsEvents.handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea.addEventListener("click", rpsEvents.handleClickTapRotateDiscRight);
    selLSlotBtnFocArea.classList.remove("element-events-paused");
    selRSlotBtnFocArea.classList.remove("element-events-paused");
}

function resumeClickAssignTableInputLifecycle() {
    const elementSelectorBodyLeft = document.getElementById("elementSelectorBodyLeft");
    elementSelectorBodyLeft?.addEventListener("click", rpsEvents.handleClickNavigateAssignTableLeft);
    const elementSelectorBodyRight = document.getElementById("elementSelectorBodyRight");
    elementSelectorBodyRight?.addEventListener("click", rpsEvents.handleClickNavigateAssignTableRight);
}

function resumeAssignTableInputLifecycle() {
    rps.getRpsSceneWrapper()?.addEventListener("keydown", rpsEvents.handleNavigateAssignTable);
}
// ======

// ===
// end
// ===
function endFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper()?.removeEventListener("keydown", rpsEvents.handleFullscreenNextStoryline);
}

function endCanToggleAssignTable() {
    rps.getRpsSceneWrapper()?.removeEventListener("keydown", rpsEvents.handleToggleAssignTable);
}
// ===

export const rpsELifecycle = {
    beginPlayerSlotsLifecycle,
    beginCpuSlotsLifecycle,
    beginFullscreenNextStorylineLifecycle,
    beginMouseTapInputLifecycle,
    beginCanToggleAssignTable,
    beginAssignTableInputLifecycle,

    pausePlayerSlotsLifecycle,
    pauseMouseTapInputLifecycle,
    pauseClickAssignTableInputLifecycle,
    pauseAssignTableInputLifecycle,

    resumePlayerSlotsLifecycle,
    resumeMouseTapInputLifecycle,
    resumeClickAssignTableInputLifecycle,
    resumeAssignTableInputLifecycle,

    endFullscreenNextStorylineLifecycle,
    endCanToggleAssignTable
}