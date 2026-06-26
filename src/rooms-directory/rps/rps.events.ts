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

    if (event.key === "ArrowLeft" || event.key === "a") handleRotate(-1);
    if (event.key === "ArrowRight" || event.key === "d") handleRotate(1);
    if (event.key === " "|| event.key === "x") rpsGame.initiateDuel();
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

function handleToggleAssignTable(event: KeyboardEvent) {
    if (event.key === "z") rps.toggleAssignTableOpen();
    if (event.key === "e") rps.toggleAssignTableOpen();
}

function handleNavigateAssignTable(event: KeyboardEvent) {
    event.preventDefault(); // arrows mess with scrolling
    const TABLE_MIN_INDEX = 0;
    const TABLE_MAX_INDEX = 11;

    function handleNavigate(directionMultiplier: -1 | 1) {
        const prevFocusIndex = rps.getAssignTableSelectedIndex();
        const switchElementVesselToClear = document.getElementById(`switch-element-vessel-${prevFocusIndex}`);
        if (switchElementVesselToClear) switchElementVesselToClear.innerHTML = "";
        let newFocusIndex = rps.getAssignTableSelectedIndex() + ( 1 * directionMultiplier);
        if (newFocusIndex < TABLE_MIN_INDEX) newFocusIndex = TABLE_MAX_INDEX;
        if (newFocusIndex > TABLE_MAX_INDEX) newFocusIndex = TABLE_MIN_INDEX;
        const switchElementVesselToActivate = document.getElementById(`switch-element-vessel-${newFocusIndex}`);
        rps.setAssignTableSelectedIndex(newFocusIndex);
        const prevItem = document.getElementById(`assign-item-index-${prevFocusIndex}`);
        const nextItem = document.getElementById(`assign-item-index-${newFocusIndex}`);
        nextItem?.classList.add("assign-table__focused-item");
        prevItem?.classList.remove("assign-table__focused-item");
        if (!nextItem) return;
        nextItem.focus();
        switchElementVesselToActivate?.append(rpsAssignTable.elementSelector());
        rpsAnimate.openElementSlider();
    };

    if (event.key === "ArrowUp" || event.key === "w") {
        handleNavigate(-1);
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        handleNavigate(1);
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        console.log("select left item");
    }
    if (event.key === "ArrowRight" || event.key === "d") {
        console.log("select right item");
    }
}

export const rpsEvents = {
    handleClickTapRotateDiscLeft,
    handleClickTapRotateDiscRight,
    handleKeyboardRotateDisc,
    handleCpuRotateDisc,
    handleFullscreenNextStoryline,
    handleToggleAssignTable,
    handleNavigateAssignTable
}