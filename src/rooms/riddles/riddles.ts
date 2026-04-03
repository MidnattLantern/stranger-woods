import './riddles.scss';
import { state } from '../../state/gamestate';
import { render } from '../../main';
import { saveGameToLocalStorage } from '../../store/database/local-storage-database';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import { startStatusBarTimers,stopAllStatusBarTimers } from '../../components/status-bar/status-bar';
import { showRoomIntro } from '../../components/room-intro/room-intro';

let currentQuestionIndex = 0;
export let hasArtifactRoom3 = false;
let wrongAttempts = 0;


const questions = [
    {
        question: '"In the heart of every emerald leaf, which substance captures the sun\'s golden blood to feed the forest?"',
        options: ['Anthocyanin', 'Chlorophyll', 'Carotenoid', 'Xanthophyll'],
        correct: 'Chlorophyll',
    },
    {
        question: '"To breathe life into the shadows, I consume the air that humans discard. What is the spirit of the gas I inhale?"',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correct: 'Carbon Dioxide',
    },
    {
        question: '"The jungle moves in silence. Which hidden vessels carry the earth\'s tears from the deep roots to the highest crown?"',
        options: ['Phloem', 'Stomata', 'Cortex', 'Xylem'],
        correct: 'Xylem',
    },
    {
        question: '"When the sun hides, I remain. Which ancient cycle allows me to weave sugar from the dark and the light?"',
        options: ['The Krebs Cycle', 'The Calvin Cycle', 'Glycolysis', 'Photolysis'],
        correct: 'The Calvin Cycle',
    },
    {
        question: '"I am the master of the dry sands. Which path of life do I walk to save my water while the sun burns?"',
        options: ['C3 Path', 'C4 Path', 'CAM Path', 'Kemosyntes'],
        correct: 'CAM Path',
    }
];

export function riddles(sceneWrapper: HTMLDivElement | null, next: () => void) {
    if (!sceneWrapper) return;
    
    showRoomIntro(
        3,
        () => { /* pauseTimer */ },
        () => { /* resumeTimer */ },
        () => {
            currentQuestionIndex = state.questionIndex[state.currentRoom] || 0;
            hasArtifactRoom3 = false;
            wrongAttempts = 0;

            sceneWrapper.innerHTML = `
                <section class="room room-3">
                  <div class="room3-overlay room-frame">
                    <h2>The Inner Jungle (Archive of Illusions)</h2>
                    <p class="story" id="story1">
                      You step into a grand inner jungle, hidden inside a glass palace.
                      Everything feels unreal — a dream, a memory, or a map of the forest itself.
                      A silent man stands by the water. A small boat waits at the shore.
                    </p>
                    <p class="hint" id="hint1">
                      The man whispers: "Only those who understand plants may pass."
                    </p>
                    <button id="approachBtn">Approach the man</button>
                    <p class="story hidden" id="story2">
                      You step closer to the man.
                      He looks at you with calm eyes, as if assessing your worthiness.
                      The jungle breathes around you.
                      The boat will only move if you prove your knowledge of plants.
                    </p>
                    <button id="startBtn" class="hidden">Start the trial</button>
                    <div id="quiz" class="hidden">
                      <p id="question"></p>
                      <div class="options">
                        <button class="option" disabled></button>
                        <button class="option" disabled></button>
                        <button class="option" disabled></button>
                        <button class="option" disabled></button>
                      </div>
                      <p id="message"></p>
                    </div>
                  </div>
                </section>
            `;

            const approachBtn = sceneWrapper.querySelector('#approachBtn') as HTMLButtonElement;
            const startBtn = sceneWrapper.querySelector('#startBtn') as HTMLButtonElement;
            const story1 = sceneWrapper.querySelector('#story1') as HTMLParagraphElement;
            const hint1 = sceneWrapper.querySelector('#hint1') as HTMLParagraphElement;
            const story2 = sceneWrapper.querySelector('#story2') as HTMLParagraphElement;
            const quiz = sceneWrapper.querySelector('#quiz') as HTMLDivElement;
            const buttons = sceneWrapper.querySelectorAll<HTMLButtonElement>('.option');
            const message = sceneWrapper.querySelector('#message') as HTMLParagraphElement;
            const questionText = sceneWrapper.querySelector('#question') as HTMLParagraphElement;

            function renderQuestion() {
                const q = questions[currentQuestionIndex];
                questionText.textContent = q.question;
                message.textContent = '';
                buttons.forEach((btn, index) => {
                    btn.textContent = q.options[index];
                    btn.disabled = false;
                });
            }

            approachBtn.addEventListener('click', () => {
                story1.remove();
                hint1.remove();
                approachBtn.remove();
                story2.classList.remove('hidden');
                startBtn.classList.remove('hidden');
            });

            startBtn.addEventListener('click', () => {
                startStatusBarTimers();
                story2.remove();
                startBtn.remove();
                quiz.classList.remove('hidden');
                renderQuestion();
            });

            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const current = questions[currentQuestionIndex];

                    if (btn.textContent === current.correct) {
                        message.textContent = 'Correct. The jungle shifts slightly...';
                        currentQuestionIndex++;
                        state.questionIndex[state.currentRoom] = currentQuestionIndex;
                        saveGameToLocalStorage();

                        if (currentQuestionIndex === questions.length) {
                            state.questionIndex[state.currentRoom] = 0;
                            state.completed[state.currentRoom] = true;
                            saveGameToLocalStorage();
                            stopAllStatusBarTimers();

                            triggerArtifact('room3', 'walking-pot', 0);
                    
                            message.textContent = 'The man nods. The boat is now safe to enter.';
                            
                            setTimeout(() => next(), 3000);
                        } else {
                            setTimeout(renderQuestion, 700);
                        }
                    } else {
                        wrongAttempts++;

                        if (wrongAttempts === 1) {
                            message.textContent = 'Wrong. The leaves whisper in warning...';
                        } else if (wrongAttempts === 2) {
                            message.textContent = 'Still wrong. The jungle grows darker around you...';
                        } else {
                            message.textContent = 'You have failed the trial. The jungle rejects you.';
                            buttons.forEach((b) => (b.disabled = true));
                            setTimeout(() => {
                                stopAllStatusBarTimers();
                                state.gameOverReason = 'too-many-attempts';
                                saveGameToLocalStorage();
                                state.screen = 'gameover';
                                render();
                            }, 1000);
                        }
                    }
                });
            });

            if (currentQuestionIndex > 0) {
                story1?.remove();
                hint1?.remove();
                approachBtn?.remove();
                story2?.remove();
                startBtn?.remove();
                quiz.classList.remove('hidden');
                renderQuestion();

                startStatusBarTimers();
            }
        }
    );
}
