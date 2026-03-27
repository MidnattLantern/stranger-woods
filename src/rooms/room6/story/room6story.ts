import { getArtifactById, removeArtifactFromStatusBar, addArtifactToStatusBar } from '../../../components/status-bar/status-bar';

let room6ResultLocked = false;

export function lockRoom6Result() {
    room6ResultLocked = true;
}

export function unlockRoom6Result() {
    room6ResultLocked = false;
}

export function isRoom6ResultLocked() {
    return room6ResultLocked;
}

// ===============================
// 1. ROOM6 STATE
// ===============================

type PlacedArtifact = {
    id: string;
    name: string;
    image: string;
    correct?: boolean;
};

const room6State: Record<string, PlacedArtifact | null> = {
    'drop-zone-1': null,
    'drop-zone-2': null,
    'drop-zone-3': null,
    'drop-zone-4': null,
    'drop-zone-5': null,
    'drop-zone-6': null
};


// ===============================
// 2. BOOK CONTENT
// ===============================

export interface BookPage {
    title: string;
    text: string;
    hasPrev?: boolean;
    hasNext?: boolean;
    isEscape?: boolean;
}

export const room6Book: BookPage[] = [
    {
        title: 'The Mysterious Book',
        text: 'This is the end, enter to escape...',
        hasNext: true
    },
    {
        title: 'Part I',
        text: 'Strange Woods tightens around you as an old stone awakens. Two marks glow faintly. One speaks of wandering close to the earth, carrying life step by step through mud and roots. The other whispers of currents and scales shaped by water. You offer the <div id="drop-zone-1" class="drop-zone">Drop zone</div> and the <div id="drop-zone-2" class="drop-zone">Drop zone</div>, and the forest listens.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part II',
        text: 'The path opens to a second carving, higher now, where escape is measured in height and lightness. One mark demands a way upward beyond grasping branches. The other is weightless, etched as if by wind alone. <br>You place the <div id="drop-zone-3" class="drop-zone">Drop zone</div> and the <div id="drop-zone-4" class="drop-zone">Drop zone</div>. The trees shift. Air stirs.',
        hasPrev: true,
        hasNext: true
    },
    {
        title: 'Part III',
        text: 'At the forest’s core, power and freedom wait together. A violet scar pulses like a living crystal, resisting your touch. Beside it rests a simple promise of release, shaped to turn and open. When you set the <div id="drop-zone-5" class="drop-zone">Drop zone</div> and use the <div id="drop-zone-6" class="drop-zone">Drop zone</div>, Strange Woods finally lets go.',
        hasPrev: true,
        isEscape: true
    }
];


// ===============================
// 3. CORRECT SOLUTION
// ===============================

export const room6Solution = {
    'drop-zone-1': 'walking-pot',
    'drop-zone-2': 'fish-statue',
    'drop-zone-3': 'ladder',
    'drop-zone-4': 'feather',
    'drop-zone-5': 'amethyst',
    'drop-zone-6': 'key'
};


// ===============================
// 4. DROP LOGIC
// ===============================

export function initRoom6Drop(sceneWrapper: HTMLDivElement) {

    const dropZones = sceneWrapper.querySelectorAll('.drop-zone');

    dropZones.forEach((zone) => {

        zone.addEventListener('dragover', (e) => e.preventDefault());

        zone.addEventListener('drop', (e) => {

            const artifactId = (e as DragEvent).dataTransfer?.getData('artifactId');
            if (!artifactId) return;

            if (room6State[zone.id]) return;

            const artifact = getArtifactById(artifactId);
            if (!artifact) return;

            room6State[zone.id] = {
                id: artifact.id,
                name: artifact.name,
                image: artifact.image
            };

            removeArtifactFromStatusBar(artifactId);

            renderRoom6State(sceneWrapper);

            updateRoom6Progress();

        });

    });

}


// ===============================
// 5. RENDER STATE
// ===============================

