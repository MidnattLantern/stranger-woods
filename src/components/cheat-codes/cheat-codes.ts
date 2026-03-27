// Cheat Codes is created for the development team to test the logic responsiveness of logic by clicking on buttons
// Do not make this accessible for production
import {
    renderStatusBar,
    startStatusBarTimers,
    stopAllStatusBarTimers,
} from '../status-bar/status-bar';
import './cheat-code-styles.scss';
import { createCheatButton } from './cheat-codes-helper';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { getHighScores, saveHighscore } from '../high-score/high-score';
import { renderVictoryScene } from '../../scenes/victory-scene/victory-scene';
import { triggerArtifact } from '../artifacts/artifactSystem';
import { setRoom4CliffMonumentIsBeaten, setRoom4CrossroadsMonumentIsBeaten, setRoom4HasFishStatueArtifact, setRoom4HasLadder, setRoom4HasRubberDuckArtifact, setRoom4RavineMonumentIsBeaten } from '../../rooms/room4/room4-story-controller';

let showCheatCodes: boolean = false;
const showCheatCodesButton = document.getElementById(
    'showCheatCodesButton',
) as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById(
    'cheatCodesWrapper',
) as HTMLDivElement | null;

// ===================================
// Create and store cheat buttons here
// ===================================
const cheatButtons = {

    cheatRenderSignInScene: createCheatButton('render sign in scene', () => {
        state.screen = 'login';
        render();
    }),

    cheatRenderMainMenuScene: createCheatButton(
        'render main menu scene',
        () => {
            state.screen = 'menu';
            render();
        },
    ),

    cheatRenderAboutScene: createCheatButton('render about scene', () => {
        state.screen = 'about';
        render();
    }),

    cheatRenderGameOverScene: createCheatButton(
        'render game over scene',
        () => {
            state.screen = 'gameover';
            render();
        },
    ),

    cheatRenderVictoryScene: createCheatButton('render victory scene', () => {
        state.screen = 'victory';
        render();
    }),

    cheatRenderRoom1: createCheatButton(
        'render room 1',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 0;
            state.screen = 'room';
            render();
            startStatusBarTimers();
        }
    ),

    cheatRenderRoom2: createCheatButton( 
        'render room 2',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 1;
            state.screen = 'room';
            render();
            startStatusBarTimers();
        }
    ),
    cheatRenderRoom3: createCheatButton(
        'render room 3',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 2;
            state.screen = 'room';
            render();
            startStatusBarTimers();
        }
    ),
    cheatRenderRoom4: createCheatButton(
        'render room 4',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 3;
            state.screen ='room';
            render();
            startStatusBarTimers();
        }
    ),
    cheatRenderRoom5: createCheatButton(
        'render room 5',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 4;
            state.screen ='room';
            render();
            startStatusBarTimers();
        }
    ),
    cheatRenderRoom6: createCheatButton(
        'render room 6',
        () => {
            stopAllStatusBarTimers();
            state.currentRoom = 5;
            state.screen = 'room';
            render();
            startStatusBarTimers();
        }
    ),
    cheatRenderStatusBar: createCheatButton(
        'render status bar',
        renderStatusBar,
    ),
    cheatStopAllStatusBarTimers: createCheatButton(
        'stop all status bar timers',
        handleStopAllStatusBarTimers,
    ),
    cheatGetHighScores: createCheatButton('get high scores', getHighScores),
    cheatSaveHighScore: createCheatButton('save high score', handleSaveHighScore),
    cheatRenderHighScore: createCheatButton('render high score', renderVictoryScene),
    cheatCreateHighScoreMockData: createCheatButton('create high score mock data', createHighScoreMockData),
    cheatGiveLadder: createCheatButton('give ladder', handleGiveLadder),
    cheatGiveFishStatue: createCheatButton('give fish statue', handleGiveFishStatue),
    cheatGiveRubberDuck: createCheatButton('give rubber duck', handleGiveRubberDuck),
    cheatGiveKey: createCheatButton('give key', handleGiveKey),
    cheatGiveFeather: createCheatButton('give feather', handleGiveFeather),
    cheatGiveWalkingPot: createCheatButton('give walking pot', handleGiveWalkingPot),
    cheatGiveAmethyst: createCheatButton('give amethyst', handleGiveAmethyst),

};
// ===================================

