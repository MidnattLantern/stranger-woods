import './components/cheat-codes/cheat-codes';
import './styles/style.scss';
import { state } from './state/gamestate';
import { renderSignInScene } from './scenes/sign-in-scene/sign-in-scene';
import { renderMainMenuScene } from './scenes/main-menu-scene/main-menu-scene';
import { renderGameOverScene } from './scenes/game-over-scene/game-over-scene';
import { room1 } from './rooms/room1/room1';
import { room2 } from './rooms/room2/room2';
import { room3 } from './rooms/room3/room3';
import { room4 } from './rooms/room4/room4';
import { room5 } from './rooms/room5/room5';
import { room6 } from './rooms/room6/room6';
import { renderAboutScene } from './scenes/about-scene/about-scene';
import './components/high-score/high-score';
import { renderVictoryScene } from './scenes/victory-scene/victory-scene';
import { getSecondsElapsed, renderStatusBar, stopAllStatusBarTimers, removeArtifactByRoomIndex, roomArtifactIds } from './components/status-bar/status-bar';
import { saveHighscore } from './components/high-score/high-score';
import { saveGameToLocalStorage, clearLocalStorageSave } from './store/database/local-storage-database';


// please check the document in this link:
// https://medieinstitutet-my.sharepoint.com/:w:/g/personal/alda_catovic_medieinstitutet_se/IQApMQpuaX8YToqheHZBk5Y4AQvnQa3uXsRg0XzjSP18ehU?rtime=AQuzKQlr3kg

/** Session states
 * room x is unlocked boolean
 * You can only revisit previous rooms after beating room 6, and all the hourglasses are remembered
 * Session states and localstrage memory not to be confused with each other
 * Session states is like the RAM
 * Localstorage is like the SSD
 */

const sceneWrapper: HTMLDivElement | null = document.querySelector('#sceneWrapper');

export function render() {
    switch (state.screen) {
        case 'login':
            renderSignInScene(sceneWrapper, render);
            break;
        case 'menu':
            renderMainMenuScene(sceneWrapper, render);
            break;
        case 'room':
            renderNextRoom();
            break;
        case 'victory':
            renderVictoryScene();
            break;
        case 'gameover':
            renderGameOverScene();
            break;
        case 'about':
            renderAboutScene();
    }

    // show & hide h1
    const h1Element = document.querySelector('h1');
    const statusBarElement = document.getElementById('statusBarWrapper');
    if (state.screen === 'room' || state.screen === 'about' || state.screen === 'gameover' || state.screen === 'victory') {
        if (h1Element) h1Element.classList.add('hidden');
    } else {
        if (h1Element) h1Element.classList.remove('hidden');
    }

    if (state.screen === 'room') {
        if (statusBarElement) statusBarElement.classList.remove('hidden');
    } else {
        if (statusBarElement) statusBarElement.classList.add('hidden');
    }

    renderStatusBar();
}

const allRooms = [room1, room2, room3, room4, room5, room6];

export function renderNextRoom() {

    if (state.currentRoom >= allRooms.length) {
        saveHighscore(state.username, getSecondsElapsed());
        clearLocalStorageSave();
        state.screen = 'victory';
        render();
        return;
    }

    if (sceneWrapper) {
        sceneWrapper.innerHTML = '';
    }

    const room = allRooms[state.currentRoom];
    const isRevisiting = state.completed[state.currentRoom];

    if (isRevisiting) {
        removeArtifactByRoomIndex(state.currentRoom);
        state.artifacts = state.artifacts.filter(a => a.id !== roomArtifactIds[state.currentRoom]);
        delete state.codes[state.currentRoom];
        state.questionIndex[state.currentRoom] = 0;
        state.completed[state.currentRoom] = false;
        state.room2Path = null;
        saveGameToLocalStorage();
    }

    room(sceneWrapper, () => {
        state.completed[state.currentRoom] = true;
        state.highestRoom = Math.max(state.highestRoom, state.currentRoom + 1);
        state.currentRoom = state.highestRoom;

        saveGameToLocalStorage();
        if (state.screen === 'victory') return;
        render();
    });
}

function enableKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const focused = document.activeElement as HTMLElement;

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const buttons = Array.from(
                document.querySelectorAll<HTMLButtonElement>(
                    '#sceneWrapper button:not(:disabled), .room-intro-overlay button:not(:disabled)'
                )
            ).filter(btn => {
                const rect = btn.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            }); // filtrerar bort dolda knappar

            const currentIndex = buttons.indexOf(focused as HTMLButtonElement);

            if (e.key === 'ArrowDown') {
                const next = buttons[currentIndex + 1] ?? buttons[0];
                next?.focus();
                next?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                const prev = buttons[currentIndex - 1] ?? buttons[buttons.length - 1];
                prev?.focus();
                prev?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (e.key === 'Enter') {
            if (focused?.tagName === 'BUTTON' && !focused.hasAttribute('disabled')) {
                e.preventDefault();
                e.stopPropagation();
                focused.click();
            }
        }
    }, true);

    const observer = new MutationObserver(() => {
        setTimeout(() => {
            const firstBtn = document.querySelector<HTMLButtonElement>(
                '#sceneWrapper button:not(:disabled), .room-intro-overlay button:not(:disabled)'
            );
            if (document.activeElement === document.body || document.activeElement === null) {
                firstBtn?.focus();
            }
        }, 300);
    });

    observer.observe(sceneWrapper ?? document.body, { childList: true, subtree: true });
}

enableKeyboardNavigation();

// Log out 
document.getElementById('statusBarWrapper')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.id === 'logOutBtn') {
        saveGameToLocalStorage();
        stopAllStatusBarTimers();
        state.screen = 'login';
        render();
    }
});

render();
