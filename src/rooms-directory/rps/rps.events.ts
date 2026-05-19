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
function handleClickRotateDisc(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const playerSlotIndex: number = Number(target.getAttribute("data-player-slot"));
    rps.setPlayerSelectedIndex(playerSlotIndex);
    rpsAnimate.spinToSlot();
}

function handleKeyboardRotateDisc(event: KeyboardEvent) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate(directionMultiplier: 1 | -1) {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex + (1 * directionMultiplier);
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex + (1 * directionMultiplier);

        console.log(newPlayerSelectedSlotIndex);
        rpsAnimate.spinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
        console.log("selected slot index", rps.getPlayerSelectedSlotIndex());
        console.log("disc rotation index", newPlayerDiscRotationIndex);
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
    const slotsRange: number = 12 -1; // -1 counters back to 0 base index
    for (let i: number = 0; i <= slotsRange; i++) {
        const playerSlotI = document.getElementById(`playerSlot${i}`);
        const playerSlotIImage = document.getElementById(`playerSlot${i}Image`);
        if (!playerSlotI) return;
        if (!playerSlotIImage) return;
        playerSlotIImage.setAttribute("href", fireElement);
        // playerSlotI.dataset.playerSlot = i.toString();
        // playerSlotI.addEventListener("click", handleClickRotateDisc);
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