// =============================
// Local special cheat functions
// =============================
function handleStopAllStatusBarTimers() {
    stopAllStatusBarTimers();
}
function handleSaveHighScore() {
    saveHighscore('dummyuser', 42);
}
function createHighScoreMockData() {
    const mockScores = [
        { name: 'Alice', score: 245 },
        { name: 'Bob', score: 180 },
        { name: 'Charlie', score: 320 },
        { name: 'Diana', score: 150 },
        { name: 'Rasmus', score: 200 },
        { name: 'Alma', score: 245 },
        { name: 'Linn', score: 180 },
        { name: 'Alda', score: 320 },
        { name: 'Kimi', score: 250 },
        { name: 'Isabelle', score: 200 },
    ];
    localStorage.setItem('escaperoom_highscores', JSON.stringify(mockScores));
}
function handleGiveLadder() {
    triggerArtifact('room4', 'ladder', 0);
    setRoom4HasLadder(true);
    setRoom4CrossroadsMonumentIsBeaten(true);
}
function handleGiveFishStatue() {
    triggerArtifact('room4', 'fish-statue', 0);
    setRoom4HasFishStatueArtifact(true);
    setRoom4RavineMonumentIsBeaten(true);
}
function handleGiveRubberDuck() {
    triggerArtifact('room4', 'rubber-duck', 0);
    setRoom4HasRubberDuckArtifact(true);
    setRoom4CliffMonumentIsBeaten(true);
}
function handleGiveKey() {
    triggerArtifact('room2', 'key', 0);
}
function handleGiveFeather() {
    triggerArtifact('room1', 'feather', 0);
}
function handleGiveWalkingPot() {
    triggerArtifact('room3', 'walking-pot', 0);
}
function handleGiveAmethyst() {
    triggerArtifact('room5', 'amethyst', 0);
}

// =============================

showCheatCodesButton?.addEventListener('click', toggleCheatCodeButtons);
function toggleCheatCodeButtons() {
    showCheatCodes = !showCheatCodes;
    if (!cheatCodesWrapper) return;
    if (showCheatCodes) {
        cheatCodesWrapper.append(
            // ==================================================
            // Append cheat buttons here, disable to hide from UI
            // ==================================================
            cheatButtons.cheatRenderRoom1,
            cheatButtons.cheatRenderRoom2,
            cheatButtons.cheatRenderRoom3,
            cheatButtons.cheatRenderRoom4,
            cheatButtons.cheatRenderRoom5,
            cheatButtons.cheatRenderRoom6,
            cheatButtons.cheatRenderSignInScene,
            cheatButtons.cheatRenderMainMenuScene,
            cheatButtons.cheatRenderAboutScene,
            cheatButtons.cheatRenderGameOverScene,
            cheatButtons.cheatRenderVictoryScene,
            cheatButtons.cheatRenderStatusBar,
            cheatButtons.cheatStopAllStatusBarTimers,
            cheatButtons.cheatGetHighScores,
            cheatButtons.cheatSaveHighScore,
            cheatButtons.cheatRenderHighScore,
            cheatButtons.cheatCreateHighScoreMockData,
            cheatButtons.cheatGiveLadder,
            cheatButtons.cheatGiveFishStatue,
            cheatButtons.cheatGiveRubberDuck,
            cheatButtons.cheatGiveKey,
            cheatButtons.cheatGiveFeather,
            cheatButtons.cheatGiveWalkingPot,
            cheatButtons.cheatGiveAmethyst,

            // ==================================================
        );
    } else {
        cheatCodesWrapper.innerHTML = '';
    }
}
