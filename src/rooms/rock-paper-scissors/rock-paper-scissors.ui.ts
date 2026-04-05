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

function buttonsTable() {
    const container = document.createElement("section");
    container.classList.add("rock-paper-scissors__buttons-table");

    return container;
}

function rpsPlayerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__player-buttons-container");
    container.id = "rpsPlayerButtons";

    const name = document.createElement("h2");
    name.textContent = "Player";

    const rock = document.createElement("button");
    rock.textContent = "Rock";
    rock.id = "rpsPlayerRockButton";

    const paper = document.createElement("button");
    paper.textContent = "Paper";
    paper.id = "rpsPlayerPaperButton";

    const scissors = document.createElement("button");
    scissors.textContent = "Scissors";
    scissors.id = "rpsPlayerScissorsButton";

    container.append(name, rock, paper, scissors);
    return container;
}

function rpsComputerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__computer-buttons-container");
    container.id = "rpsComputerButtons";

    const name = document.createElement("h2");
    name.textContent = "Strange man";

    const rock = document.createElement("button");
    rock.textContent = "Rock";
    rock.id = "rpsComputerRockButton";
    rock.setAttribute("disabled", "true");

    const paper = document.createElement("button");
    paper.textContent = "Paper";
    paper.id = "rpsComputerPaperButton";
    paper.setAttribute("disabled", "true");

    const scissors = document.createElement("button");
    scissors.textContent = "Scissors";
    scissors.id = "rpsComputerScissorsButton";
    scissors.setAttribute("disabled", "true");

    container.append(name, rock, paper, scissors);
    return container;
}

function duelStatusTable() {
    const container = document.createElement("table");
    container.classList.add("rock-paper-scissors__duel-status-table");
    container.id = "rpsDuelStatusTable";

    const playerSection = document.createElement("tr");
    const playerName = document.createElement("td");
    playerName.textContent = "Player";
    const playerChoice = document.createElement("td");
    playerChoice.id = "rpsPlayerChoice";
    const playerScore = document.createElement("td");
    playerScore.id = "rpsPlayerScore";
    playerSection.append(playerName, playerChoice, playerScore);
    
    const computerSection = document.createElement("tr");
    const computerName = document.createElement("td");
    computerName.textContent = "Strange man";
    const computerChoice = document.createElement("td");
    computerChoice.id = "rpsComputerChoice";
    const computerScore = document.createElement("td");
    computerScore.id = "rpsComputerScore";
    computerSection.append(computerName, computerChoice, computerScore);

    container.append(playerSection, computerSection);
    return container;
}

export const rpsUI = {
    clearSceneWrapper,
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    buttonsTable,
    rpsPlayerButtons,
    rpsComputerButtons,
    duelStatusTable
}