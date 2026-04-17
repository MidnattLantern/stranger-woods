import { localstorageDB } from '../../store/database/localstorage-db';
import { getSessionState, setSessionState } from '../../store/session-memory/session-state';
import { renderScene } from '../scene-handler';
import './profile-selection.scss';

type ISaveProfile = {
    name: string,
    id: string
}

const NAME_FORM_FIELD_ID: string = "usernameInputField";
let currentNewProfileInput: string = "";

// ==============
// Local elements
// ==============
function buildProfileItems(profiles: ISaveProfile[]): HTMLLIElement[] {
    return profiles.map((profile) => {
        const wrapper = document.createElement("li");
        wrapper.dataset.uuid = profile.id;

        const nameTagButton = document.createElement("button");
        nameTagButton.textContent = profile.name;
        nameTagButton.addEventListener("click", () => {
            handleSelectUserProfile(profile.id);
        });

        const settingsButton = document.createElement("button");
        settingsButton.textContent = "delete"; // temporary delete only, add settings as future feature
        settingsButton.addEventListener("click", () => {
            handleDeleteSaveProfile(profile.id);
        })

        wrapper.append(nameTagButton, settingsButton);
        return wrapper;
    });
}

function updateSaveProfileDirectory() {
    const saveProfilesData = localstorageDB.getSaveProfiles();
    const items = buildProfileItems(saveProfilesData);
    saveProfilesDirectoryContainer.innerHTML = "";
    saveProfilesDirectoryContainer.append(...items);
}
// ==============

// ========
// Elements
// ========
// Keep the createElement container const at an accessible scope
const masterContainerElement = document.createElement("div");
function masterContainer() {
    masterContainerElement.classList.add("profile-selection");
    return masterContainerElement;
}

const headingElement = document.createElement("h2");
function heading() {
    headingElement.textContent = "Save profiles";
    return headingElement;
}

const newSaveProfileCreatorContainer = document.createElement("form");
function newSaveProfileCreator() {    
    newSaveProfileCreatorContainer.classList.add("profile-selection__new-save-profile");

    const submitButton = document.createElement("button");
    submitButton.textContent = "Create Save Profile";
    submitButton.disabled = true;
    submitButton.addEventListener("click", (event: Event) => {
        handleSubmitNewSaveProfile(event, nameFormField);
    });

    const nameFormLablel = document.createElement("label");
    nameFormLablel.setAttribute("for", NAME_FORM_FIELD_ID);

    const nameFormField = document.createElement("input");
    nameFormField.id = NAME_FORM_FIELD_ID;
    nameFormField.addEventListener("input", (event: Event) => {
        handleUpdateNewSaveProfileInput(event, submitButton);
    });

    newSaveProfileCreatorContainer.append(nameFormLablel, nameFormField, submitButton);
    return newSaveProfileCreatorContainer;
}

const saveProfilesDirectoryContainer = document.createElement("ul");
function saveProfilesDirectory() {
    updateSaveProfileDirectory();
    return saveProfilesDirectoryContainer;
}

export const profileSelectionUI = {
    masterContainer,
    heading,
    newSaveProfileCreator,
    saveProfilesDirectory
}
// ========

// ========
// Handlers
// ========
function toggleSubmitButton(submitButton: HTMLButtonElement) {
    submitButton.disabled = !currentNewProfileInput;
}

function handleUpdateNewSaveProfileInput(event: Event, submitButton: HTMLButtonElement) {
    const input = event.target as HTMLInputElement;
    currentNewProfileInput = input.value.trim();
    toggleSubmitButton(submitButton);
}

function handleSubmitNewSaveProfile(event: Event, inputField: HTMLInputElement) {
    event.preventDefault();
    localstorageDB.createSaveProfile(currentNewProfileInput);
    currentNewProfileInput = "";
    inputField.value = "";
    updateSaveProfileDirectory();
}

function handleDeleteSaveProfile(id: string) {
    localstorageDB.deleteSaveProfile(id);
    updateSaveProfileDirectory();
}

function handleSelectUserProfile(targetID: string) {
    setSessionState.setUserProfileID(targetID);
    const currentUser = getSessionState();
    console.log(currentUser.userProfileID);
    setSessionState.setScene("menu");
    renderScene();
}
// ========