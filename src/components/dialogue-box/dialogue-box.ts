import "./dialogue-box.scss";

export function renderDialogueBox(initText: string = "") {
    const container = document.createElement("div");
    container.id = "dialogueBox";
    container.classList.add("dialogue-box");

    const text = document.createElement("p");
    text.id = "dialogueText";
    text.textContent = initText;

    container.append(text);
    return container;
}

export function overwriteDialogueTextContent(newText: string = "") {
    const text = document.getElementById("dialogueText");
    if (!text) return;
    let i: number = 0;
    const speed = 10;

    text.textContent = "";
    function typewriter() {
        if (!text) return;
        if (i < newText.length) {
            text.textContent += newText[i];
            i++;
            setTimeout(typewriter, speed);
        }
    }
    typewriter();
}