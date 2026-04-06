import './profile-selection.scss';
import { state } from '../../state/gamestate';
import { saveGameToLocalStorage, hasSaveGame } from '../../store/database/local-storage-database';
import { resetStatusBarProgress } from '../../components/status-bar/status-bar';

export function renderProfileSelectionScene(
    sceneWrapper: HTMLDivElement | null,
    render: () => void
) {

    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = `
      <div class="sign-in-wrapper">
        <h2>Save profiles</h2>
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