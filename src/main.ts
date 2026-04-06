import './components/cheat-codes/cheat-codes';
import './styles/style.scss';
import { state } from './state/gamestate';
import { getSessionState } from './store/session-memory/session-state';
import './components/high-score/high-score';
import { getSecondsElapsed, stopAllStatusBarTimers, removeArtifactByRoomIndex, roomArtifactIds } from './components/status-bar/status-bar';
import { saveHighscore } from './components/high-score/high-score';
import { saveGameToLocalStorage, clearLocalStorageSave } from './store/database/local-storage-database';
import { rockPaperScissors } from './rooms/rock-paper-scissors/rock-paper-scissors';
import { sudoku } from './rooms/sudoku/sudoku';
import { memory } from './rooms/memory/memory';
import { strangersBook } from './rooms/strangers-book/strangers-book';
import { renderScene } from './scenes/scene-handler';

const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement;
const sessionState = getSessionState();

const allRooms = [rockPaperScissors, sudoku, memory, strangersBook];

export function renderNextRoom() {

    if (state.currentRoom >= allRooms.length) { // handle complete game
        saveHighscore(state.username, getSecondsElapsed());
        clearLocalStorageSave();
        sessionState.scene = 'victory';
        renderScene();
        return;
    }

    if (sceneWrapper) { // reset?
        sceneWrapper.innerHTML = '';
    }

    const room = allRooms[state.currentRoom];
    const isRevisiting = state.completed[state.currentRoom]; // consider session memory?

    if (isRevisiting) { // consider session memory?
        removeArtifactByRoomIndex(state.currentRoom);
        state.artifacts = state.artifacts.filter(a => a.id !== roomArtifactIds[state.currentRoom]);
        delete state.codes[state.currentRoom];
        state.questionIndex[state.currentRoom] = 0;
        state.completed[state.currentRoom] = false;
        saveGameToLocalStorage();
    }

    room(sceneWrapper, () => {
        state.completed[state.currentRoom] = true;
        state.highestRoom = Math.max(state.highestRoom, state.currentRoom + 1);
        state.currentRoom = state.highestRoom;

        saveGameToLocalStorage();
        if (state.screen === 'victory') return;
        renderScene();
    });
}

// Log out 
document.getElementById('statusBarWrapper')?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.id === 'logOutBtn') {
        saveGameToLocalStorage();
        stopAllStatusBarTimers();
        state.screen = 'login';
        renderScene();
    }
});

renderScene();
