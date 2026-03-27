// functions and other code live here for easier code management

export function createCheatButton(
    label: string,
    callFunction: () => void
): HTMLButtonElement {
    const newCheatButton = document.createElement('button');
    newCheatButton.textContent = label;
    newCheatButton.addEventListener('click', callFunction);
    return newCheatButton;
}