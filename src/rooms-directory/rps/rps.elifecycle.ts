import fireElement from "/elements/fire-icon.webp";
// import earthElement from "/elements/earth-icon.webp";
// import waterElement from "/elements/water-icon.webp";
import { rps } from "./rps";
import { lifecycleEvents } from "./rps.lifecycle-events";

// =====
// begin
// =====
function beginFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", lifecycleEvents.handleFullscreenNextStoryline);
}

function beginPlayerSlotsLifecycle() {
    const slotsRange: number = 12 -1; // -1 counters back to 0 base index
    for (let i: number = 0; i <= slotsRange; i++) {
        const playerSlotIImage = document.getElementById(`playerSlot${i}Image`);
        if (!playerSlotIImage) return;
        playerSlotIImage.setAttribute("href", fireElement);
    }
    rps.getRpsSceneWrapper().addEventListener("keydown", lifecycleEvents.handleKeyboardRotateDisc);
    beginMouseTapInputLifecycle();
}

function beginCpuSlotsLifecycle() {
    const slotsRange: number = 12 -1; // -1 counters back to 0 base index
    for (let i: number = 0; i <= slotsRange; i++) {
        const cpuSlotIImage = document.getElementById(`cpuSlot${i}Image`);
        if (!cpuSlotIImage) return;
        cpuSlotIImage.setAttribute("href", fireElement);
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