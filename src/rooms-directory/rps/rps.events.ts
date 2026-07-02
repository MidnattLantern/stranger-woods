import { rpsAnimate } from "./rps.animate";
import { rpsGame } from "./rps.game";
import { rps } from "./rps";
import { rpsStoryController } from "./rps.story";
import { rpsAssignTable } from "./rps.assign-table";
import { rpsUIAssignTable } from "./rps.ui";
import { rpsELifecycle } from "./rps.elifecycle";
import expandTableIcon from "@assets/expand-table-icon.svg?raw";
import closeTableIcon from "@assets/close-table-icon.svg?raw";

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

function handleClickNavigateAssignTable(directionMultiplier: -1 | 1) {
    const itemTargetIndex = rps.getAssignTableSelectedIndex();
    const itemTargetElement = rps.getAssignedElementItem(itemTargetIndex).element;
    let newItemAssignedElement: null | "fire" | "water" | "earth" = null;
    console.log(itemTargetElement);

    if (directionMultiplier === 1) { // different rules depending on direction
        if (itemTargetElement === null) newItemAssignedElement = "water"
        else if (itemTargetElement === "fire") newItemAssignedElement = "water"
        else if (itemTargetElement === "water") newItemAssignedElement = "earth"
        else if (itemTargetElement === "earth") newItemAssignedElement = "fire"
        else newItemAssignedElement = null;
    } else {
        if (itemTargetElement === null) newItemAssignedElement = "earth"
        else if (itemTargetElement === "fire") newItemAssignedElement = "earth"
        else if (itemTargetElement === "earth") newItemAssignedElement = "water"
        else if (itemTargetElement === "water") newItemAssignedElement = "fire"
        else newItemAssignedElement = null;
    }

    rpsAnimate.slideElementSelector(directionMultiplier);
    rps.setAssignedElementTable(
        itemTargetIndex,
        newItemAssignedElement
    );
    console.log(rps.getAssignedElementTable());
    setTimeout(() => {
        rpsAssignTable.updateElementSelector();
    }, 200);
};
function handleClickNavigateAssignTableLeft() {
    handleClickNavigateAssignTable(1);
};
function handleClickNavigateAssignTableRight() {
    handleClickNavigateAssignTable(-1);
};

function handleNavigateAssignTable(event: KeyboardEvent) {
    event.preventDefault(); // prevent arrows messing with scrolling
    const TABLE_MIN_INDEX = 0;
    const TABLE_MAX_INDEX = 11;

    function handleNavigate(directionMultiplier: -1 | 1) {

        const prevFocusIndex = rps.getAssignTableSelectedIndex();
        let newFocusIndex = rps.getAssignTableSelectedIndex() + ( 1 * directionMultiplier);
        const switchElementVesselToClear = document.getElementById(`switch-element-vessel-${prevFocusIndex}`); // TODO: refactor to use variable(s)

        rpsELifecycle.pauseClickAssignTableInputLifecycle();
        if (switchElementVesselToClear) switchElementVesselToClear.innerHTML = "";
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
        switchElementVesselToActivate?.append(rpsAssignTable.initializeElementSelector());
        rpsAssignTable.updateElementSelector();
        rpsAnimate.openElementSlider();
    };

    if (event.key === "ArrowUp" || event.key === "w") {
        handleNavigate(-1);
    }
    if (event.key === "ArrowDown" || event.key === "s") {
        handleNavigate(1);
    }
    if (event.key === "ArrowLeft" || event.key === "a") {
        const itemTargetIndex = rps.getAssignTableSelectedIndex();
        const itemTargetElement = rps.getAssignedElementItem(itemTargetIndex).element;
        let newItemAssignedElement: null | "fire" | "water" | "earth" = null;

        rpsELifecycle.pauseAssignTableInputLifecycle();
        rpsELifecycle.pauseClickAssignTableInputLifecycle();
        if (itemTargetElement === null) newItemAssignedElement = "water"
        else if (itemTargetElement === "fire") newItemAssignedElement = "water"
        else if (itemTargetElement === "water") newItemAssignedElement = "earth"
        else if (itemTargetElement === "earth") newItemAssignedElement = "fire"
        else newItemAssignedElement = null;

        rpsAnimate.slideElementSelector(1);
        rps.setAssignedElementTable(
            itemTargetIndex,
            newItemAssignedElement
        );
        setTimeout(() => {
            rpsAssignTable.updateElementSelector();
        }, 200);
    }
    if (event.key === "ArrowRight" || event.key === "d") {
        const itemTargetIndex = rps.getAssignTableSelectedIndex();
        const itemTargetElement = rps.getAssignedElementItem(itemTargetIndex).element;
        let newItemAssignedElement: null | "fire" | "water" | "earth" = null;

        if (itemTargetElement === null) newItemAssignedElement = "earth"
        else if (itemTargetElement === "fire") newItemAssignedElement = "earth"
        else if (itemTargetElement === "earth") newItemAssignedElement = "water"
        else if (itemTargetElement === "water") newItemAssignedElement = "fire"
        else newItemAssignedElement = null;

        rpsAnimate.slideElementSelector(-1);
        rps.setAssignedElementTable(
            itemTargetIndex,
            newItemAssignedElement
        );
        setTimeout(() => {
            rpsAssignTable.updateElementSelector();
        }, 200);
    }
}

