import { profileSelectionUI } from './profile-selection.ui';

export function renderProfileSelectionScene() {
    const sceneWrapper = document.getElementById("sceneWrapper") as HTMLDivElement | null;
    if (!sceneWrapper) return;

    const uiContainer = profileSelectionUI.container();
    const uiHeading = profileSelectionUI.heading();
    const uiNewSaveProfileCreator = profileSelectionUI.newSaveProfileCreator();
    const uiSaveProfilesDirectory = profileSelectionUI.saveProfilesDirectory();

    sceneWrapper.append(uiContainer);
    uiContainer.append(uiHeading);
    uiContainer.append(uiNewSaveProfileCreator);
    uiContainer.append(uiSaveProfilesDirectory);

    profileSelectionUI.saveProfilesDirectory();
};