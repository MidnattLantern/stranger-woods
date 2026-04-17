type IScene = 'profileSelection' | 'menu' | 'room' |'about' | 'victory' | 'gameover';

type IRoomName = "silentTide" | "memory" | "strangerBook" | "gravityGlitch"

type IRoomState = {
  beaten: boolean
  hourglass: number
}

type IInventoryItem = {
  id: string
  name: string
  description?: string
}

type ISessionState = {
    scene: IScene,
    userProfileID: string,
    roomState: Record<IRoomName, IRoomState>,
    currentRoom: IRoomName | null;
    inventory: IInventoryItem[]
}

let sessionState: ISessionState = {
    scene: "profileSelection",
    userProfileID: "",
    roomState: {
        silentTide: {
            beaten: false,
            hourglass: 400
        },
        gravityGlitch: {
            beaten: false,
            hourglass: 400
        },
        strangerBook: {
            beaten: false,
            hourglass: 400
        },
        memory: {
            beaten: false,
            hourglass: 400
        }
    },
    currentRoom: null,
    inventory: []
}

function setScene(newScene: IScene) {
    sessionState.scene = newScene;
}

function setUserProfileID(newUserProfile: string) {
    sessionState.userProfileID = newUserProfile;
}

function setRoomBeaten(room: IRoomName) {
    sessionState.roomState[room].beaten = true;
}

function decrementHourglass(room: IRoomName, amount: number) {
  sessionState.roomState[room].hourglass -= amount
}

function pushToInventory(item: IInventoryItem) {
    sessionState.inventory.push(item);
}

export function getSessionState() {
    return sessionState;
}

export const setSessionState = {
    setScene,
    setUserProfileID,
    setRoomBeaten,
    decrementHourglass,
    pushToInventory
}