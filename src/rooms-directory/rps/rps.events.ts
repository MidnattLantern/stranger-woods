import fireElement from "/elements/fire-icon.webp";
// import earthElement from "/elements/earth-icon.webp";
// import waterElement from "/elements/water-icon.webp";
import { rpsAnimate } from "./rps.animate";
import { rpsGame } from "./rps.game";
import { rps } from "./rps";
import { rpsStoryController } from "./rps.story";

// ==============
// event handlers
// ==============
function handleKeyboardRotateDisc(event: KeyboardEvent) {
    function handleRotate(indexDirectionMultiplier: 1 | -1) {
        const currentPlayerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
        rps.setPlayerSelectedIndex(currentPlayerSelectedSlotIndex + (1 * indexDirectionMultiplier));
        rpsAnimate.spinToSlot();
    }
    event.preventDefault();

    if (event.key === "ArrowLeft") handleRotate(-1);
    if (event.key === "ArrowRight") handleRotate(1);
}

function handleFullscreenNextStoryline(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === "Enter" || event.key === " ") {
        rpsStoryController.handleNextStoryline();
    }

}

function handleSelectSlot(event: KeyboardEvent) {
    event.preventDefault();
    const slotIndexMinRange = 1;
    const slotIndexMaxRange = 3;
    let playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
    console.log(event);
    if (event.key === 'ArrowLeft') {
        if (playerSelectedSlotIndex == slotIndexMinRange) return;
        rps.setPlayerSelectedIndex(playerSelectedSlotIndex - 1);
        playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
        rpsAnimate.spinToSlot(playerSelectedSlotIndex);
        rpsGame.initiateDuel(playerSelectedSlotIndex);
    }
    if (event.key === 'ArrowRight') {
        if (playerSelectedSlotIndex == slotIndexMaxRange) return;
        rps.setPlayerSelectedIndex(playerSelectedSlotIndex + 1);
        playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
        rpsAnimate.spinToSlot(playerSelectedSlotIndex);
        rpsGame.initiateDuel(playerSelectedSlotIndex);
    }
    console.log(playerSelectedSlotIndex);
}
// ==============

// =====
// begin
// =====
function beginFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", handleFullscreenNextStoryline);
}

function beginPlayerSlotsLifecycle() {
    for (let i: number = 0; i <= 11; i++) {
        const playerSlotI = document.getElementById(`playerSlot${i}`);
        const playerSlotIImage = document.getElementById(`playerSlot${i}Image`);
        if (!playerSlotI) return;
        if (!playerSlotIImage) return;
        playerSlotIImage.setAttribute("href", fireElement);
    }
    rps.getRpsSceneWrapper().addEventListener("keydown", handleKeyboardRotateDisc);
}

function beginKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().addEventListener("keydown", handleSelectSlot);
}
// =====

// ===
// end
// ===
function endFullscreenNextStorylineLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", handleFullscreenNextStoryline);
}

function endKeyboardInputLifecycle() {
    rps.getRpsSceneWrapper().removeEventListener("keydown", handleSelectSlot);
}
// ===

export const rpsEvents = {
    beginPlayerSlotsLifecycle,
    beginFullscreenNextStorylineLifecycle,
    beginKeyboardInputLifecycle,
    endFullscreenNextStorylineLifecycle,
    endKeyboardInputLifecycle
}