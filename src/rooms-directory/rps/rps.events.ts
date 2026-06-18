import { rpsAnimate } from "./rps.animate";
import { rpsGame } from "./rps.game";
import { rps } from "./rps";
import { rpsStoryController } from "./rps.story";
import { rpsAssignTable } from "./rps.assign-table";

function handleClickTapRotateDiscLeft(event: Event) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate() {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex - 1;
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex - 1;

        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
    }
    event.preventDefault();
    handleRotate();
}

function handleClickTapRotateDiscRight(event: Event) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate() {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex + 1;
        const newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex + 1;

        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);
        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) {
            newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
    }
    event.preventDefault();
    handleRotate();
}

function handleKeyboardRotateDisc(event: KeyboardEvent, spinCpu: boolean = false) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;
    function handleRotate(directionMultiplier: 1 | -1) {
        const currentPlayerSelectedSlotIndex: number = rps.getPlayerSelectedSlotIndex();
        const currentPlayerDiscRotationIndex: number = rps.getPlayerDiscRotationIndex();
        let newPlayerSelectedSlotIndex: number = currentPlayerSelectedSlotIndex + (1 * directionMultiplier);
        let newPlayerDiscRotationIndex: number = currentPlayerDiscRotationIndex + (1 * directionMultiplier);

        if (newPlayerSelectedSlotIndex < MIN_EDGE_INDEX) newPlayerSelectedSlotIndex = MAX_EDGE_INDEX;
        if (newPlayerSelectedSlotIndex > MAX_EDGE_INDEX) newPlayerSelectedSlotIndex = MIN_EDGE_INDEX;

        rps.setPlayerSelectedIndex(newPlayerSelectedSlotIndex);
        rps.setPlayerDiscRotationIndex(newPlayerDiscRotationIndex);
        rpsAnimate.playerSpinToSlot(newPlayerDiscRotationIndex);

        if (spinCpu) {
            const currentCpuSelectedSlotIndex: number = rps.getCpuSelectedSlotIndex();
            const currentCpuDiscRotationIndex: number = rps.getCpuDiscRotationIndex();
            let newCpuSelectedSlotIndex: number = currentCpuSelectedSlotIndex + (1 * directionMultiplier);
            let newCpuDiscRotationIndex: number = currentCpuDiscRotationIndex + (1 * directionMultiplier);

            if (newCpuSelectedSlotIndex < MIN_EDGE_INDEX) newCpuSelectedSlotIndex = MAX_EDGE_INDEX;
            if (newCpuSelectedSlotIndex > MAX_EDGE_INDEX) newCpuSelectedSlotIndex = MIN_EDGE_INDEX;

            rps.setCpuSelectedIndex(newCpuSelectedSlotIndex);
            rps.setCpuDiscRotationIndex(newCpuDiscRotationIndex);
            rpsAnimate.cpuSpinToSlot(newCpuDiscRotationIndex);
        }

    }
    event.preventDefault();

    if (event.key === "ArrowLeft") handleRotate(-1);
    if (event.key === "ArrowRight") handleRotate(1);
    if (event.key === "ArrowUp") rpsGame.initiateDuel();
    if (event.key === " ") rpsGame.initiateDuel();
    if (event.key === "x") rpsGame.initiateDuel();
    // inventory open/ close
    if (event.key === "z") rpsAssignTable.handleToggleAssignTable();
}

function handleCpuRotateDisc(rotationIndex: number = Math.random()) {
    const MIN_EDGE_INDEX: number = 0;
    const MAX_EDGE_INDEX: number = 11;

    function handleRotate(directionMultiplier: -1 | 1) {
        const currentCpuSelectedSlotIndex: number = rps.getCpuSelectedSlotIndex();
        const currentCpuDiscRotationIndex: number = rps.getCpuDiscRotationIndex();
        let newCpuSelectedSlotIndex: number = currentCpuSelectedSlotIndex + (1 * directionMultiplier);
        const newCpuDiscRotationIndex: number = currentCpuDiscRotationIndex + (1 * directionMultiplier);

        rpsAnimate.cpuSpinToSlot(newCpuDiscRotationIndex);
        if (newCpuSelectedSlotIndex < MIN_EDGE_INDEX) {
            newCpuSelectedSlotIndex = MAX_EDGE_INDEX;
        }
        if (newCpuSelectedSlotIndex > MAX_EDGE_INDEX) {
            newCpuSelectedSlotIndex = MIN_EDGE_INDEX;
        }
        rps.setCpuSelectedIndex(newCpuSelectedSlotIndex);
        rps.setCpuDiscRotationIndex(newCpuDiscRotationIndex);
    }

    if (rotationIndex < 0.25) {
        handleRotate(-1);
        handleRotate(-1);
    } else if (rotationIndex > 0.25 && rotationIndex < 0.5) {
        handleRotate(-1);
    } else if (rotationIndex > 0.5 && rotationIndex < 0.75) {
        handleRotate(1);
    } else {
        handleRotate(1);
        handleRotate(1);
    }
}

function handleFullscreenNextStoryline(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === "Enter" || event.key === " ") {
        rpsStoryController.handleNextStoryline();
    }
}

export const rpsEvents = {
    handleClickTapRotateDiscLeft,
    handleClickTapRotateDiscRight,
    handleKeyboardRotateDisc,
    handleCpuRotateDisc,
    handleFullscreenNextStoryline
}