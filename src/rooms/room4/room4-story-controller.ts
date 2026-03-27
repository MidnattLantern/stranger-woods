import type { IButtonEvent, IScriptEvent } from './models';
import { reRenderRoom4 } from './room4';
import { closeMiniSudokuGameSession, renderMiniSudoku } from './puzzle/mini-sudoku';
import { setTableToUse } from './puzzle/mini-sudoku-setup';
import { getGameSessionBeatenState } from './puzzle/mini-sudoku-states';
import { validateTable } from './puzzle/mini-sudoku-helper';
import { state } from '../../state/gamestate';

// enter silent tide stories
import room4Story from '../../data/stories-data/room4-story/room4-story.json';
import attemptSwimStory from '../../data/stories-data/room4-story/attempt-swim.json';
import climbTreeStory from '../../data/stories-data/room4-story/climb-tree.json';

// crossroads stories
import atCrossroadsStory from '../../data/stories-data/room4-story/at-crossroads.json';
import escapeStory from '../../data/stories-data/room4-story/escape.json';

// crossroads monument stories
import atCrossroadsMonumentStory from '../../data/stories-data/room4-story/at-crossroads-monument.json';
import inspectCrossroadsMonumentStory from '../../data/stories-data/room4-story/inspect-crossroads-monument.json';
import crossroadsMonumentWinStory from '../../data/stories-data/room4-story/crossroads-monument-win.json';
import crossroadsMonumentLoseStory from '../../data/stories-data/room4-story/crossroads-monument-lose.json';

// ravine stories
import atRavineStory from '../../data/stories-data/room4-story/at-ravine.json';
import ravineJumpStory from '../../data/stories-data/room4-story/ravine-jump.json';
import ravineLadderStory from '../../data/stories-data/room4-story/ravine-ladder.json';
import inspectRavineMonumentStory from '../../data/stories-data/room4-story/inspect-ravine-monument.json';
import ravineMonumentWinStory from '../../data/stories-data/room4-story/ravine-monument-win.json';
import ravineMonumentLoseStory from '../../data/stories-data/room4-story/ravine-monument-lose.json';

// cliff stories
import atCliffStory from '../../data/stories-data/room4-story/at-cliff.json';
import cliffLadderStory from '../../data/stories-data/room4-story/cliff-ladder.json';
import inspectCliffMonumentStory from '../../data/stories-data/room4-story/inspect-cliff-monument.json';
import cliffMonumentWinStory from '../../data/stories-data/room4-story/cliff-monument-win.json';
import cliffMonumentLoseStory from '../../data/stories-data/room4-story/cliff-monument-lose.json';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { render } from '../../main';

let room4StoryToUse: IScriptEvent[] = room4Story;
let room4StoryIndex: number = 0;
let room4TitleText: string = 'The silent tide';
let room4TextEvent: string = '';
let room4EventMarker: string = '';
let room4StoryEventButtons: IButtonEvent[] = [];
let room4HasLadder: boolean = false; // consider moving to store directory
let room4HasRubberDuckArtifact: boolean = false; // consider moving to store directory
let room4HasFishStatueArtifact: boolean = false; // consider moving to store directory
let room4CrossroadsMonumentIsBeaten: boolean = false; // consider moving to store directory
let room4RavineMonumentIsBeaten: boolean = false; // consider moving to store directory
let room4CliffMonumentIsBeaten: boolean = false; // consider moving to store directory

export const getRoom4TitleText = () => room4TitleText;
export const getRoom4TextEvent = () => room4TextEvent;
export const getRoom4EventMarker = () => room4EventMarker;
export const getRoom4StoryEventButtons = () => room4StoryEventButtons;
export const getRoom4HasLadder = () => room4HasLadder; // consider moving to store directory
export const getRoom4HasRubberDuckArtifact = () => room4HasRubberDuckArtifact; // consider moving to store directory
export const getRoom4HasFishStatueArtifact = () => room4HasFishStatueArtifact; // consider moving to store directory
export const getRoom4CrossroadsMonumentIsBeaten = () => room4CrossroadsMonumentIsBeaten; // consider moving to store directory
export const getRoom4RavineMonumentIsBeaten = () => room4RavineMonumentIsBeaten; // consider moving to store directory
export const getRoom4CliffMonumentIsBeaten = () => room4CliffMonumentIsBeaten; // consider moving to store directory

