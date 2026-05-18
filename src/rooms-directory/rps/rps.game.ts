import { rpsUI } from "./rps.ui";

function initiateDuel(
    playerInput: "rock" | "paper" | "scissors",
    cpuDice: number = Math.random()
) {
    let cpuInput: "rock" | "paper" | "scissors" = "rock";

    rpsUI.playerChoice.textContent = playerInput;
    if (cpuDice <= 0.333) {
        cpuInput = "rock";
        rpsUI.cpuChoice.textContent = "rock";
    } else if (cpuDice <= 0.666) {
        cpuInput = "paper";
        rpsUI.cpuChoice.textContent = "paper";
    } else {
        cpuInput = "scissors";
        rpsUI.cpuChoice.textContent = "scissors";
    }

    switch (playerInput) {
        case "rock":
            if (cpuInput == "rock") {
                // tie
            } else if (cpuInput == "paper") {
                // cpu win
            } else { // cpuInput is scissors
                // player win
            }
            break;
        case "paper":
            if (cpuInput == "rock") {
                // player win
            } else if (cpuInput == "paper") {
                // tie
            } else { // cpuInput is scissors
                // cpu win
            }
            break;
        case "scissors":
            if (cpuInput == "rock") {
                // cpu win
            } else if (cpuInput == "paper") {
                // player win
            } else { // cpuInput is scissors
                // tie
            }
            break;
        default:
            console.log("tie");
            break;
    }
}

export const rpsGame = {
    initiateDuel
}