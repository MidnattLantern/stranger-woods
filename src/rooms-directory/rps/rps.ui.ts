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
const playerRockButton = document.createElement("button");
playerRockButton.textContent = "Rock";

const playerPaperButton = document.createElement("button");
playerPaperButton.textContent = "Paper";

const playerScissorsButton = document.createElement("button");
playerScissorsButton.textContent = "Scissors";

function rpsPlayerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__player-buttons-container");
    container.id = "rpsPlayerButtons";

    const name = document.createElement("h2");
    name.textContent = "Player";

    container.append(name, playerRockButton, playerPaperButton, playerScissorsButton);
    return container;
}
// ==========

// =======
// cpu rps
// =======
const cpuRockButton = document.createElement("button");
cpuRockButton.textContent = "Rock";
cpuRockButton.setAttribute("disabled", "true");

const cpuPaperButton = document.createElement("button");
cpuPaperButton.textContent = "Paper";
cpuPaperButton.setAttribute("disabled", "true");

const cpuScissorsButton = document.createElement("button");
cpuScissorsButton.textContent = "Scissors";
cpuScissorsButton.setAttribute("disabled", "true");

function rpsComputerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__computer-buttons-container");
    container.id = "rpsComputerButtons";

    const name = document.createElement("h2");
    name.textContent = "Strange man";

    container.append(name, cpuRockButton, cpuPaperButton, cpuScissorsButton);
    return container;
}
// =======

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
    const playerChoice = document.createElement("td");
    playerChoice.id = "rpsPlayerChoice";
    const computerChoice = document.createElement("td");
    computerChoice.id = "rpsComputerChoice";
    choiceSection.append(playerChoice, computerChoice);
    
    const scoreSection = document.createElement("tr");
    const playerScore = document.createElement("td");
    playerScore.id = "rpsPlayerScore";
    const computerScore = document.createElement("td");
    computerScore.id = "rpsComputerScore";
    scoreSection.append(playerScore, computerScore);

    container.append(nameSection, choiceSection, scoreSection);
    return container;
}

export const rpsUI = {
    playerRockButton,
    playerPaperButton,
    playerScissorsButton,
    cpuRockButton,
    cpuPaperButton,
    cpuScissorsButton,
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    buttonsTable,
    rpsPlayerButtons,
    rpsComputerButtons,
    duelStatusTable
}