export function setRoom4HasLadder(state: boolean) { // consider moving to store directory
    room4HasLadder = state;
}
export function setRoom4HasRubberDuckArtifact(state: boolean) { // consider moving to store directory
    room4HasRubberDuckArtifact = state;
}
export function setRoom4HasFishStatueArtifact(state: boolean) { // consider moving to store directory
    room4HasFishStatueArtifact = state;
}
export function setRoom4CrossroadsMonumentIsBeaten(state: boolean) { // consider moving to store directory
    room4CrossroadsMonumentIsBeaten = state;
}
export function setRoom4RavineMonumentIsBeaten(state: boolean) { // consider moving to store directory
    room4RavineMonumentIsBeaten = state;
}
export function setRoom4CliffMonumentIsBeaten(state: boolean) { // consider moving to store directory
    room4CliffMonumentIsBeaten = state;
}

function refreshRoom4UI(storyIndex: number = 0, newTitleText?: string) {
    room4StoryIndex = storyIndex;
    if (newTitleText) {
        room4TitleText = newTitleText;
    }
    updateRoom4StoryController();
    reRenderRoom4();
}

export function traverseResetRoom4() { // softer resetter fit for a current game session
    room4StoryToUse = room4Story;
    room4StoryIndex = 0;
    room4TitleText = 'The silent tide';
    room4TextEvent = '';
    room4EventMarker = '';
    room4StoryEventButtons = [];
    refreshRoom4UI();
}

function resetRoom4() {
    room4StoryToUse = room4Story;
    room4StoryIndex = 0;
    room4TitleText = 'The silent tide';
    room4TextEvent = '';
    room4EventMarker = '';
    room4StoryEventButtons = [];
    room4HasLadder = false;
    room4HasRubberDuckArtifact = false;
    room4HasFishStatueArtifact = false;
    room4CrossroadsMonumentIsBeaten = false;
    room4RavineMonumentIsBeaten = false;
    room4CliffMonumentIsBeaten = false;
    refreshRoom4UI();
}

function turnPage() {
    room4StoryIndex++;
    updateRoom4StoryController();
    reRenderRoom4();
}

// Enter the silent tide specific events - consider converting to a Class
function attemptSwim() {
    room4StoryToUse = attemptSwimStory;
    refreshRoom4UI();
}
function attemptSwimContinue() {
    room4StoryToUse = room4Story;
    refreshRoom4UI(2);
}
function climbTree() {
    room4StoryToUse = climbTreeStory;
    refreshRoom4UI();
}
function climbTreeContinue() {
    room4StoryToUse = room4Story;
    refreshRoom4UI(2);
}
function enterCrossroads() {
    room4StoryToUse = atCrossroadsStory;
    refreshRoom4UI(0, 'Crossroads');
}

// crossroads specific events - consider converting to a Class
function enterCrossroadsMonument() {
    room4StoryToUse = atCrossroadsMonumentStory;
    refreshRoom4UI(0, 'Crossroads | Monument');
}
function enterRavine() {
    room4StoryToUse = atRavineStory;
    refreshRoom4UI(0, 'Crossroads | Ravine');
}
function enterCliff() {
    room4StoryToUse = atCliffStory;
    refreshRoom4UI(0, 'Crossroads | Cliff');
}
function escapeWithAnyArtifact() {
    room4StoryToUse = escapeStory;
    refreshRoom4UI();
}

// crossroads monument specific events - consider converting to a Class
function inspectCrossroadsMonument() {
    setTableToUse('table1');
    renderMiniSudoku();
    room4StoryToUse = inspectCrossroadsMonumentStory;
    refreshRoom4UI();
}
function crossroadsMonumentWin() {
    room4StoryToUse = crossroadsMonumentWinStory;
    refreshRoom4UI();
}
function crossroadsMonumentLose() {
    room4StoryToUse = crossroadsMonumentLoseStory;
    refreshRoom4UI();
}
function crossroadsMonumentCheck() {
    validateTable();
    if (getGameSessionBeatenState()) {
        triggerArtifact('room4', 'ladder', 500);
        room4StoryToUse = crossroadsMonumentWinStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    } else {
        room4StoryToUse = crossroadsMonumentLoseStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    }
}

