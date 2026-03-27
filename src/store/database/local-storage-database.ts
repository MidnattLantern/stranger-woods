// This folder is a part of architectual scaffolding. The structure of localstorage is not yet decided
// This is the directory where you fetch, read, json.strinfigy between localstorage and javascript states
import { state } from '../../state/gamestate';
import { setCollectedArtifacts, getSecondsElapsed, setSecondsElapsed } from '../../components/status-bar/status-bar';
import { getRoomStates, setRoomTime } from '../../state/gamestate';


function getStorageKey(): string {
    return `escape-room-save-${state.username}`;
}

// SAVE
export function saveGameToLocalStorage() { // sparar data till localstorage
    if (!state.username || state.username.trim() === '') {
        console.warn('Save aborted: No username found in state.');
        return;
    }
    
    const data = {
        currentRoom: state.currentRoom, // rummet som spelaren befinner sig i
        username: state.username, // spelarens användarnamn
        codes: state.codes, // hittade koder i spel (används i rum 2)
        completed: state.completed, // klarade rum
        artifacts: state.artifacts, // hittade artifakter
        questionIndex: state.questionIndex, // vilken fråga spelaren är på (används i rum 3)
        roomStates: getRoomStates(), // återstående tid för varje rum
        secondsElapsed: getSecondsElapsed(), // totala tiden som spelaren har spelat
        highestRoom: state.highestRoom, // högsta rummet spelaren kommit till
        room2Path: state.room2Path, // vald väg i rum 2
    };

    localStorage.setItem(getStorageKey(), JSON.stringify(data));
}

// LOAD
export function loadGameFromLocalStorage() { // läser in data från localstorage och gör om till objekt igen
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return;

    try {
        const data = JSON.parse(raw);

        if (data.username !== undefined) state.username = data.username;
        if (data.currentRoom !== undefined) state.currentRoom = data.currentRoom;
        if (data.codes !== undefined) state.codes = data.codes;
        if (data.completed !== undefined) state.completed = data.completed;
        if (data.artifacts !== undefined) {
            state.artifacts = data.artifacts;
            setCollectedArtifacts(data.artifacts); // återställer artifakter visuellt i progressbar
        }
        if (data.questionIndex !== undefined) state.questionIndex = data.questionIndex;
        if (data.roomStates !== undefined) {
            data.roomStates.forEach((room: { roomTime: number }, index: number) => {
                setRoomTime(index, room.roomTime);  // återställer återstående tid för varje
            });
        }
        if (data.highestRoom !== undefined) state.highestRoom = data.highestRoom;
        if (data.room2Path !== undefined) state.room2Path = data.room2Path;
        if (data.secondsElapsed !== undefined) setSecondsElapsed(data.secondsElapsed); // återställer återstående totala tiden
    } catch (e) {
        console.error('Failed to parse save data from localStorage', e);
    }
}

export function hasSaveGame(): boolean {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return false;

    try {
        const data = JSON.parse(raw);
        return data.username === state.username;
    } catch {
        return false;
    }
}

// RESET
export function clearLocalStorageSave() {
    localStorage.removeItem(getStorageKey());
}
