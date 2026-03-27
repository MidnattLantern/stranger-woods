import './sign-in-scene.scss';
import { state } from '../../state/gamestate';
import { saveGameToLocalStorage, hasSaveGame } from '../../store/database/local-storage-database';
import { resetStatusBarProgress } from '../../components/status-bar/status-bar';

export function renderSignInScene(
    sceneWrapper: HTMLDivElement | null,
    render: () => void
) {

    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
      <div class="sign-in-wrapper">
        <h2>Sign in</h2>
        <p> Insert your nickname and start the game to set a new highscore / solve the puzzle</p>
        <span id="errorSpan" class="hidden error-span">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white" aria-hidden="true"><path d="M505.5-298.29q10.5-10.29 10.5-25.5t-10.29-25.71q-10.29-10.5-25.5-10.5t-25.71 10.29q-10.5 10.29-10.5 25.5t10.29 25.71q10.29 10.5 25.5 10.5t25.71-10.29ZM444-432h72v-240h-72v240Zm36.28 336Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
            Please choose an username
        </span>
        <label for="usernameInput">Username</label>
        <input id="usernameInput" placeholder="Username"/>
        <button id="signInBtn">Start Game</button>
      </div>
      `;

    // --------------- DOM ELEMENTS ----------------
    // ----------------------------------------------

    const usernameInput: HTMLInputElement | null = document.querySelector('#usernameInput');
    const signInBtn: HTMLButtonElement | null = document.querySelector('#signInBtn');
    const errorSpan: HTMLElement | null = document.querySelector('#errorSpan');

    // ------ EVENT HANDLERS & FUNCTIONS ---------
    // ----------------------------------------------

    // Focus on input immediately
    setTimeout(() => {
        usernameInput?.focus();
    }, 50);

    // Enter on input triggers sign in
    usernameInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            signInBtn?.click();
        }
    });


    signInBtn?.addEventListener('click', () => {

        if (usernameInput && usernameInput.value.trim() !== '') {
            errorSpan?.classList.add('hidden');
            const enteredUsername = usernameInput.value.trim();

            state.codes = [];
            state.completed = [false, false, false, false, false, false];
            state.currentRoom = 0;
            state.highestRoom = 0;
            state.artifacts = [];
            state.questionIndex = [];
            state.room2Path = null;

            state.username = enteredUsername;
            state.isReturningPlayer = hasSaveGame();
            resetStatusBarProgress();

            let popupTimerInterval: ReturnType<typeof setInterval> | null = null;
            let popupTimerValue: number = 2;

            const popupContainerElement = document.createElement('div');
            popupContainerElement.classList.add('popup-container');

            const popupTextContentElement = document.createElement('span');
            const popupTimerElement = document.createElement('span');
            popupTimerElement.classList.add('popup-timer');
            popupTimerElement.textContent = String(popupTimerValue);

            if (state.isReturningPlayer) {
                popupTextContentElement.textContent = `Welcome back, ${state.username}! Your progress has been saved.`;
            } else {
                popupTextContentElement.textContent = `Welcome, ${state.username} !`;
                saveGameToLocalStorage();
            }

            popupContainerElement.append(popupTextContentElement, popupTimerElement);
            document.body.appendChild(popupContainerElement);

            popupTimerInterval = setInterval(() => {
                popupTimerValue--;
                popupTimerElement.textContent = String(popupTimerValue);
            }, 1000);

            setTimeout(() => {
                clearInterval(popupTimerInterval!);
                popupTimerInterval = null;
                popupContainerElement.remove();
                state.screen = 'menu';
                render();
            }, 2000);


        } else {
            errorSpan?.classList.remove('hidden');
        }
    });
};