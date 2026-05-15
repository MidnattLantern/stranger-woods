import "./dialogue-box.scss";

// =============================================
// Master, container to clear and append the box
// =============================================
const dialogueBoxContainer = document.createElement("div");
dialogueBoxContainer.id = "dialogueBoxContainer";
dialogueBoxContainer.className = "dialogue-box-container"; 
// =============================================

// =======
// The box
// =======
const dialogueBoxView = document.createElement("div");
dialogueBoxView.id = "dialogueBox";
dialogueBoxView.classList.add("dialogue-box");

const text = document.createElement("p");
text.id = "dialogueText";

const nextButton = document.createElement("button");
nextButton.id = "dialogueNextButton";
nextButton.textContent = "→";

dialogueBoxView.append(text, nextButton);
// =======

function showDialogueBox(initText: string = "") {
    text.textContent = initText;
    nextButton.setAttribute("disabled", "true");
    dialogueBoxContainer.append(dialogueBoxView);
}

function updateDialogueBox(newText: string = "", useTypewriter: boolean = true) {
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

function hideDialogueBox() {
    dialogueBoxContainer.innerHTML = '';
}

export const dialogueBox = {
    dialogueBoxContainer, // container that can show and hide
    showDialogueBox, // function
    updateDialogueBox, // function
    hideDialogueBox // function
}