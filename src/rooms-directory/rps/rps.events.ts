import fireElement from "/elements/fire-icon.webp";
import earthElement from "/elements/earth-icon.webp";
import waterElement from "/elements/water-icon.webp";
import { rpsAnimate } from "./rps.animate";
import { rpsGame } from "./rps.game";

// ==============
// event handlers
// ==============
function handleSelectSlot1(event: Event) {
    event.preventDefault();
    rpsAnimate.spinToSlot(1);
    rpsGame.initiateDuel("rock");
}
function handleSelectSlot1Keyboard(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
        rpsAnimate.spinToSlot(1);
        rpsGame.initiateDuel("rock");
    }
}

function handleSelectSlot2(event: Event) {
    event.preventDefault();
    rpsAnimate.spinToSlot(2);
    rpsGame.initiateDuel("paper");
}
function handleSelectSlot2Keyboard(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
        rpsAnimate.spinToSlot(2);
        rpsGame.initiateDuel("paper");
    }
}

function handleSelectSlot3(event: Event) {
    event.preventDefault();
    rpsAnimate.spinToSlot(3);
    rpsGame.initiateDuel("scissors");
}
function handleSelectSlot3Keyboard(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
        rpsAnimate.spinToSlot(3);
        rpsGame.initiateDuel("scissors");
    }
}
// ==============

// =====
// begin
// =====
function beginPlayerSlot1Lifecycle() {
    const playerSlot1 = document.getElementById("playerSlot1");
    const playerSlot1Image = document.getElementById("playerSlot1Image");
    if (!playerSlot1) return;
    if (!playerSlot1Image) return;
    playerSlot1Image.setAttribute("href", fireElement);
    playerSlot1.addEventListener("click", handleSelectSlot1);
    playerSlot1.addEventListener("keydown", handleSelectSlot1Keyboard);
}

function beginPlayerSlot2Lifecycle() {
    const playerSlot2 = document.getElementById("playerSlot2");
    const playerSlot2Image = document.getElementById("playerSlot2Image");
    if (!playerSlot2) return;
    if (!playerSlot2Image) return;
    playerSlot2Image.setAttribute("href", earthElement);
    playerSlot2.addEventListener("click", handleSelectSlot2);
    playerSlot2.addEventListener("keydown", handleSelectSlot2Keyboard);
}

function beginPlayerSlot3Lifecycle() {
    const playerSlot3 = document.getElementById("playerSlot3");
    const playerSlot3Image = document.getElementById("playerSlot3Image");
    if (!playerSlot3) return;
    if (!playerSlot3Image) return;
    playerSlot3Image.setAttribute("href", waterElement);
    playerSlot3.addEventListener("click", handleSelectSlot3);
    playerSlot3.addEventListener("keydown", handleSelectSlot3Keyboard);
}
// =====

// ===
// end
// ===
function endPlayerSlot1Lifecycle() {
    const playerSlot1 = document.getElementById("playerSlot1");
    if (!playerSlot1) return;
    playerSlot1.removeEventListener("click", handleSelectSlot1);
    playerSlot1.removeEventListener("keydown", handleSelectSlot1Keyboard);
}

function endPlayerSlot2Lifecycle() {
    const playerSlot2 = document.getElementById("playerSlot2");
    if (!playerSlot2) return;
    playerSlot2.removeEventListener("click", handleSelectSlot2);
    playerSlot2.removeEventListener("keydown", handleSelectSlot2Keyboard);
}

function endPlayerSlot3Lifecycle() {
    const playerSlot3 = document.getElementById("playerSlot3");
    if (!playerSlot3) return;
    playerSlot3.removeEventListener("click", handleSelectSlot3);
    playerSlot3.removeEventListener("keydown", handleSelectSlot3Keyboard);
}
// ===

export const rpsEvents = {
    beginPlayerSlot1Lifecycle,
    beginPlayerSlot2Lifecycle,
    beginPlayerSlot3Lifecycle,
    endPlayerSlot1Lifecycle,
    endPlayerSlot2Lifecycle,
    endPlayerSlot3Lifecycle
}