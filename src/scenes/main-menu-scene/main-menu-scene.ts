import './main-menu-scene.scss';
import { state } from '../../state/gamestate';
import { loadGameFromLocalStorage, clearLocalStorageSave } from '../../store/database/local-storage-database';
import { startStatusBarTimers, stopAllStatusBarTimers, refetchGamestate, resetStatusBarProgress } from '../../components/status-bar/status-bar';

export function renderMainMenuScene(
    sceneWrapper: HTMLDivElement | null,
    render: () => void
) {
    if (!sceneWrapper) return;

    sceneWrapper.innerHTML = ''; // reset

    sceneWrapper.innerHTML = `
        <div class="main-menu">
            <div class="menu-buttons">
                <button id="startGame" class="menu-btn primary">New game</button>
                ${state.isReturningPlayer ? '<button id="loadGame" class="menu-btn">Load game</button>' : ''}
                <button id="about" class="menu-btn">About</button>
                <button id="logout" class="menu-btn secondary">Log out</button>
            </div>
        </div>
    `;

    // --------------- DOM ELEMENTS ----------------
    // ----------------------------------------------

    const startGameBtn = document.getElementById('startGame') as HTMLButtonElement | null;
    const loadGameBtn = document.getElementById('loadGame') as HTMLButtonElement | null;
    const aboutBtn = document.getElementById('about') as HTMLButtonElement | null;
    const logoutBtn = document.getElementById('logout') as HTMLButtonElement | null;

    // ------ EVENT HANDLERS & FUNCTIONS ---------
    // ----------------------------------------------

    startGameBtn?.addEventListener('click', () => { //? betyder om det inte är null
        if (state.screen === 'menu') {
            resetStatusBarProgress();
            clearLocalStorageSave();

            state.currentRoom = 0; // Starta från första rummet
            state.completed = [false, false, false, false, false, false];
            state.highestRoom = 0;
            state.codes = [];
            state.artifacts = [];
            state.questionIndex = [];
            state.room2Path = null;

            state.screen = 'room';
            render();               // Kör render() som kommer anropa renderNextRoom()

            startStatusBarTimers();
        }
    });

    loadGameBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            loadGameFromLocalStorage();
            refetchGamestate();

            stopAllStatusBarTimers();

            state.screen = 'room';
            render();

            startStatusBarTimers();
        }
    });

    aboutBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            state.screen = 'about';
            render();
        }
    });

    logoutBtn?.addEventListener('click', () => {
        if (state.screen === 'menu') {
            state.screen = 'login';  // Byt till login skärmen
            render();
        }
    });
}