export function renderRoom6State(sceneWrapper: HTMLDivElement) {

    for (const [zoneId, artifact] of Object.entries(room6State)) {

        const zone = sceneWrapper.querySelector(`#${zoneId}`) as HTMLElement;
        if (!zone) continue;

        if (!artifact) {
            zone.innerHTML = 'Drop zone';
            zone.removeAttribute('data-artifact');
            continue;
        }

        zone.innerHTML = `
            <div class="placed-artifact" data-tooltip="Click to remove">
                <img
                    src="${artifact.image}"
                    alt="${artifact.name}"
                />
            </div>
        `;

        zone.setAttribute('data-artifact', artifact.id);

        if (artifact.correct) {
            zone.classList.add('correct-artifact');
        }

        const img = zone.querySelector('img') as HTMLImageElement;

        img.addEventListener('click', () => {

            addArtifactToStatusBar({
                id: artifact.id,
                name: artifact.name,
                image: artifact.image,
                description: ''
            });

            room6State[zoneId] = null;

            zone.innerHTML = 'Drop zone';
            zone.removeAttribute('data-artifact');

            updateRoom6Progress();

        });
    }

}


// ===============================
// 6. CHECK SOLUTION
// ===============================

export function checkRoom6Solution(sceneWrapper: HTMLDivElement) {

    let duckUsed = false;
    
    let correct = 0;

    for (const [zoneId, correctArtifact] of Object.entries(room6Solution)) {

        const placed = room6State[zoneId];
        const zone = sceneWrapper.querySelector(`#${zoneId}`) as HTMLElement | null;

        if (!placed) continue;

        // rubber duck specialfall
        if (placed?.id === 'rubber-duck') {

            duckUsed = true;

            lockRoom6Result();

            if (zone) {
                zone.classList.add('duck-reject');
            }


            addArtifactToStatusBar({
                id: placed.id,
                name: placed.name,
                image: placed.image,
                description: ''
            });

            room6State[zoneId] = null;

            if (zone) {
                zone.innerHTML = 'Släpp här';
                zone.removeAttribute('data-artifact');
            }

            updateRoom6Progress();

            if (zone) {
                zone.classList.remove('duck-reject');
            }



            continue;
        }
        

        if (placed.id === correctArtifact) {

            correct++;

            placed.correct = true;

            zone?.classList.add('correct-artifact');

        }
        
        else {

            addArtifactToStatusBar({
                id: placed.id,
                name: placed.name,
                image: placed.image,
                description: ''
            });

            room6State[zoneId] = null;

            if (zone) {
                zone.innerHTML = 'Släpp här';
                zone.removeAttribute('data-artifact');
            }

            updateRoom6Progress();
        }
    }

    return { correct, total: 6, duckUsed };
}


// ===============================
// 7. HELPERS
// ===============================

export function getPlacedArtifactsCount() {

    return Object.values(room6State).filter(Boolean).length;

}

export function resetRoom6State() {

    Object.keys(room6State).forEach(zone => {
        room6State[zone] = null;
    });

}

// ===============================
// 8. UPDATE PROGRESS
// ===============================

export function updateRoom6Progress() {

    const progress = document.getElementById('roomProgress');
    const warning = document.getElementById('roomWarning');
    const escapeBtn = document.getElementById('escapeBtn') as HTMLButtonElement | null;

    if (!progress) return;

    const placed = Object.values(room6State).filter(Boolean).length;

    progress.textContent = `Offerings: ${placed} / 6`;

    if (placed === 6) {

        progress.classList.add('progress-complete');

        if (escapeBtn) {
            escapeBtn.disabled = false;
            escapeBtn.classList.add('escape-ready');
        }

        if (warning && !room6ResultLocked) {
            warning.textContent =
                'The forest awaits six offerings.';
        }

    } else {

        progress.classList.remove('progress-complete');

        if (escapeBtn) {
            escapeBtn.disabled = true;
            escapeBtn.classList.remove('escape-ready');
        }

        if (warning && !room6ResultLocked) {
            warning.textContent =
                'The forest awaits six offerings.';
        }

    }

}
