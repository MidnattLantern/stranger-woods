import { rps } from "./rps";
import { rpsEvents } from "./rps.events";
import cpuBatchData from "./cpu-batch.json";
import playerBatchData from "./player-batch.json";

// =====
// begin
// =====
function beginFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", rpsEvents.handleFullscreenNextStoryline);
}

function beginPlayerSlotsLifecycle() {
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
    rps.getRpsSceneWrapper().addEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
    beginMouseTapInputLifecycle();
}

function beginCpuSlotsLifecycle() {
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

    selLSlotBtnFocArea?.addEventListener("click", rpsEvents.handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea?.addEventListener("click", rpsEvents.handleClickTapRotateDiscRight);
}

function beginKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", rpsEvents.handleSelectSlot);
}
// =====

// =====
// pause
// =====
function pausePlayerSlotsLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
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
// =====

// ======
// resume
// ======
function resumePlayerSlotsLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", rpsEvents.handleKeyboardRotateDisc);
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
// ======

// ===
// end
// ===
function endFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", rpsEvents.handleFullscreenNextStoryline);
}

function endKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", rpsEvents.handleSelectSlot);
}
// ===

export const rpsELifecycle = {
    beginPlayerSlotsLifecycle,
    beginCpuSlotsLifecycle,
    beginFullscreenNextStorylineLifecycle,
    beginMouseTapInputLifecycle,
    beginKeyboardInputLifecycle,
    pausePlayerSlotsLifecycle,
    pauseMouseTapInputLifecycle,
    resumePlayerSlotsLifecycle,
    resumeMouseTapInputLifecycle,
    endFullscreenNextStorylineLifecycle,
    endKeyboardInputLifecycle
}