import './main-menu-scene.scss';
import { startStatusBarTimers, resetStatusBarProgress } from '../../components/status-bar/status-bar';
import { getSessionState } from '../../store/session-memory/session-state';
import { mainMenuUI } from './main-menu.ui';
import { sceneWrapper } from '../scene-handler';

export function renderMainMenuScene() {

    const uiMasterContainer = mainMenuUI.masterContainer();
    const startGameButton = mainMenuUI.startGameButton();
    const profileSelectionButton = mainMenuUI.profileSelectionButton();
    const saveProfileName = mainMenuUI.saveProfileName();

    uiMasterContainer.append(saveProfileName, startGameButton, profileSelectionButton);
    sceneWrapper.append(uiMasterContainer);

    const currentUserHeading = document.getElementById("currentUserHeading");
    const currentScene = getSessionState();

    if (!currentUserHeading) return;
    const userID = getSessionState();
    currentUserHeading.textContent = userID.userProfileID;

    startGameButton?.addEventListener('click', () => {

        if (currentScene.scene === 'menu') {
            resetStatusBarProgress();
            startStatusBarTimers();
        }
    });
}
