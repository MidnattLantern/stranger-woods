import { profileSelectionUI } from './profile-selection.ui';

export function renderProfileSelectionScene() {
    const sceneWrapper = document.getElementById("sceneWrapper") as HTMLDivElement | null;
    if (!sceneWrapper) return;

    const uiMasterContainer = profileSelectionUI.masterContainer();
    const uiHeading = profileSelectionUI.heading();
    const uiNewSaveProfileCreator = profileSelectionUI.newSaveProfileCreator();
    const uiSaveProfilesDirectory = profileSelectionUI.saveProfilesDirectory();

    sceneWrapper.append(uiMasterContainer);
    uiMasterContainer.append(uiHeading, uiNewSaveProfileCreator, uiSaveProfilesDirectory);

    profileSelectionUI.saveProfilesDirectory();
};