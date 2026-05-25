import pseudoElementalsPlayerDisc from "@assets/pseudoelementals-player-disc.svg?raw";
import pseudoElementalsCpuDisc from "@assets/pseudoelementals-cpu-disc.svg?raw";

function rockPaperScissorsSceneWrapper() {
    const rpsSceneWrapper = document.createElement("div");
    rpsSceneWrapper.classList.add("room-frame", "rock-paper-scissors-wallpaper");
    return rpsSceneWrapper;
}

function gameSessionWrapper() {
    const gameSessionWrapper = document.createElement("div");
    gameSessionWrapper.classList.add("rock-paper-scissors__game-session-wrapper");
    return gameSessionWrapper;
}

function buttonsTable() {
    const container = document.createElement("section");
    container.classList.add("rock-paper-scissors__buttons-table");
    return container;
}

// ==========
// player rps
// ==========
function rpsPlayerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__player-buttons-container");
    container.id = "rpsPlayerButtons";
    container.innerHTML = pseudoElementalsPlayerDisc;
    return container;
}
// ==========

// =======
// cpu rps
// =======
function rpsCpuButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__cpu-buttons-container");
    container.id = "rpsCpuButtons";
    container.innerHTML = pseudoElementalsCpuDisc;
    return container;
}
// =======


export const rpsUI = {
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    buttonsTable,
    rpsPlayerButtons,
    rpsCpuButtons
}