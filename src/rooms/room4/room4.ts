import './room4.scss';
import { getRoom4CliffMonumentIsBeaten, getRoom4CrossroadsMonumentIsBeaten, getRoom4EventMarker, getRoom4HasRubberDuckArtifact, getRoom4HasLadder, getRoom4HasFishStatueArtifact, getRoom4RavineMonumentIsBeaten, getRoom4StoryEventButtons, getRoom4TextEvent, getRoom4TitleText, handleRoom4ClickStoryEventButton, traverseResetRoom4 } from './room4-story-controller';
import { startStatusBarTimers, stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { showRoomIntro } from '../../components/room-intro/room-intro';

export function room4(sceneWrapper: HTMLDivElement | null, nextRoom: () => void) {
    if (!sceneWrapper) return;

    traverseResetRoom4();
    stopAllStatusBarTimers();
    startStatusBarTimers();

    showRoomIntro(
        4,
        () => { /* pauseTimer */ },
        () => { /* resumeTimer */ },
        () => {
            sceneWrapper.innerHTML = ''; // reset

            sceneWrapper.append(renderRoom4());
            reRenderRoom4();

            const escapeRoom4Button = document.createElement('button');
            if (!escapeRoom4Button) return;
            escapeRoom4Button.textContent = 'Escape The silent tide';
            escapeRoom4Button.addEventListener('click', () => {
                traverseResetRoom4();
                stopAllStatusBarTimers();
                nextRoom(); // Proceed to room 5
            });
            escapeRoom4Button.classList.add('escape-room-4-button');
            escapeRoom4Button.id = 'escapeRoom4Button';
            escapeRoom4Button.disabled = true;
            sceneWrapper.append(escapeRoom4Button);
        }
    );
}

function renderRoom4() {
    /** innerHTML model:
    <section class="room room-4">
        <div class="room-frame">
            <div class="game-session-wrapper">
                <h2 class="room-title-text" id="roomTitleText"></h2>
                <p class="event-text" id="eventText"></p>
                <div class="game-session-style">
                    <div id="storyEventButtonsWrapper"></div>
                </div>
            </div>
        </div>
    </section>
    */

    /* parent wrapper (following the 5 other room's convention)
    <section class="room room-1">
        <div class="room-frame">
            <div class="game-session-wrapper">
    */
    const room4Section = document.createElement('section');
    room4Section.classList.add('room');
    room4Section.classList.add('room-4');
    room4Section.id = 'room4Section';

    const roomFrame = document.createElement('div');
    roomFrame.classList.add('room-frame');
    roomFrame.classList.add('room-4-scene-wrapper');

    const gameSessionWrapper = document.createElement('div');
    gameSessionWrapper.classList.add('game-session-wrapper');

    // gameSessionWrapper's children
    const roomTitleTextElement = document.createElement('h2');
    roomTitleTextElement.id = 'roomTitleText';

    const eventTextElement = document.createElement('p');
    eventTextElement.id = 'eventText';
    eventTextElement.classList.add('room-4-event-text');
    // eventTextElement.classList.add('event-text');

    const gameSessionDiv = document.createElement('div');
    gameSessionDiv.classList.add('game-session-style');

    const storyEventButtonsWrapperElement = document.createElement('div');
    storyEventButtonsWrapperElement.classList.add('room-4-story-event-buttons-wrapper');
    storyEventButtonsWrapperElement.id = 'storyEventButtonsWrapper';

    // assemble wrapper
    room4Section.append(roomFrame);
    roomFrame.append(roomTitleTextElement, eventTextElement, gameSessionDiv);

    // assemble children & append to scene wrapper

    gameSessionDiv.append(storyEventButtonsWrapperElement);

    return room4Section;
}

export function reRenderRoom4() { // accessible for story-controller
    const roomTitleTextElement = document.getElementById('roomTitleText') as HTMLHeadElement | null;
    if (!roomTitleTextElement) return;
    roomTitleTextElement.textContent = getRoom4TitleText();

    const eventTextElement = document.getElementById('eventText') as HTMLParagraphElement | null;
    if (!eventTextElement) return;
    eventTextElement.textContent = getRoom4TextEvent();

    const storyEventButtonsWrapperElement = document.getElementById('storyEventButtonsWrapper') as HTMLDivElement | null;
    if (!storyEventButtonsWrapperElement) return;
    storyEventButtonsWrapperElement.innerHTML = ''; // reset

    const room4StoryEventButtons = getRoom4StoryEventButtons();
    for (let i: number = 0; i < room4StoryEventButtons.length; i++) {
        const _buttonMarker = room4StoryEventButtons[i].buttonMarker;
        const _eventMarker = getRoom4EventMarker();
        const _conditionalMarker = room4StoryEventButtons[i].conditionalMarker;

        const newStoryEventButton = document.createElement('button');
        // dataset for event marker need to look different whether it has a specific event
        if (room4StoryEventButtons[i].buttonMarker === 'no-event-next') {
            newStoryEventButton.dataset.functionMarker = 'no-event-next';
        } else {
            newStoryEventButton.dataset.functionMarker = `${_eventMarker}-${_buttonMarker}`;
        }

        // give conditional marker & gatekeep buttons that does not meet the given condition(s)
        if (_conditionalMarker) {
            newStoryEventButton.disabled = true;
            newStoryEventButton.dataset.conditionalMarker = _conditionalMarker;

            // revert the gatekept button if condition is met
            switch (_conditionalMarker) {
                case 'has-ladder':
                    if (getRoom4HasLadder()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'need-rubber-duck-artifact':
                    if (getRoom4HasRubberDuckArtifact()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'need-fish-statue-artifact':
                    if (getRoom4HasFishStatueArtifact()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                // Monuments work the opposite: gatekept when beaten
                case 'crossroads-monument-is-beaten':
                    if (!getRoom4CrossroadsMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'ravine-monument-is-beaten':
                    if (!getRoom4RavineMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                case 'cliff-monument-is-beaten':
                    if (!getRoom4CliffMonumentIsBeaten()) {
                        newStoryEventButton.removeAttribute('disabled');
                    }
                    break;
                default:
                    break;
            }
        }

        newStoryEventButton.innerText = room4StoryEventButtons[i].label!;
        //newStoryEventButton.classList.add('option');
        newStoryEventButton.classList.add('room-4-interaction-button');
        newStoryEventButton.addEventListener('click', handleRoom4ClickStoryEventButton);

        storyEventButtonsWrapperElement.append(newStoryEventButton);
    }
}