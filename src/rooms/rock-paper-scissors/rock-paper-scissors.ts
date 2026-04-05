import "./rock-paper-scissors.scss";
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { startStatusBarTimers, stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { showRoomIntro } from '../../components/room-intro/room-intro';
import { state } from '../../state/gamestate';
import { rpsUI } from "./rock-paper-scissors.ui";
import { hideDialogueBox, overwriteDialogueTextContent, renderDialogueBox } from "../../components/dialogue-box/dialogue-box";

export function rockPaperScissors(sceneWrapper: HTMLDivElement | null, next: () => void) {
  if (!sceneWrapper) return;
  showRoomIntro( 1,
    () => {

    },
    () => {

    },
    () => {
        rpsUI.clearSceneWrapper();
        const rockPaperScissorsSceneWrapper = rpsUI.rockPaperScissorsSceneWrapper();
        const gameSessionWrapper = rpsUI.gameSessionWrapper();
        const buttonsTable = rpsUI.buttonsTable();
        const rpsPlayerButtons = rpsUI.rpsPlayerButtons();
        const rpsComputerButtons = rpsUI.rpsComputerButtons();
        const duelStatusTable = rpsUI.duelStatusTable();

        const testDialogue = renderDialogueBox();

        rockPaperScissorsSceneWrapper.append(testDialogue);
        sceneWrapper.append(rockPaperScissorsSceneWrapper);
        rockPaperScissorsSceneWrapper.append(gameSessionWrapper);
        gameSessionWrapper.classList.add("hidden");
        gameSessionWrapper.append(buttonsTable, duelStatusTable);
        buttonsTable.append(rpsPlayerButtons, rpsComputerButtons);

                //     sceneWrapper.innerHTML = `
                // <section class="room room-1">
                //   <div class="room-frame">
                //     <h2>The Gravity Glitch</h2>

                //       <div id="dialogueBox" class="dialogue-box">
                //           <p id="dialogueText"></p>
                //           <button id="nextBtn">Next</button>
                //       </div>
                    
                //       <div class="game-session-wrapper">
                //           <div id="gameSession" class="game-session-style hidden">
                //             <div class="game-info-container">
                //               <div id="playerDisplay" class="player-display">You:</div>
                //               <div id="computerDisplay" class="computer-display">Strange Man:</div>
                //                   <div id="resultDisplay" class="result-display"></div>
                                    
                //                   <div class="score-display">
                //                       Your Score:
                //                       <span id="playerScoreDisplay" class="player-score-display">0</span>
                //                     </div>
                                    
                //                   <div class="score-display">
                //                       Strange Man's Score:
                //                       <span id="computerScoreDisplay" class="computer-score-display">0</span>
                //                     </div>
                //                  </div>

                //                     <div class="action-btn-container">
                //                         <button id="actionBtn" class="action-btn hidden"></button>
                //                       </div>
                            
                //               <div class="choices">
                //                 <button id="rockBtn">Rock</button>
                //                 <button id="paperBtn">Paper</button>
                //                 <button id="scissorsBtn">Scissors</button>
                //               </div>
                //           </div>
                //       </div>
                //   </div>
                // </section>
                //       `;

        const lines = [
            'Hello there, traveler!',
            'If you want to keep moving you will have to beat me in rock paper scissors.',
            'First one to get 3 points wins. Good Luck!',
        ];

        let currentLine = 0;
        const nextBtn = document.getElementById('dialogueNextButton') as HTMLButtonElement;
        // const gameSession = document.getElementById('#rpsPlayerButtons') as HTMLDivElement;

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
                // gameSession.classList.remove('hidden');
                gameSessionWrapper.classList.remove('hidden');
            }
        }

        const rockBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerRockButton');
        const paperBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerPaperButton');
        const scissorsBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#rpsPlayerScissorsButton');
        const actionBtn = sceneWrapper.querySelector('#actionBtn') as HTMLButtonElement;

        const playerDisplay = document.getElementById('rpsPlayerChoice') as HTMLTableElement;
        const computerDisplay = document.getElementById('rpsComputerChoice') as HTMLTableElement;
        // const resultDisplay = sceneWrapper.querySelector('#resultDisplay') as HTMLDivElement;

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
                result = "IT'S A TIE!!";
            } else {
                switch (playerChoice) {
                    case 'Rock':
                    result = computerChoice === 'Scissors' ? 'YOU WIN!' : 'YOU LOSE!';
                    break;
                    case 'Paper':
                    result = computerChoice === 'Rock' ? 'YOU WIN!' : 'YOU LOSE!';
                    break;
                    case 'Scissors':
                    result = computerChoice === 'Paper' ? 'YOU WIN!' : 'YOU LOSE!';
                    break;
                }
            }

            playerDisplay.textContent = `${playerChoice}`;
            computerDisplay.textContent = `${computerChoice}`;
            // resultDisplay.textContent = result;

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

            if (playerScore >= WIN_SCORE) {
                // resultDisplay.textContent = 'You won!';
                actionBtn.textContent = 'Go to the next room';
                actionBtn.classList.remove('hidden');
                disableGameButtons(true);
                triggerArtifact('room1', 'feather', 0);
                state.completed[0] = true;
                saveGameToLocalStorage();
                stopAllStatusBarTimers();
                actionBtn.onclick = () => next();
            } else if (computerScore >= WIN_SCORE) {
                // resultDisplay.textContent = 'You lost!';
                actionBtn.textContent = 'Try again';
                actionBtn.classList.remove('hidden');
                disableGameButtons(true);
                actionBtn.onclick = () => restartGame();
            }
        }

        function restartGame() {
            playerScore = 0;
            computerScore = 0;

            playerScoreDisplay.textContent = '0';
            computerScoreDisplay.textContent = '0';

            playerDisplay.textContent = 'Player: ';
            computerDisplay.textContent = 'Computer: ';
            // resultDisplay.textContent = '';

            disableGameButtons(false);
            actionBtn.classList.add('hidden');
        }

        function disableGameButtons(disabled: boolean) {
            if (rockBtn && paperBtn && scissorsBtn) {
                rockBtn.disabled = disabled;
                paperBtn.disabled = disabled;
                scissorsBtn.disabled = disabled;
            }
        }

        rockBtn.addEventListener('click', () => playGame('Rock'));
        paperBtn.addEventListener('click', () => playGame('Paper'));
        scissorsBtn.addEventListener('click', () => playGame('Scissors'));
        },
    );
}
