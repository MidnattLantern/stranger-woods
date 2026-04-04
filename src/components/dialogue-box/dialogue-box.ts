import "./dialogue-box.scss";

export function renderDialogueBox(initText: string = "") {
    const container = document.createElement("div");
    container.id = "dialogueBox";
    container.classList.add("dialogue-box");

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

export function overwriteDialogueTextContent(newText: string = "") {
    const text = document.getElementById("dialogueText");
    if (!text) return;
    const nextButton = document.getElementById("dialogueNextButton");

    let i: number = 0;
    const speed = 10;

    text.textContent = "";
    nextButton?.setAttribute("disabled", "true");
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
}