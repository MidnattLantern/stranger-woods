 import pseudoElementalsPlayerDisc from "@assets/pseudoelementals-player-disc.svg?raw";

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
const playerSlot1Button = document.createElement("button");
playerSlot1Button.textContent = "Slot 1";

const playerSlot2Button = document.createElement("button");
playerSlot2Button.textContent = "Slot 2";

const playerSlot3Button = document.createElement("button");
playerSlot3Button.textContent = "Slot 3";

function rpsPlayerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__player-buttons-container");
    container.id = "rpsPlayerButtons";

    // svg test
    container.innerHTML = pseudoElementalsPlayerDisc;

//    container.append(playerSlot1Button, playerSlot2Button, playerSlot3Button);
    return container;
}
// ==========

// =======
// cpu rps
// =======
const cpuSlot1Button = document.createElement("button");
cpuSlot1Button.textContent = "Slot 1";
cpuSlot1Button.setAttribute("disabled", "true");

const cpuSlot2Button = document.createElement("button");
cpuSlot2Button.textContent = "Slot 2";
cpuSlot2Button.setAttribute("disabled", "true");

const cpuSlot3Button = document.createElement("button");
cpuSlot3Button.textContent = "Slot 3";
cpuSlot3Button.setAttribute("disabled", "true");

function rpsComputerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__computer-buttons-container");
    container.id = "rpsComputerButtons";

    container.append(cpuSlot1Button, cpuSlot2Button, cpuSlot3Button);
    return container;
}
// =======

// ============
// status table
// ============
const playerScore = document.createElement("td");
const cpuScore = document.createElement("td");
const playerChoice = document.createElement("td");
const cpuChoice = document.createElement("td");
function duelStatusTable() {
    const container = document.createElement("table");
    container.classList.add("rock-paper-scissors__duel-status-table");
    container.id = "rpsDuelStatusTable";

    const nameSection = document.createElement("tr");
    const playerName = document.createElement("td");
    playerName.textContent = "Player";
    const computerName = document.createElement("td");
    computerName.textContent = "Strange man";    
    nameSection.append(playerName, computerName);

    const choiceSection = document.createElement("tr");
    choiceSection.append(playerChoice, cpuChoice);
    
    const scoreSection = document.createElement("tr");
    scoreSection.append(playerScore, cpuScore);

    container.append(nameSection, choiceSection, scoreSection);
    return container;
}
// ============

export const rpsUI = {
    playerSlot1Button,
    playerSlot2Button,
    playerSlot3Button,
    cpuSlot1Button,
    cpuSlot2Button,
    cpuSlot3Button,
    playerScore,
    cpuScore,
    playerChoice,
    cpuChoice,
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    buttonsTable,
    rpsPlayerButtons,
    rpsComputerButtons,
    duelStatusTable
}