function handleMouseNavigateAssignTable(newFocusIndex: number) {
    const prevFocusIndex = rps.getAssignTableSelectedIndex();
    if (prevFocusIndex === newFocusIndex) return; // Prevent bug when selecting the already selected

    const switchElementVesselToClear = document.getElementById(`switch-element-vessel-${prevFocusIndex}`); // TODO: refactor to use variable(s)
    if (switchElementVesselToClear) switchElementVesselToClear.innerHTML = "";
    const switchElementVesselToActivate = document.getElementById(`switch-element-vessel-${newFocusIndex}`);
    rps.setAssignTableSelectedIndex(newFocusIndex);
    const prevItem = document.getElementById(`assign-item-index-${prevFocusIndex}`);
    const nextItem = document.getElementById(`assign-item-index-${newFocusIndex}`);
    nextItem?.classList.add("assign-table__focused-item");
    prevItem?.classList.remove("assign-table__focused-item");
    if (!nextItem) return;
    nextItem.focus();
    switchElementVesselToActivate?.append(rpsAssignTable.initializeElementSelector());
    rpsAssignTable.updateElementSelector();
    rpsAnimate.openElementSlider();
}

function handleOpenAssignTable() {
    const wrapper = rps.getAssignTableWrapper();
    const container = rps.getAssignTableContainer();
    const showHideContainerButton = rps.getShowHideAssignTableButton();
    const assignTable = rps.getAssignTableContents();
    const assignTableSelectedIndex = rps.getAssignTableSelectedIndex();
    const focusAssignItem = rps.getAssignItemRows()[assignTableSelectedIndex]; // returns a <tr>

    setTimeout(() => {        
        const switchElementVesselToClear = document.getElementById(`switch-element-vessel-${assignTableSelectedIndex}`);
        const switchElementVesselToActivate = document.getElementById(`switch-element-vessel-${assignTableSelectedIndex}`);

        if (switchElementVesselToClear) switchElementVesselToClear.innerHTML = "";
        if (switchElementVesselToActivate) switchElementVesselToActivate.append(rpsAssignTable.initializeElementSelector());
        if (assignTable) assignTable.classList.remove("hide-table");
        rpsAnimate.openElementSlider();
        rpsAssignTable.updateElementSelector();
        focusAssignItem.classList.add("assign-table__focused-item");
        rpsELifecycle.resumeAssignTableInputLifecycle();
        focusAssignItem.focus();
    }, 100);
    showHideContainerButton.innerHTML = `Hide assign table ${closeTableIcon}`;
    if (container) container.append(assignTable);
    if (wrapper) wrapper.classList.add("assign-table__expanded");
    rpsELifecycle.pausePlayerSlotsLifecycle();
}

function handleCloseAssignTable() {
    const wrapper = rps.getAssignTableWrapper();
    const container = rps.getAssignTableContainer();
    const rpsSceneWrapper = rps.getRpsSceneWrapper();
    const showHideContainerButton = rps.getShowHideAssignTableButton();
    const assignTable = rps.getAssignTableContents();
    const assignTableSelectedIndex = rps.getAssignTableSelectedIndex();
    const assignTableImageItemToReveal = document.getElementById(`assign-table-image-item-${assignTableSelectedIndex}`);

    setTimeout(() => {
        if (container) container.innerHTML = '';
        if (wrapper) wrapper.classList.remove("assign-table__expanded");
        rpsELifecycle.resumeMouseTapInputLifecycle();
        rpsELifecycle.resumePlayerSlotsLifecycle();
        rpsSceneWrapper.focus();
    }, 100);
    rpsELifecycle.pauseAssignTableInputLifecycle();
    showHideContainerButton.innerHTML = `Show assign table ${expandTableIcon}`;
    assignTable?.classList.add("hide-table");
    assignTableImageItemToReveal?.classList.remove("hidden");
}

export const rpsEvents = {
    handleClickTapRotateDiscLeft,
    handleClickTapRotateDiscRight,
    handleKeyboardRotateDisc,
    handleCpuRotateDisc,
    handleFullscreenNextStoryline,
    handleToggleAssignTable,
    handleNavigateAssignTable,
    handleClickNavigateAssignTable,
    handleClickNavigateAssignTableLeft,
    handleClickNavigateAssignTableRight,
    handleMouseNavigateAssignTable,
    handleOpenAssignTable,
    handleCloseAssignTable
}