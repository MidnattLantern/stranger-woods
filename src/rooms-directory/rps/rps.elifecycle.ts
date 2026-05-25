import { rps } from "./rps";
import { lifecycleEvents } from "./rps.lifecycle-events";
import cpuBatchData from "./cpu-batch.json";
import playerBatchData from "./player-batch.json";

// =====
// begin
// =====
function beginFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", lifecycleEvents.handleFullscreenNextStoryline);
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
    rps.getRpsSceneWrapper().addEventListener("keydown", lifecycleEvents.handleKeyboardRotateDisc);
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

    selLSlotBtnFocArea?.addEventListener("click", lifecycleEvents.handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea?.addEventListener("click", lifecycleEvents.handleClickTapRotateDiscRight);
}

function beginKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", lifecycleEvents.handleSelectSlot);
}
// =====

// ===
// end
// ===
function endFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", lifecycleEvents.handleFullscreenNextStoryline);
}

function endKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", lifecycleEvents.handleSelectSlot);
}
// ===

export const rpsEvents = {
    beginPlayerSlotsLifecycle,
    beginCpuSlotsLifecycle,
    beginFullscreenNextStorylineLifecycle,
    beginMouseTapInputLifecycle,
    beginKeyboardInputLifecycle,
    endFullscreenNextStorylineLifecycle,
    endKeyboardInputLifecycle
}