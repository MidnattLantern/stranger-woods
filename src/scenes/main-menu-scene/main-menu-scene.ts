import './main-menu-scene.scss';
import { startStatusBarTimers, stopAllStatusBarTimers, resetStatusBarProgress } from '../../components/status-bar/status-bar';
import { getSessionState } from '../../store/session-memory/session-state';

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
    const currentScene = getSessionState();

    startGameBtn?.addEventListener('click', () => {

        if (currentScene.scene === 'menu') {
            resetStatusBarProgress();
            //clearLocalStorageSave();

//            state.currentRoom = 0; // Starta från första rummet
//            state.completed = [false, false, false, false, false, false];
//            state.highestRoom = 0;
//            state.codes = [];
//            state.artifacts = [];
//            state.questionIndex = [];
//            state.room2Path = null;

//            state.screen = 'room';
            render();

            startStatusBarTimers();
        }
    });

    loadGameBtn?.addEventListener('click', () => {
        if (currentScene.scene === 'menu') {

            stopAllStatusBarTimers();

            currentScene.scene = 'room';
            render();

            startStatusBarTimers();
        }
    });

    aboutBtn?.addEventListener('click', () => {
        if (currentScene.scene === 'menu') {
            currentScene.scene = 'about';
            render();
        }
    });

    logoutBtn?.addEventListener('click', () => {
        if (currentScene.scene === 'menu') {
            render();
        }
    });
}
