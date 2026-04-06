type IScene = 'profileSelection' | 'menu' | 'room' |'about' | 'victory' | 'gameover';

type ISessionState = {
    scene: IScene,
    userProfile: string,
}

let sessionState: ISessionState = {
    scene: "profileSelection",
    userProfile: "",
}

function setScene(newScene: IScene) {
    sessionState.scene = newScene;
}

function setUserProfile(newUserProfile: string) {
    sessionState.userProfile = newUserProfile;
}

export function getSessionState() {
    return sessionState;
}

export const setSessionState = {
    setScene,
    setUserProfile,
}