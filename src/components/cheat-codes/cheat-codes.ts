import './cheat-code-styles.scss';
import { createCheatButton } from './cheat-codes-helper';
import { renderScene } from '../../scenes/scene-handler';
import { getSessionState } from '../../store/session-memory/session-state';
import { localstorageDB } from '../../store/database/localstorage-db';

const sessionState = getSessionState();
let showCheatCodes: boolean = false;
const showCheatCodesButton = document.getElementById(
    'showCheatCodesButton',
) as HTMLButtonElement | null;
const cheatCodesWrapper = document.getElementById(
    'cheatCodesWrapper',
) as HTMLDivElement | null;

const cheatButtons = {
    // ===================================
    // Create and store cheat buttons here
    // ===================================
    cheatRenderSignInScene: createCheatButton("Render sign in scene", handleRenderSignIn),
    cheatSetMockSaveProfileData: createCheatButton("Create mock save data", handleCreateMockSaveData),
    cheatGetSaveProfileData: createCheatButton("Get save profile data", handleGetSaveProfileData)
    // ===================================
};

// =============================
// Local special cheat functions
// =============================
function handleRenderSignIn() {
    sessionState.scene = 'profileSelection';
    renderScene();
}

function handleCreateMockSaveData() {
    localstorageDB.setMockData();
}

function handleGetSaveProfileData() {
    console.log(localstorageDB.getSaveProfiles());
}
// =============================

showCheatCodesButton?.addEventListener('click', toggleCheatCodeButtons);
function toggleCheatCodeButtons() {
    showCheatCodes = !showCheatCodes;
    if (!cheatCodesWrapper) return;
    if (showCheatCodes) {
        cheatCodesWrapper.append(
            // ==================================================
            // Append cheat buttons here, disable to hide from UI
            // ==================================================
            cheatButtons.cheatRenderSignInScene,
            cheatButtons.cheatSetMockSaveProfileData,
            cheatButtons.cheatGetSaveProfileData
            // ==================================================
        );
    } else {
        cheatCodesWrapper.innerHTML = '';
    }
}
