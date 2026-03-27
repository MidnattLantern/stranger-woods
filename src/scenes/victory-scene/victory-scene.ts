
import './victory-scene.scss';
import { renderHighScore, saveHighscore } from '../../components/high-score/high-score';
import { getSecondsElapsed, stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { render } from '../../main';
import { state } from '../../state/gamestate';
import { attachHack } from '../../components/high-score/high-score';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';

const sceneWrapper: HTMLDivElement | null =
    document.querySelector('#sceneWrapper');

export function renderVictoryScene() {
    if (!sceneWrapper) return;
    stopAllStatusBarTimers();
    const minutes = Math.floor(getSecondsElapsed() / 60);
    const seconds = getSecondsElapsed() % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // ==========
    // UI helpers
    // ==========
    sceneWrapper.innerHTML = '';

    const victorySceneWrapperElement = document.createElement('div');
    victorySceneWrapperElement.classList.add('victory-scene-wrapper-element');

    const victorySceneHeaderElement = document.createElement('h2');
    victorySceneHeaderElement.textContent = 'Congratulations!';

    const victorySceneUndertitleElement = document.createElement('p');
    victorySceneUndertitleElement.textContent =
        'You made it out the strange woods alive.';

    const displayPlayersElapsedTimeElement = document.createElement('p');
    displayPlayersElapsedTimeElement.textContent = `Your time: ${formattedTime}`;

    const shareResultsButton = document.createElement('button');
    shareResultsButton.id = 'shareResultsButtonElement';
    shareResultsButton.textContent = 'Share results (copy to clipboard)';
    shareResultsButton.addEventListener('click', handleCopyResultsToClipboard);

    const mainMenuButton = document.createElement('button');
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.addEventListener('click', () => {
        saveGameToLocalStorage();
        state.screen = 'menu';
        render();
    });

    const highScoreWrapper = document.createElement('div');
    highScoreWrapper.id = 'highScoreWrapper';

    victorySceneWrapperElement.append(
        victorySceneHeaderElement,
        victorySceneUndertitleElement,
        displayPlayersElapsedTimeElement,
        shareResultsButton,
        mainMenuButton
    );
    sceneWrapper.append(victorySceneWrapperElement, highScoreWrapper);
    // ==========

    saveHighscore(state.username, getSecondsElapsed());
    renderHighScore();
    attachHack();

    const backToMenuBtn: HTMLButtonElement | null =
        document.querySelector('#backToMenu');

    backToMenuBtn?.addEventListener('click', () => {
        state.currentRoom = 0;
        state.screen = 'menu';
        render();
    });
}

function handleCopyResultsToClipboard() {
    const minutes = Math.floor(getSecondsElapsed() / 60);
    const seconds = getSecondsElapsed() % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const URL =
        'https://medieinstitutet.github.io/fed25d-js-intro-grupparbete-the-dopefish-admirers/';
    const shareResultsButtonElement = document.getElementById(
        'shareResultsButtonElement',
    ) as HTMLButtonElement | null;

    navigator.clipboard.writeText(
        `I scored ${formattedTime} at the escape room Strange Woods! Bet you can't beat that, let alone make it out alive: ${URL}`,
    );
    if (shareResultsButtonElement) {
        shareResultsButtonElement.textContent = 'Copied to clipboard!';
        setTimeout(() => {
            shareResultsButtonElement.textContent = 'Share results again';
        }, 10000);
    }
}
