import './profile-selection.scss';

export function profileSelection() {
    const inputFieldID: string = "usernameInput";

    const container = document.createElement("div");
    container.classList.add("sign-in-wrapper");

    const heading = document.createElement("h2");
    heading.textContent = "Save profiles";

    const inputFieldLabel = document.createElement("label");
    inputFieldLabel.setAttribute("for", inputFieldID);
    inputFieldLabel.textContent = "Username";

    const inputField = document.createElement("input");
    inputField.id = inputFieldID;
    inputField.placeholder = "Username";

    const signInButton = document.createElement("button");
    signInButton.id = "signInBtn";
    signInButton.textContent = "Start Game";

    container.append(heading, inputFieldLabel, inputField, signInButton);
    return container;
}

export const profileSelectionUI = {
    // profileSelection
}