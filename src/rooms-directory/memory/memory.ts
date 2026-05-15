import './memory.scss';
import cardsData from './cardsData.json';
import { triggerArtifact } from '../../components/artifacts/artifactSystem';
import {
    startStatusBarTimers,
    stopAllStatusBarTimers, 
} from '../../components/status-bar/status-bar';

const COLUMNS = 4;

type Card = {
    id: number;
    pairId: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
    justMatched?: boolean;
};

type Room5State =
    | 'story'
    | 'options'
    | 'wrong-choice'
    | 'right-choice'
    | 'game'
    | 'completed';

let selectedCards: Card[] = [];
let cards: Card[] = [];

function setState( state: Room5State, sceneWrapper: HTMLDivElement ): void {
    switch (state) {
        case 'story':
            showStory(sceneWrapper);
            break;
        case 'options':
            showOptions(sceneWrapper);
            break;
        case 'wrong-choice':
            showWrongChoice(sceneWrapper);
            break;
        case 'right-choice':
            showRightChoice(sceneWrapper);
            break;
        case 'game':
            showGame(sceneWrapper);
            break;
        case 'completed':
            showCompleted(sceneWrapper);
            break;
    }
}

function initCards(): Card[] {
    return cardsData.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
    }));
}

function shuffleCards(cards: Card[]): Card[] {
    const arr = [...cards];
    const shuffled: Card[] = [];

    while (arr.length > 0) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        shuffled.push(arr.splice(randomIndex, 1)[0]);
    }

    return shuffled;
}

function flipCard(
    card: Card,
    sceneWrapper: HTMLDivElement
) {
    if (card.isFlipped || card.isMatched) return;
    if (selectedCards.length === 2) return;

    card.isFlipped = true;
    selectedCards.push(card);
    renderCards(cards, sceneWrapper);

    if (selectedCards.length === 2) {
        checkMatch(sceneWrapper);
    }
}

function checkMatch(sceneWrapper: HTMLDivElement) {
    const [first, second] = selectedCards;
    if (!first || !second) return;

    if (first.pairId === second.pairId) {
        first.isMatched = true;
        second.isMatched = true;

        first.justMatched = true;
        second.justMatched = true;

        selectedCards = [];
        renderCards(cards, sceneWrapper);

        setTimeout(() => {
            first.justMatched = false;
            second.justMatched = false;
            renderCards(cards, sceneWrapper);

            if (cards.every((card) => card.isMatched)) {
                setState('completed', sceneWrapper);
            }
        }, 600);
    } else {
        setTimeout(() => {
            first.isFlipped = false;
            second.isFlipped = false;
            selectedCards = [];
            renderCards(cards, sceneWrapper);
        }, 1000);
    }
}

function renderCards(
    cards: Card[],
    sceneWrapper: HTMLDivElement
): void {
    const board = document.getElementById('board') as HTMLDivElement;
    const cardBack =
        '/fed25d-js-intro-grupparbete-the-dopefish-admirers/img/cardBack2.jpg';

    if (board.childElementCount === 0) {
        board.innerHTML = cards
            .map(
                (card) => `<div class="card" data-id="${card.id}"
                  tabindex="0"
                    role="button"
                    aria-label="Memory card, unknown"
                    aria-pressed="false">
         <img src="${cardBack}" class="cardImage" />
        </div>`,
            )
            .join('');

        board.querySelectorAll('.card').forEach((el, i) => {
            const row = Math.floor(i / COLUMNS);
            const col = i % COLUMNS;
            const delay = row * 0.5 + col * 0.08;

            const card = el as HTMLElement;
            card.style.animationDelay = `${delay}s`;
            card.classList.add('reveal');

            setTimeout(
                () => {
                    card.classList.remove('reveal');
                    card.classList.add('visible');
                    card.style.animationDelay = '';
                },
                (delay + 0.35) * 1000,
            );
        });

        const cardElements = board.querySelectorAll('.card');
        cardElements.forEach((el) => {
            const id = Number((el as HTMLElement).dataset.id);
            const card = cards.find((c) => c.id === id);
            if (card) {
                el.addEventListener('click', () =>
                    flipCard(card, sceneWrapper),
                );

                el.addEventListener('keydown', (e: Event) => {
                    const ke = e as KeyboardEvent;
                    if (ke.key === 'Enter' || ke.key === ' ') {
                        ke.preventDefault();
                        flipCard(card, sceneWrapper);
                    }
                });
            }
        });
    }

    cards.forEach((card) => {
        const img = board.querySelector(
            `.card[data-id="${card.id}"] img`,
        ) as HTMLImageElement;
        if (img) {
            if (card.isFlipped || card.isMatched) {
                img.src = card.value;
            } else {
                img.src = cardBack;
            }

            const cardElement = img.parentElement as HTMLDivElement;
            if (!cardElement) return;

            cardElement.classList.toggle('matched', card.isMatched);

            if (card.justMatched) {
                cardElement.classList.add('pulse');
            } else {
                cardElement.classList.remove('pulse');
            }

            if (card.isMatched) {
                cardElement.setAttribute('aria-label', 'Card matched');
                cardElement.setAttribute('aria-disabled', 'true');
                cardElement.setAttribute('tabindex', '-1');
            } else if (card.isFlipped) {
                cardElement.setAttribute('aria-label', 'Card flipped');
                cardElement.setAttribute('aria-pressed', 'true');
            } else {
                cardElement.setAttribute('aria-label', 'Memory card, unknown');
                cardElement.setAttribute('aria-pressed', 'false');
            }
        }
    });
}

