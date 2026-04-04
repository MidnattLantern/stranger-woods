const sceneWrapper = document.getElementById("sceneWrapper");

function clearSceneWrapper() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = "";
}

function rockPaperScissorsSceneWrapper() {
    const sceneWrapper = document.createElement("div");
    sceneWrapper.classList.add("room-frame", "rock-paper-scissors-wallpaper");

    return sceneWrapper;
}

function gameSessionWrapper() {
    const gameSessionWrapper = document.createElement("div");
    gameSessionWrapper.classList.add("rock-paper-scissors__game-session-wrapper");

    return gameSessionWrapper;
}

export const rockPaperScissorsUI = {
    clearSceneWrapper,
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper
}