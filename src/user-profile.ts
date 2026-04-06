import { stopAllStatusBarTimers } from "./components/status-bar/status-bar";
import { renderScene } from "./scenes/scene-handler";
import { saveGameToLocalStorage } from "./store/database/local-storage-database";
import { setSessionState } from "./store/session-memory/session-state";

function handleExitSession() {
    saveGameToLocalStorage();
    stopAllStatusBarTimers();
    setSessionState.setScene("profileSelection");
    renderScene();
}

function handleSetUserProfile(username: string) {
    setSessionState.setUserProfile(username);
}

export const userProfile = {
    handleExitSession,
    handleSetUserProfile
}