// ravine specific events - consider converting to a Class
function attemptJumpAcrossRavine() {
    room4StoryToUse = ravineJumpStory;
    refreshRoom4UI();
}
function useLadderAsBridge() {
    room4StoryToUse = ravineLadderStory;
    refreshRoom4UI(0, '... | Ravine | Monument');
}
function atRavineMonument() {
    room4StoryToUse = ravineLadderStory;
    refreshRoom4UI(1);
}
function inspectRavineMonument() {
    setTableToUse('table2');
    renderMiniSudoku();
    room4StoryToUse = inspectRavineMonumentStory;
    refreshRoom4UI();
}
function ravineMonumentWin() {
    room4StoryToUse = ravineMonumentWinStory;
    refreshRoom4UI();
}
function ravineMonumentLose() {
    room4StoryToUse = ravineMonumentLoseStory;
    refreshRoom4UI();
}
function ravineMonumentCheck() {
    validateTable();
    if (getGameSessionBeatenState()) {
        triggerArtifact('room4', 'fish-statue', 500);
        room4StoryToUse = ravineMonumentWinStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    } else {
        room4StoryToUse = ravineMonumentLoseStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    }
}

// cliff specific events - consider converting to a Class
function ladderToClimbCliff() {
    room4StoryToUse = cliffLadderStory;
    refreshRoom4UI(0, '... | Cliff | Monument');
}
function atCliffMonument() {
    room4StoryToUse = cliffLadderStory;
    refreshRoom4UI(2);
}
function inspectCliffMonument() {
    setTableToUse('table3');
    renderMiniSudoku();
    room4StoryToUse = inspectCliffMonumentStory;
    refreshRoom4UI();
}
function cliffMonumentLose() {
    room4StoryToUse = cliffMonumentLoseStory;
    refreshRoom4UI();
}
function cliffMonumentWin() {
    room4StoryToUse = cliffMonumentWinStory;
    refreshRoom4UI();
}
function cliffMonumentCheck() {
    validateTable();
    if (getGameSessionBeatenState()) {
        triggerArtifact('room4', 'rubber-duck', 500);
        room4StoryToUse = cliffMonumentWinStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    } else {
        room4StoryToUse = cliffMonumentLoseStory;
        closeMiniSudokuGameSession();
        refreshRoom4UI();
    }
}

// escape the silent tide
function escapeTheSilentTide() {
    const escapeRoom4Button = document.getElementById('escapeRoom4Button');
    if (!escapeRoom4Button) return;
    escapeRoom4Button.removeAttribute('disabled');
}

// multi-use events - consider converting to a Class
function returnToCrossroads() {
    room4StoryToUse = atCrossroadsStory;
    refreshRoom4UI(1, 'Crossroads');
}

