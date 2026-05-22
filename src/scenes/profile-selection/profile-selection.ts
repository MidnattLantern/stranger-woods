import { sceneWrapper } from '../scene-handler';
import { profileSelectionUI } from './profile-selection.ui';

export function renderProfileSelectionScene() {

    const uiMasterContainer = profileSelectionUI.masterContainer();
    const uiHeading = profileSelectionUI.heading();
    const uiNewSaveProfileCreator = profileSelectionUI.newSaveProfileCreator();
    const uiSaveProfilesDirectory = profileSelectionUI.saveProfilesDirectory();

    sceneWrapper.append(uiMasterContainer);
    uiMasterContainer.append(uiHeading, uiNewSaveProfileCreator, uiSaveProfilesDirectory);

    profileSelectionUI.saveProfilesDirectory();
};