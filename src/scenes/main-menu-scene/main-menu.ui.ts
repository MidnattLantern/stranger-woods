import { getSessionState, setSessionState } from "../../store/session-memory/session-state";
import { renderScene } from "../scene-handler";


const masterContainerElement = document.createElement("div");
function masterContainer() {
    return masterContainerElement;
}

const saveProfileNameElement = document.createElement("h2");
function saveProfileName() {
    const sessionState = getSessionState();
    saveProfileNameElement.textContent = sessionState.userProfileID;
    return saveProfileNameElement;
}

const startGameButtonElement = document.createElement("button");
function startGameButton() {
    startGameButtonElement.textContent = "Start game";
    startGameButtonElement.addEventListener("click", handlePressStartGameButton);

    return startGameButtonElement; 
}

const profileSelectionButtonElement = document.createElement("button");
function profileSelectionButton() {
    profileSelectionButtonElement.textContent = "Return to save profiles";
    profileSelectionButtonElement.addEventListener("click", handlePressProfileSelectionButton)

    return profileSelectionButtonElement;
}

export const mainMenuUI = {
    masterContainer,
    startGameButton,
    profileSelectionButton,
    saveProfileName
}

// ==============
// Event handlers
// ==============

function handlePressProfileSelectionButton() {
    const currentUser = getSessionState();
    setSessionState.setUserProfileID("");
    console.log(currentUser.userProfileID);
    setSessionState.setScene("profileSelection");
    renderScene();
}

function handlePressStartGameButton() {
    setSessionState.setScene("game-session");
    renderScene();
}