export function handleRoom4ClickStoryEventButton(event: Event) {
    const clickedStoryEventButton = event.currentTarget as HTMLElement;
    const _functionMarker = clickedStoryEventButton.dataset.functionMarker;

    switch (_functionMarker) {
        // no event next
        case 'no-event-next':
            turnPage();
            return;

        // enter the silent tide events
        case 'enter-silent-tide-attempt-swim':
            attemptSwim();
            return;
        case 'cannot-swim-towards-surface-continue':
            attemptSwimContinue();
            return;
        case 'enter-silent-tide-climb-tree':
            climbTree();
            return;
        case 'cannot-climb-tree-continue':
            climbTreeContinue();
            return;
        case 'enter-silent-tide-go-to-crossroads':
            enterCrossroads();
            return;

        // crossroad events
        case 'at-crossroads-approach-ravine':
            enterRavine();
            return;
        case 'at-crossroads-approach-crossroads-monument':
            enterCrossroadsMonument();
            return;
        case 'at-crossroads-approach-cliff':
            enterCliff();
            return;
        case 'at-crossroads-use-rubber-duck-artifact':
            escapeWithAnyArtifact();
            return;
        case 'at-crossroads-use-fish-statue-artifact':
            escapeWithAnyArtifact();
            return;

        // crossroad monument events
        case 'crossroads-monument-turn-around':
            returnToCrossroads();
            return;
        case 'crossroads-monument-inspect-tablet':
            inspectCrossroadsMonument();
            return;
        case 'inspect-crossroads-monument-win':
            crossroadsMonumentWin();
            return;
        case 'inspect-crossroads-monument-lose':
            crossroadsMonumentLose();
            return;
        case 'inspect-crossroads-monument-check':
            crossroadsMonumentCheck();
            return;
        case 'crossroads-monument-win-turn-back-continue':
            room4HasLadder = true;
            room4CrossroadsMonumentIsBeaten = true;
            returnToCrossroads();
            return;
        case 'crossroads-monument-failed-try-again':
            inspectCrossroadsMonument();
            return;
        case 'crossroads-monument-failed-exit':
            enterCrossroadsMonument();
            return;

        // ravine events
        case 'at-ravine-attempt-jump-across':
            attemptJumpAcrossRavine();
            return;
        case 'at-ravine-turn-around':
            returnToCrossroads();
            return;
        case 'at-ravine-use-ladder-as-bridge':
            useLadderAsBridge();
            return;
        case 'ravine-trip-continue':
            resetRoom4();
            state.gameOverReason = 'too-many-attempts';
            state.screen = 'gameover';
            render();
            return;
        case 'across-ravine-turn-around':
            returnToCrossroads();
            return;
        case 'across-ravine-inspect-monument':
            inspectRavineMonument();
            return;
        case 'inspect-ravine-monument-lose':
            ravineMonumentLose();
            return;
        case 'ravine-monument-failed-exit':
            atRavineMonument();
            return;
        case 'ravine-monument-failed-try-again':
            inspectRavineMonument();
            return;
        case 'inspect-ravine-monument-win':
            ravineMonumentWin();
            return;
        case 'inspect-ravine-monument-check':
            ravineMonumentCheck();
            return;
        case 'ravine-monument-win-turn-back-continue':
            room4HasFishStatueArtifact = true;
            room4RavineMonumentIsBeaten = true;
            returnToCrossroads();
            return;

        // cliff events
        case 'at-cliff-turn-around':
            returnToCrossroads();
            return;
        case 'at-cliff-place-ladder-on-wall':
            ladderToClimbCliff();
            return;
        case 'cliff-summit-turn-around':
            returnToCrossroads();
            return;
        case 'cliff-summit-inspect-monument':
            inspectCliffMonument();
            return;
        case 'inspect-cliff-monument-check':
            cliffMonumentCheck();
            return;
        case 'inspect-cliff-monument-lose':
            cliffMonumentLose();
            return;
        case 'cliff-monument-failed-exit':
            atCliffMonument();
            return;
        case 'cliff-monument-failed-try-again':
            inspectCliffMonument();
            return;
        case 'inspect-cliff-monument-win':
            cliffMonumentWin();
            return;
        case 'cliff-monument-win-turn-back-continue':
            room4HasRubberDuckArtifact = true;
            room4CliffMonumentIsBeaten = true;
            returnToCrossroads();
            return;

        // escape
        case 'escape-continue':
            escapeTheSilentTide();
            return;

        // default
        default:
            return;
    }
}

function checkCompleted() {
    setRoom4HasLadder(false);
    setRoom4HasRubberDuckArtifact(false);
    setRoom4HasFishStatueArtifact(false);
    setRoom4CrossroadsMonumentIsBeaten(false);
    setRoom4RavineMonumentIsBeaten(false);
    setRoom4CliffMonumentIsBeaten(false);

    const artefactsData = state.artifacts;
    for (let i = 0; i < artefactsData.length; i++) {
        const artefactItem = artefactsData[i];
        if (artefactItem.id === 'ladder') {
            setRoom4HasLadder(true);
            setRoom4CrossroadsMonumentIsBeaten(true);
        }
        if (artefactItem.id === 'fish-statue') {
            setRoom4HasFishStatueArtifact(true);
            setRoom4RavineMonumentIsBeaten(true);
        }
        if (artefactItem.id === 'rubber-duck') {
            setRoom4HasRubberDuckArtifact(true);
            setRoom4CliffMonumentIsBeaten(true);
        }
    }
}

function updateRoom4StoryController() {
    checkCompleted();

    const currentStoryObject = room4StoryToUse[room4StoryIndex];
    room4TextEvent = currentStoryObject.textEvent!;
    room4EventMarker = currentStoryObject.eventMarker!;
    if (currentStoryObject.buttonEvents) { // fetch event buttons
        room4StoryEventButtons = currentStoryObject.buttonEvents;
    } else { // if there are not event buttons, make one that flips to the next page
        room4StoryEventButtons = [
            {
                label: 'Next',
                buttonMarker: 'no-event-next'
            },
        ];
    }
}

// initialize
updateRoom4StoryController();