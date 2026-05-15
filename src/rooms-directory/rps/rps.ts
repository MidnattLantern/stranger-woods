import "./rps.scss";
import { rpsUI } from "./rps.ui";
import storyData from "@rps-story/intro.json";
import { rpsStoryController } from "./rps-story-controller";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";

export function rockPaperScissors() {
    const rockPaperScissorsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
    rockPaperScissorsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
    rockPaperScissorsSceneWrapper.addEventListener("click", handleNextLine);

    const gameSessionWrapper = rpsUI.gameSessionWrapper();

    const nextBtn = dialogueBox.nextButton;
    nextBtn.addEventListener('click', handleNextLine);

    const playerRockButton = rpsUI.playerRockButton
    playerRockButton.addEventListener("click", () => {
        initiateDuel("rock");
    });

    const playerPaperButton = rpsUI.playerPaperButton
    playerPaperButton.addEventListener("click", () => {
        initiateDuel("paper");
    });

    const playerScissorsButton = rpsUI.playerScissorsButton
    playerScissorsButton.addEventListener("click", () => {
        initiateDuel("scissors");
    });

    let currentStoryIndex: number = rpsStoryController.getStoryIndex();

    function handleSetNextStoryIndex() {
        rpsStoryController.setNextStoryIndex();
        currentStoryIndex = rpsStoryController.getStoryIndex();
    }

    function handleNextLine() {
        function handleReadNextStoryLine() {
            dialogueBox.updateDialogueBox(storyData[currentStoryIndex].textEvent);
        }
        function handleStartRPSGame() {
            dialogueBox.hideDialogueBox();
            rockPaperScissorsSceneWrapper.append(gameSessionWrapper);
        }

        if (nextBtn.disabled) return;
        handleSetNextStoryIndex();
        if (currentStoryIndex < storyData.length) {
            handleReadNextStoryLine();
        } else {
            handleStartRPSGame();
        }
    }

    // core ui collectors
    const buttonsTable = rpsUI.buttonsTable();
    const rpsPlayerButtons = rpsUI.rpsPlayerButtons();
    const rpsComputerButtons = rpsUI.rpsComputerButtons();
    const duelStatusTable = rpsUI.duelStatusTable();
    // core ui assemblers
    sceneWrapper.append(rockPaperScissorsSceneWrapper);
    gameSessionWrapper.append(buttonsTable, duelStatusTable);
    buttonsTable.append(rpsPlayerButtons, rpsComputerButtons);

    //initialization
    dialogueBox.showDialogueBox();
    dialogueBox.updateDialogueBox(storyData[0].textEvent);
}

function initiateDuel(
    playerInput: "rock" | "paper" | "scissors",
    cpuDice: number = Math.random()
) {
    let cpuInput: "rock" | "paper" | "scissors" = "rock";

    if (cpuDice <= 0.333) {
        cpuInput = "rock";
    } else if (cpuDice <= 0.666) {
        cpuInput = "paper"
    } else {
        cpuInput = "scissors";
    }

    switch (playerInput) {
        case "rock":
            if (cpuInput == "rock") {
                console.log("tie");
            } else if (cpuInput == "paper") {
                console.log("cpu win");
            } else { // cpuInput is scissors
                console.log("player win");
            }
            break;
        case "paper":
            if (cpuInput == "rock") {
                console.log("player win");
            } else if (cpuInput == "paper") {
                console.log("tie");
            } else { // cpuInput is scissors
                console.log("cpu win");
            }
            break;
        case "scissors":
            if (cpuInput == "rock") {
                console.log("cpu win");
            } else if (cpuInput == "paper") {
                console.log("player win");
            } else { // cpuInput is scissors
                console.log("tie");
            }
            break;
        default:
            console.log("tie");
            break;
    }
}