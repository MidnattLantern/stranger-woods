import './status-bar.scss';
import { state } from '../../state/gamestate';
import type { Artifact } from '../artifacts/artifactSystem';
import { getRoomStates, getGameState, setRoomTime } from '../../state/gamestate';
import { renderGameOverScene } from '../../scenes/game-over-scene/game-over-scene';
import { render } from '../../main';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';

// ===============
// Timer variables
// ===============

// variable values are initial
let secondsElapsed: number = 0;
let roomStates = getRoomStates();
let gameState = getGameState();
let hourglassState = roomStates[gameState.currentRoom].roomTime; // how many seconds left for said room
export function getSecondsElapsed() {
    return secondsElapsed;
}

// as null when paused/ as interval when playing
let countdownIntervalState: ReturnType<typeof setInterval> | null = null;
let countupIntervalState: ReturnType<typeof setInterval> | null = null;
// ===============

// parent
const timersContainerElement = document.createElement('section');
timersContainerElement.classList.add('timers-container');

const lowerStatusContainerElement = document.createElement('section');
lowerStatusContainerElement.classList.add('lower-status-container');

const spanTimerElement = document.createElement('span');
spanTimerElement.textContent = '--:--';

const countupSpanElement = document.createElement('span');
countupSpanElement.textContent = '--:--';

// room-dropdown 
const spanRoomsElement = document.createElement('span');
const roomSelectElement = document.createElement('select');
roomSelectElement.id = 'roomSelect';

const labelElement = document.createElement('span');
//spanRoomsElement.appendChild(labelElement);
spanRoomsElement.appendChild(roomSelectElement);

const divArtifactsElement = document.createElement('div'); //added Artefact
divArtifactsElement.classList.add('status-bar-artifacts'); //added Artefact

export const logoutBtn = document.createElement('button');
logoutBtn.classList.add('logout-btn');
logoutBtn.textContent = 'Save & quit';
logoutBtn.id = 'logOutBtn';

// ----------------------------------------------------
// --------------------- Artefact ---------------------
// ----------------------------------------------------
const collectedArtifacts: Artifact[] = [];
let isRoom6 = false;

export function setRoom6Mode(active: boolean) {
    isRoom6 = active;
    renderArtifacts();
}

// Lägger till en artefakt i statusbaren — ignorerar dubletter
export function addArtifactToStatusBar(artifact: Artifact) {
    const alreadyCollected = collectedArtifacts.find((existingArtifact) => existingArtifact.id === artifact.id);
    if (alreadyCollected) return;

    collectedArtifacts.push(artifact);
    renderArtifacts();
}

// Hämtar en artefakt från samlingen via id — används av room6
export function getArtifactById(id: string): Artifact | undefined {
    return collectedArtifacts.find((a) => a.id === id);
}

function renderArtifacts() {

    const slots = Array.from({ length: 7 }).map((_, i) => {
        const artifact = collectedArtifacts[i];
        const slotIsEmpty = !artifact;

        if (slotIsEmpty) {
            return '<div class="artifact-slot"></div>';
        }

        return `
              <div class="artifact-slot ${isRoom6 ? 'draggable' : ''}"
                draggable="${isRoom6}"
                data-id="${artifact.id}"
            >
                <img 
                    src="${artifact.image}" 
                    alt="${artifact.name}" 
                    title="${artifact.name}"
                    class="status-bar-artifact"
                />
            </div>`;
    });

    divArtifactsElement.innerHTML = slots.join('');

    if (isRoom6) {
        divArtifactsElement.querySelectorAll('.artifact-slot.draggable').forEach((slot) => {
            slot.addEventListener('dragstart', (e) => {
                const artifactId = (slot as HTMLElement).dataset.id ?? '';
                (e as DragEvent).dataTransfer?.setData('artifactId', artifactId);

                const img = slot.querySelector('img') as HTMLImageElement;
                if (img) {
                    const canvas = document.createElement('canvas');
                    canvas.width = 30;
                    canvas.height = 30;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, 30, 30);
                    (e as DragEvent).dataTransfer?.setDragImage(canvas, 15, 15);
                }
            });
        });
    }
}

// tar bort artefakten från statusbaren när den droppas i room6

export function removeArtifactFromStatusBar(id: string) {
    const index = collectedArtifacts.findIndex((a) => a.id === id);

    if (index !== -1) {
        collectedArtifacts.splice(index, 1);
    }

    renderArtifacts();
}

//återställer insamlade artifakter när spelaren klickar på retry
export function setCollectedArtifacts(artifacts: Artifact[]) {
    artifacts.forEach(a => addArtifactToStatusBar(a));
}

export const roomArtifactIds = ['feather', 'key', 'walking-pot', 'ladder', 'rubber-duck', 'fish-statue', 'amethyst'];

export function removeArtifactByRoomIndex(roomIndex: number) {
    if (roomIndex === 3) return;

    const artifactId = roomArtifactIds[roomIndex];
    const index = collectedArtifacts.findIndex(a => a.id === artifactId);
    if (index !== -1) {
        collectedArtifacts.splice(index, 1);
    }

    renderArtifacts();
}

// ----------------------------------------------------
// ----------------------------------------------------
// ----------------------------------------------------

export function startStatusBarTimers() {
    // initialize
    startCountUp();
    startCountdown();
}

