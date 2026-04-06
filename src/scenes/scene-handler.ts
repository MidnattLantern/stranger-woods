import { renderNextRoom } from "../main";
import { getSessionState } from "../store/session-memory/session-state";
import { renderAboutScene } from "./about-scene/about-scene";
import { renderGameOverScene } from "./game-over-scene/game-over-scene";
import { renderMainMenuScene } from "./main-menu-scene/main-menu-scene";
import { renderProfileSelectionScene } from "./profile-selection/profile-selection";
import { renderVictoryScene } from "./victory-scene/victory-scene";

export function renderScene() {
    const sessionState = getSessionState();
    const sceneWrapper = document.getElementById('sceneWrapper') as HTMLDivElement;
    switch (sessionState.scene) {
        case 'profileSelection':
            renderProfileSelectionScene(sceneWrapper, renderScene);
            break;
        case 'menu':
            renderMainMenuScene(sceneWrapper, renderScene);
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
}