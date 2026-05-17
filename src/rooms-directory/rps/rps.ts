import "./rps.scss";
import { rpsUI } from "./rps.ui";
import storyData from "@rps-story/intro.json";
import { rpsStoryController } from "./rps-story-controller";
import { dialogueBox } from "@/components/dialogue-box/dialogue-box";
import { sceneWrapper } from "@/scenes/scene-handler";
import fireElement from "/elements/fire-icon.webp";
import earthElement from "/elements/earth-icon.webp";
import waterElement from "/elements/water-icon.webp";
import { rpsAnimate } from "./rps.animate";

export function rockPaperScissors() {
    const rockPaperScissorsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
    rockPaperScissorsSceneWrapper.append(dialogueBox.dialogueBoxContainer);
    // rockPaperScissorsSceneWrapper.addEventListener("click", handleNextLine);

    const gameSessionWrapper = rpsUI.gameSessionWrapper();

    const nextBtn = dialogueBox.nextButton;
    nextBtn.addEventListener('click', handleNextLine);

    const playerRockButton = rpsUI.playerSlot1Button
    playerRockButton.addEventListener("click", () => {
        initiateDuel("rock");
    });

    const playerPaperButton = rpsUI.playerSlot2Button
    playerPaperButton.addEventListener("click", () => {
        initiateDuel("paper");
    });

    const playerScissorsButton = rpsUI.cpuSlot3Button
    playerScissorsButton.addEventListener("click", () => {
        initiateDuel("scissors");
    });

    let currentStoryIndex: number = rpsStoryController.getStoryIndex();

    function handleSetNextStoryIndex() {
        rpsStoryController.setNextStoryIndex();
        currentStoryIndex = rpsStoryController.getStoryIndex();
    }

    function handleStartRPSGame() {
        dialogueBox.hideDialogueBox();
        rockPaperScissorsSceneWrapper.append(gameSessionWrapper);
        rpsAnimate.spinPlayerElementalsDisc();

        const playerSlot1 = document.getElementById("playerSlot1");
        const playerSlot1Image = document.getElementById("playerSlot1Image");
        if (!playerSlot1) return;
        if (!playerSlot1Image) return;
        playerSlot1Image.setAttribute("href", fireElement);
        playerSlot1.addEventListener("click", (e) => {
            e?.preventDefault();
            initiateDuel("rock");
        });
        playerSlot1.addEventListener("keydown", (e) => {
            e?.preventDefault();
            if (e.key === 'Enter' || e.key === ' ') {
                initiateDuel("rock");
            }
        });

        const playerSlot2 = document.getElementById("playerSlot2");
        const playerSlot2Image = document.getElementById("playerSlot2Image");
        if (!playerSlot2) return;
        if (!playerSlot2Image) return;
        playerSlot2Image.setAttribute("href", earthElement);
        playerSlot2.addEventListener("click", (e) => {
            e?.preventDefault();
            initiateDuel("paper");
        });
        playerSlot2.addEventListener("keydown", (e) => {
            e?.preventDefault();
            if (e.key === 'Enter' || e.key === ' ') {
                initiateDuel("paper");
            }
        });

        const playerSlot3 = document.getElementById("playerSlot3");
        const playerSlot3Image = document.getElementById("playerSlot3Image");
        if (!playerSlot3) return;
        if (!playerSlot3Image) return;
        playerSlot3Image.setAttribute("href", waterElement);
        playerSlot3.addEventListener("click", (e) => {
            e?.preventDefault();
            initiateDuel("scissors");
        });
        playerSlot3.addEventListener("keydown", (e) => {
            e?.preventDefault();
            if (e.key === 'Enter' || e.key === ' ') {
                initiateDuel("scissors");
            }
        });
    }

    function handleNextLine() {
        function handleReadNextStoryLine() {
            dialogueBox.updateDialogueBox(storyData[currentStoryIndex].textEvent);
        }
        if (nextBtn.disabled) return;
        handleSetNextStoryIndex();
        if (currentStoryIndex < storyData.length) {
            handleReadNextStoryLine();
        } else {
            handleStartRPSGame();
        }
        handleStartRPSGame();
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
    // dialogueBox.showDialogueBox();
    // dialogueBox.updateDialogueBox(storyData[0].textEvent);
    handleStartRPSGame();
}

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