export function renderStatusBar() {
    const statusBarWrapper = document.getElementById('statusBarWrapper') as HTMLDivElement;
    if (!statusBarWrapper) return;

    if (state.screen === 'login' || state.screen === 'menu') {
        statusBarWrapper.innerHTML = '';
        return;
    }

    labelElement.textContent = `Progress: ${state.currentRoom}/6`;

    roomSelectElement.innerHTML = '';
    const roomNames = ['The Gravity Glitch', 'Victoria House', 'Inner Jungle', 'Escape The Silent Tide', 'Shadows of the Grove', 'Final Trial'];

    for (let i = 0; i < 6; i++) {
        const option = document.createElement('option');
        option.value = String(i);

        const isUnlocked = i <= state.currentRoom;

        if (isUnlocked) {
            option.textContent = `${i + 1}. ${roomNames[i]}`;
            option.disabled = false;
        } else {
            option.textContent = `${i + 1}. ${roomNames[i]}(Locked)`;
            option.disabled = true;
        }

        if (i === state.currentRoom) {
            option.selected = true;

        }
        roomSelectElement.appendChild(option);
    }

    timersContainerElement.append(
        spanTimerElement,
        countupSpanElement
    );

    lowerStatusContainerElement.append(
        divArtifactsElement,
        spanRoomsElement
    );

    statusBarWrapper.append(logoutBtn, timersContainerElement, lowerStatusContainerElement);
    renderArtifacts();
}

// ===============
// Timer functions
// ===============

const maxRoomTime = 50 * 60; // 50 minutes in seconds

// ticks
function handleCountdownTick() {
    secondsElapsed++;
    updateCountdownTextContent();
    setRoomTime(gameState.currentRoom, hourglassState);

    if (--hourglassState < 0) {
        stopCountdown();
        stopCountup();
        spanTimerElement.textContent = 'Time\'s up!';
        state.gameOverReason = 'room-timeout';
        renderGameOverScene();
    }
}
function handleCountupTick() {
    updateCountupTextContent();

    if (secondsElapsed >= maxRoomTime) {
        stopCountdown();
        stopCountup();
        countupSpanElement.textContent = 'Total time is up!';
        state.gameOverReason = 'total-timeout';
        renderGameOverScene();
    }
}

// play & pause
function startCountdown() {
    if (countdownIntervalState) return; // only run once
    countdownIntervalState = setInterval(handleCountdownTick, 1000);
    refetchGamestate();
}
function stopCountdown() {
    clearInterval(countdownIntervalState!);
    countdownIntervalState = null;
}
function startCountUp() {
    if (countupIntervalState) return; // only run once
    countupIntervalState = setInterval(handleCountupTick, 1000);
    refetchGamestate();
}
function stopCountup() {
    clearInterval(countupIntervalState!);
    countupIntervalState = null;
}

// UI helper(s)
function updateCountupTextContent() {
    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    countupSpanElement.textContent = `Elapsed Time: ${formattedTime}`;
}
function updateCountdownTextContent() {
    const minutes = Math.floor(hourglassState / 60);
    const seconds = hourglassState % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    spanTimerElement.textContent = 'Room Time Left: ' + formattedTime;
}

// pause
export function pauseCountdown() {
    stopCountdown();
}
export function pauseCountup() {
    stopCountup();
}
export function stopAllStatusBarTimers(): void {
    stopCountdown();
    stopCountup();
}

// refresh i.e when switching rooms
export function refetchGamestate() {
    roomStates = getRoomStates();
    gameState = getGameState();
    hourglassState = roomStates[gameState.currentRoom].roomTime;
}

export function setSecondsElapsed(value: number) {
    secondsElapsed = value; // Gör att den återstående tiden visas i statusbar istället för att visa 0 när spelar trycker på retry
}

// room-dropdown

function showConfirmDialog(message: string, onConfirm: () => void, onCancel: () => void): void {
    const overlay = document.createElement('div');
    overlay.classList.add('room-intro-overlay');
    overlay.innerHTML = `
        <div class="room-intro-card">
            <p class="room-intro-description">${message}</p>
            <div style="display: flex; gap: 0.5rem; width: 100%;">
                <button class="confirm-cancel-btn">Cancel</button>
                <button class="confirm-ok-btn">OK</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        const okBtn = overlay.querySelector('.confirm-ok-btn') as HTMLButtonElement;
        okBtn?.focus();
    }, 100);

    overlay.querySelector('.confirm-ok-btn')!.addEventListener('click', () => {
        overlay.remove();
        onConfirm();
    });

    overlay.querySelector('.confirm-cancel-btn')!.addEventListener('click', () => {
        overlay.remove();
        onCancel();
    });
}


roomSelectElement.addEventListener('change', () => {
    const selectedRoomIndex = Number(roomSelectElement.value);

    if (selectedRoomIndex === state.currentRoom) return;

    if (state.completed[selectedRoomIndex]) {
        showConfirmDialog(
            'Do you want to replay this room? Your progress in this room will be removed.',
            () => {
                removeArtifactByRoomIndex(selectedRoomIndex);
                state.currentRoom = selectedRoomIndex;
                stopAllStatusBarTimers();
                refetchGamestate();
                saveGameToLocalStorage();
                startStatusBarTimers();
                render();
            },
            () => {
                roomSelectElement.value = String(state.currentRoom);
            }
        );
    } else {
        state.currentRoom = selectedRoomIndex;
        stopAllStatusBarTimers();
        refetchGamestate();
        saveGameToLocalStorage();
        startStatusBarTimers();
        render();
    }
});

// reset progress 

export function resetStatusBarProgress() {
    setSecondsElapsed(0);  // nollställer tiden

    collectedArtifacts.length = 0;  // tar bort alla artifakter

    // Uppdaterar UI texterna
    countupSpanElement.textContent = 'Elapsed Time: 0:00';
    spanTimerElement.textContent = '--:--';

    renderArtifacts();
}
// ===============


