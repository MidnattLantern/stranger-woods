import './strangers-book.scss';
import { showRoomIntro } from '../../components/room-intro/room-intro';
import {
    room6Book,
    initRoom6Drop,
    renderRoom6State,
    checkRoom6Solution,
    getPlacedArtifactsCount,
    updateRoom6Progress,
    lockRoom6Result,
    unlockRoom6Result,
} from './story/room6story';

import { setRoom6Mode } from '../../components/status-bar/status-bar';
import { renderVictoryScene } from '../../scenes/victory-scene/victory-scene';

import { render } from '../../main';
import { state } from '../../state/gamestate';

export function strangersBook(sceneWrapper: HTMLDivElement | null) {
    if (!sceneWrapper) return;

    showRoomIntro(
        6,
        () => {
            /* pauseTimer */
        },
        () => {
            /* resumeTimer */
        },
        () => {
            setRoom6Mode(true);

            document.addEventListener('dragover', (e) => e.preventDefault());

            let attempts = 0;
            const maxAttempts = 3;

            sceneWrapper.innerHTML = `
        <section class="room room-6">
            <div class="room-frame">
                <div class="game-session-wrapper">

                    <h2 id="roomTitleText">END GAME</h2>
                    <p id="roomWarning" class="warning-text"></p>
                    <p id="roomProgress" class="progress-text"></p>

                    <div class="book" id="book"></div>

                </div>
            </div>
        </section>
        `;

            const book = sceneWrapper.querySelector('#book') as HTMLDivElement;
            if (!book) return;

            let page = 0;

            function renderBook() {
                const current = room6Book[page];

                book.innerHTML = `
            <h2 class="book-title">${current.title}</h2>

            <div class="event-text">
                <span>${current.text}</span>

                <div class="bookNav">
                    ${current.hasPrev ? '<button id="prevPage">Back</button>' : ''}
                    ${current.hasNext ? '<button id="nextPage">Next</button>' : ''}
                    ${current.isEscape ? '<button id="escapeBtn">ESCAPE</button>' : ''}
                </div>
            </div>
        `;

                const progress = document.getElementById('roomProgress');
                if (progress) {
                    progress.textContent = 'Artifacts placed: 0 / 6';
                }

                renderRoom6State(sceneWrapper!);
                updateRoom6Progress();

                book.querySelector('#prevPage')?.addEventListener('click', () => {
                    page--;
                    renderBook();
                });

                book.querySelector('#nextPage')?.addEventListener('click', () => {
                    page++;
                    renderBook();
                });

                book.querySelector('#escapeBtn')?.addEventListener('click', () => {
                    lockRoom6Result();

                    const placed = getPlacedArtifactsCount();

                    if (placed < 6) {
                        const warning = document.getElementById('roomWarning');

                        if (warning) {
                            warning.textContent = `
                        The ritual is incomplete.
                        You placed ${placed} / 6 artifacts.
                    `;
                        }

                        return;
                    }

                    const result = checkRoom6Solution(sceneWrapper!);

                    unlockRoom6Result();

                    if (result.correct === result.total) {
                        renderVictoryScene();
                        return;
                    }

                    attempts++;

                    const warning = document.getElementById('roomWarning');

                    if (warning) {
                        const message = result.duckUsed
                            ? 'The forest stares at the rubber duck... and is not impressed.'
                            : 'The forest rejects your offering.';

                        warning.textContent = `
               ${message}
               ${attempts} of 3 attempts used.
            `;
                    }

                    if (attempts >= maxAttempts) {
                        state.gameOverReason = 'too-many-attempts';
                        state.screen = 'gameover';
                        render();
                    }
                });

                initRoom6Drop(sceneWrapper!);
            }

            renderBook();
        },
    );
}
