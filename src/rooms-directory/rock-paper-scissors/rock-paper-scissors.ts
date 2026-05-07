import "./rock-paper-scissors.scss";
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { startStatusBarTimers, stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { rpsUI } from "./rock-paper-scissors.ui";
import { hideDialogueBox, overwriteDialogueTextContent, renderDialogueBox } from "../../components/dialogue-box/dialogue-box";

export function rockPaperScissors() {
    const sceneWrapper = document.getElementById("sceneWrapper") as HTMLDivElement | null;
    if (!sceneWrapper) return;

    rpsUI.clearSceneWrapper();
    const rockPaperScissorsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
    const gameSessionWrapper = rpsUI.gameSessionWrapper();
    const buttonsTable = rpsUI.buttonsTable();
    const rpsPlayerButtons = rpsUI.rpsPlayerButtons();
    const rpsComputerButtons = rpsUI.rpsComputerButtons();
    const duelStatusTable = rpsUI.duelStatusTable();
    const testDialogue = renderDialogueBox();

    gameSessionWrapper.classList.add("hidden");
    rockPaperScissorsSceneWrapper.append(testDialogue);
    sceneWrapper.append(rockPaperScissorsSceneWrapper);
    rockPaperScissorsSceneWrapper.append(gameSessionWrapper);
    gameSessionWrapper.append(buttonsTable, duelStatusTable);
    buttonsTable.append(rpsPlayerButtons, rpsComputerButtons);

    const lines = [
        'Hello there, traveler!',
        'If you want to keep moving you will have to beat me in rock paper scissors.',
        'First one to get 3 points wins. Good Luck!',
    ];

    let currentLine = 0;
    const nextBtn = document.getElementById('dialogueNextButton') as HTMLButtonElement;

    overwriteDialogueTextContent(lines[0]);

    nextBtn.addEventListener('click', handleNextLine);
    rockPaperScissorsSceneWrapper.addEventListener("click", handleNextLine);
    
    function handleNextLine() {
        if (nextBtn.disabled) return;
        currentLine++;
        if (currentLine < lines.length) {
            overwriteDialogueTextContent(lines[currentLine]);
        } else {
            startStatusBarTimers();
            hideDialogueBox();
            gameSessionWrapper.classList.remove('hidden');
        }
    }

    const rockBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerRockButton');
    const paperBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerPaperButton');
    const scissorsBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerScissorsButton');

    const playerDisplay = document.getElementById('rpsPlayerChoice') as HTMLTableElement;
    const computerDisplay = document.getElementById('rpsComputerChoice') as HTMLTableElement;

    const playerScoreDisplay = document.getElementById('rpsPlayerScore') as HTMLSpanElement;
    const computerScoreDisplay = document.getElementById('rpsComputerScore') as HTMLSpanElement;

    if (!rockBtn || !paperBtn || !scissorsBtn) {
        console.error('Buttons not found');
        return;
    }

    let playerScore = 0;
    let computerScore = 0;
    const WIN_SCORE = 3;

    function playGame(playerChoice: string) {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        let result = '';

        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else {
            switch (playerChoice) {
                case 'Rock':
                result = computerChoice === 'Scissors' ? 'You win!' : 'You lose!';
                break;
                case 'Paper':
                result = computerChoice === 'Rock' ? 'You win!' : 'You lose!';
                break;
                case 'Scissors':
                result = computerChoice === 'Paper' ? 'You win!' : 'You lose!';
                break;
            }
        }

        playerDisplay.textContent = `${playerChoice}`;
        computerDisplay.textContent = `${computerChoice}`;

        switch (result) {
            case 'YOU WIN!':
                playerScore++;
                playerScoreDisplay.textContent = playerScore.toString();
                break;
            case 'YOU LOSE!':
                computerScore++;
                computerScoreDisplay.textContent = computerScore.toString();
                break;
        }

        if (playerScore == WIN_SCORE) {
            triggerArtifact('room1', 'feather', 0);
            stopAllStatusBarTimers();
            gameSessionWrapper.classList.add("hidden");
            gameSessionWrapper.innerHTML = "";
        }
    }

    rockBtn.addEventListener('click', () => playGame('Rock'));
    paperBtn.addEventListener('click', () => playGame('Paper'));
    scissorsBtn.addEventListener('click', () => playGame('Scissors'));
}