function showStory(sceneWrapper: HTMLDivElement) {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            You’ve traveled far on your journey, wandering deep into the forest.
            Suddenly, something catches your eye — white shapes hidden among the thick undergrowth.
            What could be waiting quietly in the shadows?
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="continue-btn">Make a choice</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('continue-btn')!
        .addEventListener('click', () =>
            setState('options', sceneWrapper),
        );
}

function showOptions(sceneWrapper: HTMLDivElement) {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
            <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="wrong-btn">Creepy… I’ll turn back!</button>
              <button id="right-btn">I’ll get closer to take a look</button>
            </div>
          </div>
        </div>
      </div>a
    </section>
  `;

    document
        .getElementById('wrong-btn')!
        .addEventListener('click', () =>
            setState('wrong-choice', sceneWrapper),
        );
    document
        .getElementById('right-btn')!
        .addEventListener('click', () =>
            setState('right-choice', sceneWrapper),
        );
}

function showWrongChoice(sceneWrapper: HTMLDivElement) {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            Some things can feel frightening when you don’t yet understand them. 
            To move forward, you must summon courage.
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="back-btn">I am ready to face it</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('back-btn')!
        .addEventListener('click', () =>
            setState('options', sceneWrapper),
        );
}

function showRightChoice(sceneWrapper: HTMLDivElement) {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <p class="event-text" id="eventText">
            As you step closer, you discover that the white shapes are statues. 
            They guard the forest’s heart and the secret gathering place of its mystical creatures.
            Shy and rarely seen, these beings have protected you on your journey.
            Use your memory to uncover them and unlock the room.
          </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
              <button id="start-memory-btn">Begin the memory challenge</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    document
        .getElementById('start-memory-btn')!
        .addEventListener('click', () => setState('game', sceneWrapper));
}

function showGame(sceneWrapper: HTMLDivElement) {
    sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
          <div class="game-session-style game-board">
            <div class="board" id="board"></div>
          </div>
        </div>
      </div>
    </section>
  `;

    cards = shuffleCards(initCards());
    selectedCards = [];
    renderCards(cards, sceneWrapper);
    startStatusBarTimers();
}

function showCompleted(sceneWrapper: HTMLDivElement) {
    setTimeout(() => {
        sceneWrapper.innerHTML = `
    <section class="room room-5">
      <div class="room-frame">
        <div class="game-session-wrapper-5">
          <h2 class="room-title-text" id="roomTitleText">Shadows of the Grove</h2>
         <p class="event-text" id="eventText">You are now ready for the final step on your journey.
        
         </p>
          <div class="game-session-style">
            <div class="player-interaction-buttons-wrapper" id="storyEventButtonsWrapper">
             <button id="finish-room-btn">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

        triggerArtifact('room5', 'amethyst');
        stopAllStatusBarTimers();

        document
            .getElementById('finish-room-btn')
            ?.addEventListener('click', () => {

            });
    }, 2000);
}

export function memory() {
    const sceneWrapper = document.getElementById("sceneWrapper") as HTMLDivElement | null;
    if (!sceneWrapper) return;
    setState('story', sceneWrapper);
}
