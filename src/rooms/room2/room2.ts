import './room2.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { showRoomIntro } from '../../components/room-intro/room-intro';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { startStatusBarTimers, stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';

export function room2(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;

    let collectedCodes: string[] = [];

    if (state.codes[state.currentRoom]) {
        collectedCodes = state.codes[state.currentRoom];
    }

    let currentPath: 'A' | 'B' | null = state.room2Path;

    //------------------ 1. FLOW CONTROL --------------------

    function updateUI(content: string) {
        if (!sceneWrapper) return;

        let sessionWrapper = sceneWrapper.querySelector('.game-session-wrapper');

        if (!sessionWrapper) {
            sceneWrapper.innerHTML = `
            <section class="room room-2">
                <div class="room-frame">
                    <div class="game-session-wrapper">
                        ${content}
                    </div>
                </div>
            </section>`;
        } else {
            sessionWrapper.innerHTML = content;
        }
    }

    function showStart() {
        if (!sceneWrapper) return;

        sceneWrapper.innerHTML = `  
        <section class= "room room-2">
            <div class="room-frame">
                <div class="game-session-wrapper">
                    <h2 class="room-title-text">Victoria House</h2>

                    <div class="game-wrapper show-start-wrapper">
                        <div class="event-text">
                            <p class="text"> The air in the Victoria House is thick with humidity and the scent of damp earth.
                            Ahead of you, the path vanishes into a wall of green.You know the code out of here is hidden in <strong>three fragments.</strong></p>
                        </div>
                        <button id="startJourney" class="interaction-button start-journey-btn">Begin Search</button>
                    </div>
                </div>
            </div>
        </section>  
     `;

        const startBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#startJourney');

        startBtn?.addEventListener('click', () => {
            if (!sceneWrapper) return;

            startStatusBarTimers();

            updateUI(`
                <h2 class="room-title-text">Victoria House</h2>

                <div class="game-wrapper choose-path-wrapper">
                    <p class="event-text">Where do you begin your search?</p>

                    <div class="option-wrapper">
                        <button id="ferns" class="interaction-button">The right path vanishes into a dense thicket of ferns and broad leaves. You take a breath and push through — something in the shadows is watching your every move.</button>
                        <button id= "lilyPads" class="interaction-button">Step onto the giant lily pads. They look like floating plates, sturdy enough to hold your weight, shimmering under the glass roof.</button>
                    </div>
                </div>
            `);

            const ferns: HTMLButtonElement | null = sceneWrapper.querySelector('#ferns');
            const lilyPads: HTMLButtonElement | null = sceneWrapper.querySelector('#lilyPads');

            ferns?.addEventListener('click', () => {
                choosePath('A');
            });

            lilyPads?.addEventListener('click', () => {
                choosePath('B');
            });
        });
    }

    function choosePath(choice: 'A' | 'B') {
        currentPath = choice;
        state.room2Path = choice;

        if (choice === 'A') {
            riddleGame();
        } else {
            sequenceGame();
        }
    }

    function nextGame() {
        if (!sceneWrapper) return;

        if (collectedCodes.length === 3) {
            finalCodeGame();
            return;
        }

        if (currentPath === 'A') {
            if (collectedCodes.length === 1) sequenceGame();
            else if (collectedCodes.length === 2) numberGuessGame();
        } else {
            if (collectedCodes.length === 1) numberGuessGame();
            else if (collectedCodes.length === 2) riddleGame();
        }
    }

    function saveCode(code: string) {
        if (!state.codes[state.currentRoom]) state.codes[state.currentRoom] = [];
        state.codes[state.currentRoom].push(code);
        collectedCodes = state.codes[state.currentRoom];
        saveGameToLocalStorage();
    }

    //-------------- 2. MINI GAMES - in order they appear on path A ---------------

    function riddleGame() {
        if (!sceneWrapper) return;

        updateUI(`
            <h2 class="room-title-text">The Brass Plaque</h2>

            <div class="game-wrapper riddle-game-wrapper">
                <p class="event-text">"I am the mirror that never breaks, I cradle the giant but have no arms. What am I?"</p>
                <p class="event-text game-message hidden"></p>
                <div class="riddle-game-btns">
                    <button id= "roof" class="answer-btn interaction-button">The Glass Roof</button>
                    <button id= "surface" class="answer-btn interaction-button">The Water's Surface</button>
                    <button id= "shadows" class="answer-btn interaction-button">The Deep Shadows</button>
                </div>
            </div>
        `);

        const answerBtns = sceneWrapper.querySelectorAll('.answer-btn');
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        answerBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                if (btn.id === 'surface') {
                    saveCode('11');
                    fragmentFound('11', 'Your sharp mind saw through the mystery of the brass plaque.');
                }

                else {

                    if (message) {
                        if (btn.id === 'roof') {
                            message.classList.remove('hidden');
                            message.textContent = 'You look up at the glass panes, but they remain silent. The glass reflects the sky, but it does not cradle the life within the water.';
                        } else if (btn.id === 'shadows') {
                            message.classList.remove('hidden');
                            message.textContent = 'The shadows grow longer as you speak, but they offer no reflection. Look where the light meets the water.';
                        }

                        setTimeout(() => {
                            message.classList.add('hidden');
                        }, 3000);
                    }
                }
            });
        });
    }

    function sequenceGame() {
        if (!sceneWrapper) return;

        type GameObject = 'flower' | 'lilyLeaf' | 'hangingFern' | 'sign' | 'ceiling' | 'redPlant';
        const correctOrder: GameObject[] = ['flower', 'hangingFern', 'ceiling'];
        let playerChoice: GameObject[] = [];

        updateUI(`
            <h2 class="room-title-text">The Watcher of Victoria House</h2>

            <div class="game-wrapper sequence-game-wrapper">
                <p class="event-text">The greenhouse holds a secret order. Seek out the flower closest to the ground, then follow the hanging ferns reaching upward, and finally touch the glass ceiling above. Find them and click them in order!</p>
                <button id="startSequenceBtn" class="interaction-button">Begin</button>
            </div>
        `);

        const startSequenceBtn = sceneWrapper.querySelector('#startSequenceBtn');
        startSequenceBtn?.addEventListener('click', () => {

            updateUI(`
                <div class="sequence-overlay-wrapper">
                    <div class="sequence-wrapper">
                        <img src="./roompic/isabelleroom2.png" loading="lazy" aria-label="Inside a greenhouse with a pink flower, a hanging fern, a giant lily, an info sign, a glass ceiling, and a red plant">
                        <button id="redPlant" class="sequence-btn invisible-btn" aria-label="Red Plant"></button>
                        <button id="flower" class="sequence-btn invisible-btn" aria-label="Pink Flower"></button>
                        <button id="hangingFern" class="sequence-btn invisible-btn" aria-label="Hanging Fern"></button>
                        <button id="lilyLeaf" class="sequence-btn invisible-btn" aria-label="Giant Lily"></button>
                        <button id="sign" class="sequence-btn invisible-btn" aria-label="Info sign"></button>
                        <button id="ceiling" class="sequence-btn invisible-btn" aria-label="Glass ceiling"></button>
                        
                    </div>
                    <p class="event-text game-message">Interact with the image</p>
                </div>         
            `);

            const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');
            const gameBtns = sceneWrapper.querySelectorAll('.sequence-btn');

            gameBtns.forEach(btn => {
                btn.addEventListener('click', () => {

                    const id = btn.id as GameObject;
                    const nextCorrrectObject = correctOrder[playerChoice.length];

                    if (id === nextCorrrectObject) {
                        playerChoice.push(id);

                        if (message) {
                            if (playerChoice.length === 1) {
                                message.textContent = 'The plants lean closer...';
                            }
                            else if (playerChoice.length === 2) {
                                message.textContent = 'The air grows heavy. You are almost there, the hierarchy is nearly complete...';
                            }
                            else if (playerChoice.length === correctOrder.length) {
                                message.textContent = 'The glass ceiling shimmers. You have mastered the hierarchy of growth!';
                                saveCode('24');
                                fragmentFound('24', 'The numbers emerged from the leaves as you followed the path of growth.');
                            }
                        }
                    } else {
                        playerChoice = [];

                        if (message) {
                            message.classList.remove('hidden');

                            if (id === 'lilyLeaf') {
                                message.textContent = 'The lily pad sways beneath your feet — it is your foundation, not your destination.';
                            } else if (id === 'redPlant') {
                                message.textContent = 'The red leaves reach high, but they are not the final boundary.';
                            } else if (id === 'sign') {
                                message.textContent = 'The faded sign offers no guidance. The cycle is broken.';
                            } else {
                                message.textContent = 'The cycle of growth has been broken—start again from the roots.';
                            }
                        }
                    }
                });
            });
        });
    }

    function numberGuessGame() {
        if (!sceneWrapper) return;

        let attempts = 0;

        updateUI(`
            <h2 class="room-title-text">The Foggy Window</h2>

            <div class="game-wrapper number-guess-wrapper">
                <p class="event-text">The glass is fogged up. Adjust the humidity (1-20) to see the code.</p>
                <p class="event-text game-message hidden"></p>  
                <div class="input-wrapper">
                    <input type="text" inputmode="numeric" id="guessInput" class="guess-input" maxlength="2" pattern="[0-9]*">
                    <button id="guessBtn" class="interaction-button">Adjust</button>
                </div>
            </div>
        `);

        const guessBtn: HTMLButtonElement | null = sceneWrapper.querySelector('#guessBtn');
        const guessInput: HTMLInputElement | null = sceneWrapper.querySelector('#guessInput');
        guessInput?.focus();
        const message: HTMLParagraphElement | null = sceneWrapper.querySelector('.game-message');

        guessBtn?.addEventListener('click', () => {
            if (guessInput?.value.trim() === '') return;

            const inputValue = Number(guessInput?.value);

            if (isNaN(inputValue) || inputValue < 1 || inputValue > 20) {
                if (message) {
                    message.classList.remove('hidden');
                    message.innerHTML = 'Please enter a number between 1 and 20.';
                }
                return;
            }

            if (inputValue === 12) {
                saveCode('55');
                fragmentFound('55', 'The fog clears!');

            } else {
                attempts++;

                if (attempts >= 5) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.innerHTML = 'The fog thickens. You can no longer breathe.<br> Game over!';
                    }
                    setTimeout(() => {
                        stopAllStatusBarTimers();
                        state.gameOverReason = 'too-many-attempts';
                        saveGameToLocalStorage();
                        state.screen = 'gameover';
                        render();
                    }, 3000);

                } else if (inputValue < 12) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.innerHTML = `Too dry. Increase the humidity. <br> Attempts left: ${5 - attempts}`;
                    }

                } else if (inputValue > 12) {
                    if (message) {
                        message.classList.remove('hidden');
                        message.innerHTML = `Too damp. The glass is dripping! <br> Attempts left: ${5 - attempts}`;
                    }
                }
            }
        });
    }

    function finalCodeGame() {
        const correctExitCode = ['55', '11', '24'];
        let attempts = 0;

        if (!sceneWrapper) return;

        updateUI(`
            <h2 class="room-title-text">The Final Exit</h2>

            <div class="game-wrapper final-code-wrapper">
                <p class="event-text">You've reached the Victoria House exit. The electronic lock requires the combined sequence of the fragments you've discovered among the leaves and water. 
                The air here is thinner, cooler — the exit is just one correct code away.</p>

                <div class="event-text exit-fragment-text">
                    <p>Your fragments: <strong>${collectedCodes[0]}</strong> - <strong>${collectedCodes[1]}</strong> - <strong>${collectedCodes[2]}</strong></p>
                    <div class="final-exit-inputs">
                        <input type="text" id="input0" class="code-input" maxlength="2" inputmode="numeric" pattern="[0-9]">
                        <input type="text" id="input1" class="code-input" maxlength="2" inputmode="numeric" pattern="[0-9]">
                        <input type="text" id="input2" class="code-input" maxlength="2" inputmode="numeric" pattern="[0-9]">
                    </div>
                    <p class="game-message hidden"></p>
                </div>

                <button id="unlockBtn" class="interaction-button">Unlock Exit</button>
            </div>
        `);

        const input0: HTMLInputElement | null = sceneWrapper.querySelector('#input0');
        input0?.focus();
        const input1: HTMLInputElement | null = sceneWrapper.querySelector('#input1');
        const input2: HTMLInputElement | null = sceneWrapper.querySelector('#input2');

        input0?.addEventListener('input', () => {
            if (input0.value.length === 2) input1?.focus();
        });
        input1?.addEventListener('input', () => {
            if (input1.value.length === 2) input2?.focus();
        });

        const unlockBtn = sceneWrapper.querySelector('#unlockBtn');
        const message = sceneWrapper.querySelector('.game-message');

        unlockBtn?.addEventListener('click', () => {
            attempts++;

            if (input0?.value === correctExitCode[0] && input1?.value === correctExitCode[1] && input2?.value === correctExitCode[2]) {
                stopAllStatusBarTimers();
                updateUI(`
                        <h2 class="room-title-text">The Final Exit</h2>

                        <div class="game-wrapper artifact-wrapper hidden">
                            <p class="event-text">The lock clicks open. The cool air rushes in as the doors of Victoria House swing wide. You have escaped!</p>

                            <button id="nextRoomBtn" class="interaction-button">Continue to next room</button>
                        </div>          
                    `);

                triggerArtifact('room2', 'key', 0);
                state.completed[state.currentRoom] = true;
                saveGameToLocalStorage();

                setTimeout(() => {
                    const closeBtn = document.querySelector('#close-artifact-btn');

                    closeBtn?.addEventListener('click', () => {
                        sceneWrapper.querySelector('.artifact-wrapper')?.classList.remove('hidden');
                    });
                }, 0);


                const nextRoomBtn = sceneWrapper.querySelector('#nextRoomBtn');
                nextRoomBtn?.addEventListener('click', () => {
                    next();
                });


            } else if (attempts >= 5) {
                if (message) {
                    message.classList.remove('hidden');
                    message.textContent = 'The alarm sounds. The Victoria House locks down forever. Game over!';

                    setTimeout(() => {
                        stopAllStatusBarTimers();
                        state.gameOverReason = 'too-many-attempts';
                        saveGameToLocalStorage();
                        state.screen = 'gameover';
                        render();
                    }, 2000);
                }

            } else {
                if (message) {
                    message.classList.remove('hidden');
                    message.innerHTML = `Wrong code. The door remains shut... <br> Attempts left: ${5 - attempts}`;
                }
            }
        });
    }

    //------------------- 3. VICTORY SCREEN -------------------

    function fragmentFound(code: string, specificText: string) {

        if (!sceneWrapper) return;

        updateUI(`
            <div class="game-wrapper fragment-found-wrapper">
                <p class="event-text fragment-found-text">
                <span>${specificText} Fragment found: <strong>${code}</strong></span>
                </p>
                    
                <button id="continueBtn" class="interaction-button continue-btn">Continue</button>
            </div>    
            `);

        const continueBtn = sceneWrapper?.querySelector('#continueBtn');

        continueBtn?.addEventListener('click', () => {
            nextGame();
        });
    }

    //---------------------- 4. START -------------------------
    showRoomIntro(
        2,
        () => { /* pauseTimer */ },
        () => { /* resumeTimer */ },
        () => {
            if (collectedCodes.length > 0) {
                nextGame();
            } else {
                showStart();
            }
        }
    );
}
