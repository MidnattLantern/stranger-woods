import { localstorageDB } from '../../store/database/localstorage-db';
import './profile-selection.scss';

type ISaveProfile = {
    name: string,
    id: string
}

const SUBMIT_NEW_SAVE_PROFILE_BUTTON_ID: string = "submitNewSaveProfileButton";
const NAME_FORM_FIELD_ID: string = "usernameInputField";
const SAVE_PROFILES_DIRECTORY_ID: string = "saveProfilesDirectory";
let currentNewProfileInput: string = "";

// ========
// Elements
// ========
function container() {
    const container = document.createElement("div");
    container.classList.add("profile-selection");
    return container;
}

function heading() {
    const heading = document.createElement("h2");
    heading.textContent = "Save profiles";
    return heading;
}

function newSaveProfileCreator() {
    const container = document.createElement("form");
    container.classList.add("profile-selection__new-save-profile");

    const nameFormLablel = document.createElement("label");
    nameFormLablel.setAttribute("for", NAME_FORM_FIELD_ID);

    const nameFormField = document.createElement("input");
    nameFormField.id = NAME_FORM_FIELD_ID;
    nameFormField.addEventListener("input", handleUpdateNewSaveProfileInput);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Create Save Profile";
    submitButton.id = SUBMIT_NEW_SAVE_PROFILE_BUTTON_ID;
    submitButton.disabled = true;
    submitButton.addEventListener("click", handleSubmitNewSaveProfile);

    container.append(nameFormLablel, nameFormField, submitButton);
    return container;
}

function saveProfilesDirectory() {
    const container = document.createElement("ul");
    container.id = SAVE_PROFILES_DIRECTORY_ID;

    const saveProfilesData = localstorageDB.getSaveProfiles();
    const items = saveProfilesData.map((profile: ISaveProfile) => {
        const saveProfile = document.createElement("li");
        saveProfile.textContent = profile.name;
        saveProfile.dataset.uuid = profile.id;
        return saveProfile;
    })

    container.append(...items);
    return container;
}

export const profileSelectionUI = {
    container,
    heading,
    newSaveProfileCreator,
    saveProfilesDirectory
}
// ========

// ========
// Handlers
// ========
function toggleSubmitButton() {
    const submitButton = document.getElementById(SUBMIT_NEW_SAVE_PROFILE_BUTTON_ID) as HTMLButtonElement;
    submitButton.disabled = !currentNewProfileInput;
}

function handleUpdateNewSaveProfileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    currentNewProfileInput = input.value.trim();
    toggleSubmitButton();
}

function handleSubmitNewSaveProfile(event: Event) {
    event.preventDefault();
    const saveProfilesDirectory = document.getElementById(SAVE_PROFILES_DIRECTORY_ID) as HTMLUListElement;
    localstorageDB.createSaveProfile(currentNewProfileInput);
    currentNewProfileInput = "";
    saveProfilesDirectory.innerHTML = "";

    const saveProfilesData = localstorageDB.getSaveProfiles();
    const items = saveProfilesData.map((profile: ISaveProfile) => {
        const saveProfile = document.createElement("li");
        saveProfile.textContent = profile.name;
        saveProfile.dataset.uuid = profile.id;
        return saveProfile;
    })
    saveProfilesDirectory.append(...items);
}
// ========