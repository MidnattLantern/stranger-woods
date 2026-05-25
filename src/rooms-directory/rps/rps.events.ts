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
function handleClickTapRotateDiscLeft(event: Event) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate() {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex - 1;
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex - 1;

        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
        console.log("Player selected slot index:", rps.getPlayerSelectedSlotIndex());
        console.log("Player disc rotation index:", newPlayerDiscRotationIndex);
        handleCpuRotateDisc();
    }
    event.preventDefault();
    handleRotate();
}

function handleClickTapRotateDiscRight(event: Event) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate() {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex + 1;
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex + 1;

        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
        console.log("Player selected slot index", rps.getPlayerSelectedSlotIndex());
        console.log("Player disc rotation index", newPlayerDiscRotationIndex);
        handleCpuRotateDisc();
    }
    event.preventDefault();
    handleRotate();
}

function handleKeyboardRotateDisc(event: KeyboardEvent) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate(directionMultiplier: 1 | -1) {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex + (1 * directionMultiplier);
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex + (1 * directionMultiplier);

        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
        console.log("Player selected slot index", rps.getPlayerSelectedSlotIndex());
        console.log("Player disc rotation index", newPlayerDiscRotationIndex);
        handleCpuRotateDisc();
    }
    event.preventDefault();

    if (event.key === "ArrowLeft") handleRotate(-1);
    if (event.key === "ArrowRight") handleRotate(1);
}

function handleCpuRotateDisc(rotationIndex: number = Math.random()) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;

    function handleRotate(directionMultiplier: 1 | -1) {
        const currentCpuSelectedSlotIndex: number = rps.getCpuSelectedSlotIndex();
        const currentCpuDiscRotationIndex: number = rps.getCpuDiscRotationIndex();
        let newCpuSelectedSlotIndex: number = currentCpuSelectedSlotIndex + (1 * directionMultiplier);
        const newCpuDiscRotationIndex: number = currentCpuDiscRotationIndex + (1 * directionMultiplier);
        rpsAnimate.cpuSpinToSlot(newCpuDiscRotationIndex);
        if (newCpuSelectedSlotIndex < MIN_EDGE_INDEX) {
            newCpuSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newCpuSelectedSlotIndex > MAX_EDGE_INDEX) {
            newCpuSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setCpuSelectedIndex(newCpuSelectedSlotIndex);
        rps.setCpuDiscRotationIndex(newCpuDiscRotationIndex);
        console.log("Cpu selected slot index", rps.getCpuSelectedSlotIndex());
        console.log("Cpu disc rotation index", newCpuDiscRotationIndex);
    }

    if (rotationIndex < 0.5) { // turn left
        console.log("Cpu disc turn left");
        handleRotate(-1);
    } else { // turn right
        console.log("Cpu disc turn right");
        handleRotate(1);
    }
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
    if (event.key === 'ArrowLeft') {
        if (playerSelectedSlotIndex == slotIndexMinRange) return;
        rps.setPlayerSelectedIndex(playerSelectedSlotIndex - 1);
        playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
        rpsAnimate.playerSpinToSlot(playerSelectedSlotIndex);
        rpsGame.initiateDuel(playerSelectedSlotIndex);
    }
    if (event.key === 'ArrowRight') {
        if (playerSelectedSlotIndex == slotIndexMaxRange) return;
        rps.setPlayerSelectedIndex(playerSelectedSlotIndex + 1);
        playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex();
        rpsAnimate.playerSpinToSlot(playerSelectedSlotIndex);
        rpsGame.initiateDuel(playerSelectedSlotIndex);
    }
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
        const playerSlotIImage = document.getElementById(`playerSlot${i}Image`);
        if (!playerSlotIImage) return;
        playerSlotIImage.setAttribute("href", fireElement);
    }
    rps.getRpsSceneWrapper().addEventListener("keydown", handleKeyboardRotateDisc);
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

    selLSlotBtnFocArea?.addEventListener("click", handleClickTapRotateDiscLeft);
    selRSlotBtnFocArea?.addEventListener("click", handleClickTapRotateDiscRight);
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
    beginCpuSlotsLifecycle,
    beginFullscreenNextStorylineLifecycle,
    beginMouseTapInputLifecycle,
    beginKeyboardInputLifecycle,
    endFullscreenNextStorylineLifecycle,
    endKeyboardInputLifecycle
}