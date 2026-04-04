import "./dialogue-box.scss";

export function renderDialogueBox(initText: string = "") {
    const container = document.createElement("div");
    container.id = "dialogueBox";
    container.classList.add("dialogue-box");
    showDialogueBox();

    const text = document.createElement("p");
    text.id = "dialogueText";
    text.textContent = initText;

    const nextButton = document.createElement("button");
    nextButton.id = "dialogueNextButton";
    nextButton.textContent = "→";
    nextButton.setAttribute("disabled", "true");

    container.append(text, nextButton);
    return container;
}

export function overwriteDialogueTextContent(newText: string = "", useTypewriter: boolean = true) {
    const text = document.getElementById("dialogueText");
    if (!text) return;
    const nextButton = document.getElementById("dialogueNextButton");

    let i: number = 0;
    const speed = 10;

    text.textContent = "";
    nextButton?.setAttribute("disabled", "true");
    if (useTypewriter) {
        function typewriter() {
            if (!text) return;
            if (i < newText.length) {
                text.textContent += newText[i];
                i++;
                setTimeout(typewriter, speed);
            } else {
                nextButton?.removeAttribute("disabled");
            }
        }
        typewriter();
    } else {
        text.textContent = newText;
    }
}

export function showDialogueBox() {
    const dialogueBox = document.getElementById("dialogueBox");
    if (!dialogueBox) return;
    dialogueBox.classList.remove("dialogue-box__hidden");
}

export function hideDialogueBox() {
    const dialogueBox = document.getElementById("dialogueBox");
    if (!dialogueBox) return;
    dialogueBox.classList.add("dialogue-box__hidden");
}