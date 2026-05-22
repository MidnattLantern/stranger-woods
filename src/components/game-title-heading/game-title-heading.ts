import "./game-title-heading.scss";

const h1Element = document.querySelector('h1');

export function showGameTitleHeader() {
    if (h1Element)  h1Element.classList.remove('game-title-heading-hidden');
}

export function hideGameTitleHeader() {
    if (h1Element) h1Element.classList.add('game-title-heading-hidden');
}
