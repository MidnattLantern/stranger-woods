const sceneWrapper = document.getElementById("sceneWrapper");

function clearSceneWrapper() {
    if (!sceneWrapper) return;
    sceneWrapper.innerHTML = "";
}

function rockPaperScissorsSceneWrapper() {
    /*
    section
        div
        ...
    */
    const sceneWrapperContainer = document.createElement("section");
    sceneWrapperContainer.classList.add("room", "room1");

    const sceneWrapper = document.createElement("div");
    sceneWrapper.classList.add("room-frame");

    sceneWrapperContainer.append(sceneWrapper);
    return sceneWrapperContainer;
}

export const rockPaperScissorsUI = {
    clearSceneWrapper,
    rockPaperScissorsSceneWrapper
}