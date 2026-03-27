import artifactDataRaw from './artifacts.json';
import './artifacts.scss';
import { addArtifactToStatusBar } from '../status-bar/status-bar';
import { state } from '../../state/gamestate';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';

export interface Artifact {
    id: string;
    name: string;
    image: string;
    description: string;
}

export interface ArtifactData {
    [key: string]: Artifact[];
}

// Här mappar vi om JSON-datan till vårt interface
const artifactData = artifactDataRaw as ArtifactData;

export function triggerArtifact(
    roomKey: string,
    artifactId: string,
    delay: number = 0,
) {
    // hittar alla artefakter för det aktuella rummet
    const roomItems = artifactData[roomKey];
    // hittar en specifik artefakt med hjälp av id
    const artifact = roomItems?.find((item) => item.id === artifactId);

    if (!artifact) {
        console.warn(`Artifact with id ${artifactId} not found in ${roomKey}`);
        return;
    }

    
    setTimeout(() => {

        // Skapa HTML för popupen dynamiskt
        const popupHtml = `
            <div id="artifact-popup-overlay" class="artifact-overlay"
                role="dialog"
                aria-modal="true"
                aria-labelledby="artifact-dialog-title"
                tabindex="-1">
                <div class="artifact-card">
                    <h2 class="artifact-title" id="artifact-dialog-title">Congratulations!</h2>
                    <p class="arifact-p">A new artifact has been unlocked - <br>
                    click to collect</p>
                    <div class="artifact-image-container">
                        <button id="close-artifact-btn" class="artifact-img-btn" aria-label="Collect ${artifact.name}">
                            <img src="${artifact.image}" alt="${artifact.name}" class="artifact-img-large">
                        </button>
                    </div>
                    <h3 class="artifact-name">${artifact.name}</h3>
                    <p class="artifact-desc">${artifact.description}</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', popupHtml);

        const overlay = document.getElementById(
            'artifact-popup-overlay',
        ) as HTMLElement;
        const closeBtn = document.getElementById(
            'close-artifact-btn',
        ) as HTMLElement;

        const previouslyFocused = document.activeElement as HTMLElement;
        setTimeout(() => closeBtn.focus(), 0);

        // Hanterar tangentbordsnavigering inuti popup 
        overlay.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                // Endast en fokusbar knapp — förhindra att fokus lämnar popupen
                e.preventDefault();
                closeBtn.focus();
            }
            if (e.key === 'Escape') {
                // Stäng popupen med Escape och återställ fokus
                overlay.remove();
                previouslyFocused?.focus();
            }
        });

        // När spelaren klickar på artefaktens bild för att samla den
        closeBtn.addEventListener('click', () => {
            overlay.remove(); // ta bort popup från DOM
            previouslyFocused?.focus(); // återställ fokus till föregående element
            addArtifactToStatusBar(artifact); // visa artefakt i statusbar

            // Lägg till i state om artfekten inte redan finns (förhindrar dubbletter)
            if (!state.artifacts.find(a => a.id === artifact.id)) {
                state.artifacts.push(artifact);
            }
            saveGameToLocalStorage(); 
        });
    }, delay); // Här används fördröjningen (i millisekunder)
}

/*
 1. Importera --> import { triggerArtifact } from '../../components/artifacts/artifactSystem'; till ditt rum
 2. Koppla på funktionen där du vill/vid klarad uppgigt (ange rum + vilken artefakt, om du vill ha delay lägg till tex 3000 annars 0) ---> triggerArtifact('room5', 'amethyst', 3000);
 3. Om du vill ändra din artefakt/lägga till gör det direkt i ---> artifacts.json
 */
