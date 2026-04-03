import type { Artifact } from '../components/artifacts/artifactSystem';

export type Screen = 'login' | 'menu' | 'room' | 'savedgame' | 'settings' | 'about' | 'victory' | 'gameover';

export type GameState = {
    screen: Screen;
    username: string;
    step: number;
    currentRoom: number;
    message: string;
    codes: string[][];
    completed: boolean[];
    artifacts: Artifact[];
    questionIndex: number [];
    isReturningPlayer: boolean;
    highestRoom: number;
    gameOverReason: 'room-timeout' | 'total-timeout' | 'too-many-attempts';
    room2Path: 'A' | 'B' | null;
};

export let state: GameState = {
    screen: 'login',
    username: '',
    step: 1,
    currentRoom: 0,
    message: '',
    codes: [],
    completed: [],
    artifacts: [],
    questionIndex: [],
    isReturningPlayer: false,
    highestRoom: 0,
    gameOverReason: 'room-timeout',
    room2Path: null,
    
};

export function getGameState() {
    return state;
}

// ======
// Timers
// ======

export const roomTimes = [400, 400, 400, 570, 400, 400];

let roomStates = [
    { roomTime: roomTimes[0] },
    { roomTime: roomTimes[1] },
    { roomTime: roomTimes[2] },
    { roomTime: roomTimes[3] },
    { roomTime: roomTimes[4] },
    { roomTime: roomTimes[5] },
];

export function getRoomStates() {
    return roomStates;
}

export function setRoomTime(targetIndex: number, newValue: number) {
    if (roomStates[targetIndex]) {
        roomStates[targetIndex].roomTime = newValue;
    }
}
// ======
