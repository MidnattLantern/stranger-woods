import { localstorageDB } from '../../store/database/localstorage-db';
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
        nameTagButton.textContent = profile.name

        wrapper.append(nameTagButton);
        return wrapper;
    });
}
// ==============

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

    container.append(nameFormLablel, nameFormField, submitButton);
    return container;
}

function saveProfilesDirectory() {
    const container = document.createElement("ul");
    container.id = "saveProfilesContainer";

    const saveProfilesData = localstorageDB.getSaveProfiles();
    const items = buildProfileItems(saveProfilesData);

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

    const saveProfilesContainer = document.getElementById("saveProfilesContainer") as HTMLUListElement;
    if (!saveProfilesContainer) return;
    saveProfilesContainer.innerHTML = "";

    const saveProfilesData = localstorageDB.getSaveProfiles();
    const items = buildProfileItems(saveProfilesData);

    saveProfilesContainer.append(...items);
}
// ========