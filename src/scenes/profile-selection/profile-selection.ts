import { saveGameToLocalStorage, hasSaveGame } from '../../store/database/local-storage-database';
import { resetStatusBarProgress } from '../../components/status-bar/status-bar';
import { setSessionState } from '../../store/session-memory/session-state';
import { profileSelectionUI } from './profile-selection.ui';

export function renderProfileSelectionScene() {
    const sceneWrapper = document.getElementById("sceneWrapper") as HTMLDivElement | null;
    if (!sceneWrapper) return;

    sceneWrapper.append(profileSelectionUI.profileSelection());

    const usernameInput = document.getElementById('usernameInput') as HTMLInputElement | null;
    if (!usernameInput) return;
    const signInBtn = document.getElementById('signInBtn') as HTMLButtonElement | null;
    if (!signInBtn) return;

    // Enter on input triggers sign in
    usernameInput.addEventListener('keydown', (event) => { // consider moving to keyboard controller
        if (event.key === 'Enter') {
            event.preventDefault();
            signInBtn.click();
        }
    });

    signInBtn.addEventListener('click', handleSignIn);

    function handleSignIn() {
        if (usernameInput && usernameInput.value.trim() !== '') {
            const enteredUsername = usernameInput.value.trim();

//            state.currentRoom = 0;
//            state.highestRoom = 0;
//            state.artifacts = [];
//            state.questionIndex = [];
//            state.room2Path = null;

//            state.username = enteredUsername;
//            state.isReturningPlayer = hasSaveGame();
            resetStatusBarProgress();

            let popupTimerInterval: ReturnType<typeof setInterval> | null = null;
            let popupTimerValue: number = 2;

            const popupContainerElement = document.createElement('div');
            popupContainerElement.classList.add('popup-container');

            const popupTextContentElement = document.createElement('span');
            const popupTimerElement = document.createElement('span');
            popupTimerElement.classList.add('popup-timer');
            popupTimerElement.textContent = String(popupTimerValue);

            /*
            if (state.isReturningPlayer) {
                popupTextContentElement.textContent = `Welcome back, ${state.username}! Your progress has been saved.`;
            } else {
                popupTextContentElement.textContent = `Welcome, ${state.username} !`;
                saveGameToLocalStorage();
            }
            */

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
                setSessionState.setScene("menu");
            }, 2000);
        }
    }
};