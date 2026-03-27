import './game-over-scene.scss';
import { roomTimes, state, setRoomTime } from '../../state/gamestate';
import { render } from '../../main';
import { loadGameFromLocalStorage, saveGameToLocalStorage, clearLocalStorageSave } from '../../store/database/local-storage-database';
import { refetchGamestate, stopAllStatusBarTimers, startStatusBarTimers, resetStatusBarProgress } from '../../components/status-bar/status-bar';

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement | null;

export function renderGameOverScene() {
    if (!sceneWrapper) return;
    stopAllStatusBarTimers();

    sceneWrapper.innerHTML = ''; // reset

    const container = document.createElement('div');
    container.classList.add('game-over-container');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('game-over-buttons-container');

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';

    retryButton.addEventListener('click', () => {
        stopAllStatusBarTimers(); // stoppar alla timers 
        const reason = state.gameOverReason;

        if (reason === 'total-timeout') {
            clearLocalStorageSave();
            resetStatusBarProgress();
            state.codes = [];
            state.completed = [false, false, false, false, false, false];
            state.currentRoom = 0;
            state.highestRoom = 0;
            state.artifacts = [];
            state.questionIndex = [];

        } else if (reason === 'room-timeout') {
            loadGameFromLocalStorage(); // läser in all data från localstorage och lägger tillbaka i state
            setRoomTime(state.currentRoom, roomTimes[state.currentRoom]);
            refetchGamestate();

        } else { // too-many attempts spelare fortsätter från där denne var med bibehållen progress och tid
            loadGameFromLocalStorage(); // läser in all data från localstorage och lägger tillbaka i state
            refetchGamestate();
        }

        state.screen = 'room';
        render();
        startStatusBarTimers(); // startar timers igen när spelare klickat på retry
    });

    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.addEventListener('click', () => {
        if (state.gameOverReason === 'total-timeout') {
            clearLocalStorageSave();
        } else {
            saveGameToLocalStorage();
        }
        state.screen = 'menu';
        render();
    });

    const logOutButton = document.createElement('button');
    logOutButton.textContent = 'End Game';
    logOutButton.addEventListener('click', () => {

        if (state.gameOverReason === 'total-timeout') {
            clearLocalStorageSave();
        } else {
            saveGameToLocalStorage();
        }
        state.screen = 'login';
        render();
    });

    const title = document.createElement('h2');
    title.textContent = 'GAME OVER';

    const gameOverText = document.createElement('p');

    if (state.gameOverReason === 'total-timeout') {
        gameOverText.textContent = 'You ran out of time. The forest claims you forever.';
    } else if (state.gameOverReason === 'room-timeout') {
        gameOverText.textContent = 'Time ran out in this room. Try again.';
    } else {
        gameOverText.textContent = 'You failed too many times. Try again.';
    }

    buttonsContainer.appendChild(retryButton);
    buttonsContainer.appendChild(mainMenuButton);
    buttonsContainer.appendChild(logOutButton);

    container.append(title, gameOverText, buttonsContainer);

    sceneWrapper.appendChild(container);
};
