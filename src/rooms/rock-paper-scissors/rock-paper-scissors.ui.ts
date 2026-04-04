const sceneWrapper = document.getElementById("sceneWrapper");

function clearSceneWrapper() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = "";
}

function rockPaperScissorsSceneWrapper() {
    const sceneWrapper = document.createElement("div");
    sceneWrapper.classList.add("room-frame", "rock-paper-scissors-wallpaper");

    return sceneWrapper;
}

function gameSessionWrapper() {
    const gameSessionWrapper = document.createElement("div");
    gameSessionWrapper.classList.add("rock-paper-scissors__game-session-wrapper");

    return gameSessionWrapper;
}

function rockPaperScissorsButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__buttons-container");
    container.id = "rpsContainer";

    const rock = document.createElement("button");
    rock.textContent = "Rock";
    rock.id = "rpsRockButton";

    const paper = document.createElement("button");
    paper.textContent = "Paper";
    paper.id = "rpsPaperButton";

    const scissors = document.createElement("button");
    scissors.textContent = "Scissors";
    scissors.id = "rpsScissorsButton";

    container.append(rock, paper, scissors);
    return container;
}

function duelStatusTable() {
    const container = document.createElement("table");
    container.classList.add("rock-paper-scissors__duel-status-table");
    container.id = "rpsDuelStatusTable";

    const playerSection = document.createElement("tr");
    const playerName = document.createElement("td");
    playerName.textContent = "Player";
    const playerScore = document.createElement("td");
    playerScore.id = "rpsPlayerScore";
    playerSection.append(playerName, playerScore);
    
    const computerSection = document.createElement("tr");
    const computerName = document.createElement("td");
    computerName.textContent = "Strange man";
    const computerScore = document.createElement("td");
    computerScore.id = "rpsComputerScore";
    computerSection.append(computerName, computerScore);

    container.append(playerSection, computerSection);
    return container;
}

export const rpsUI = {
    clearSceneWrapper,
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    rockPaperScissorsButtons,
    duelStatusTable
}