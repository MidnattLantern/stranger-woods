type IScene = 'profileSelection' | 'menu' | 'room' |'about' | 'victory' | 'gameover';

type ISessionState = {
    scene: IScene,
    userProfile: string,
}

let sessionState: ISessionState = {
    scene: "profileSelection",
    userProfile: "",
}

export function getSessionState() {
    return sessionState;
}
