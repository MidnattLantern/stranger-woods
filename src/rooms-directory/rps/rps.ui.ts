// import pseudoElementalsPlayerDisc from "@assets/pseudoelementals-player-disc.svg?raw";
import pseudoElementalsPlayerDisc from "@assets/pseudoelementals.svg?raw";
import pseudoElementalsCpuDisc from "@assets/pseudoelementals-cpu-disc.svg?raw";
import expandTableIcon from "@assets/expand-table-icon.svg?raw";
import batchPreset1 from "./batch-preset-1.json";
import nullPlaceholder from "/elements/null-placeholder.webp";
// import fireIcon from "/elements/fire-icon.webp";
// import waterIcon from "/elements/water-icon.webp";
// import earthIcon from "/elements/earth-icon.webp";
// import elementSelectorSVG from "@assets/element-selector.svg?raw";
import { rps } from "./rps";
import { rpsEvents } from "./rps.events";

function rockPaperScissorsSceneWrapper() {
    const rpsSceneWrapper = document.createElement("div");
    rpsSceneWrapper.classList.add("room-frame", "rock-paper-scissors-wallpaper");
    return rpsSceneWrapper;
}

function gameSessionWrapper() {
    const gameSessionWrapper = document.createElement("div");
    gameSessionWrapper.classList.add("rock-paper-scissors__game-session-wrapper");
    return gameSessionWrapper;
}

function buttonsTable() {
    const container = document.createElement("section");
    container.classList.add("rock-paper-scissors__buttons-table");
    return container;
}

// ==========
// player rps
// ==========
function rpsPlayerButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__player-buttons-container");
    container.id = "rpsPlayerButtons";
    container.innerHTML = pseudoElementalsPlayerDisc;
    return container;
}
// ==========

// =======
// cpu rps
// =======
function rpsCpuButtons() {
    const container = document.createElement("div");
    container.classList.add("rock-paper-scissors__cpu-buttons-container");
    container.id = "rpsCpuButtons";
    container.innerHTML = pseudoElementalsCpuDisc;
    return container;
}
// =======

// =======
// railway
// =======
function duelRailway() {
    const container = document.createElement("duel-railway");
    container.classList.add("duel-railway", "hidden");
    return container;
}

function playerRailwayItem() {
    const item = document.createElement("img");
    item.src = "elements/fire-icon.webp"; // placeholder default
    item.id = "playerRailwayItem";
    item.className = "player-railway-item";
    return item;
}

function cpuRailwayItem() {
    const item = document.createElement("img");
    item.src = "elements/fire-icon.webp"; // placeholder default
    item.id = "cpuRailwayItem";
    item.className = "cpu-railway-item";
    return item;
}
// =======

// ================
// assignment table
// ================
function assignTableWrapper() {
    const container = document.createElement("div");
    container.className = "assign-table";
    return container;
}

function assignTableContainer() {
    const table = document.createElement("div");
    table.className = "assign-table__table-container";
    return table;
}

function showHideAssignTableButton() {
    const button = document.createElement("button");
    button.className = "show-hide-assign-table-button";
    button.id = "showHideAssignTableButton";
    button.innerHTML = `Show assign table ${expandTableIcon}`;
    return button;
}

function assignTableContents() {
    const mockData = batchPreset1;
    let contentsTable = document.createElement("table");
    contentsTable.classList.add("hide-table");

    mockData.map((i, index) => {
        const iRow = document.createElement("tr");
        const iImageContainer = document.createElement("td");

        iRow.id = `assign-item-index-${index.toString()}`; // consider move to lifecycle
        iRow.addEventListener("mouseenter", () => {
            rpsEvents.handleMouseNavigateAssignTable(index);
        });
        iRow.addEventListener("click", () => { // for touch screen
            rpsEvents.handleMouseNavigateAssignTable(index);
        });

        const iImage = document.createElement("img");
        iImage.src = i.assetSource;
        iImage.alt = i.name;
        iImage.className = "assign-table__item-image";

        const iElementIconContainer = document.createElement("td");
        iElementIconContainer.className = "assign-table__icon-container";

        const elementIcon = document.createElement("img");
        elementIcon.src = nullPlaceholder;
        elementIcon.alt = "Unsigned";
        elementIcon.className = "assign-table__element-icon";
        elementIcon.id = `assign-table-image-item-${index}`;

        const switchElementVessel = document.createElement("div");
        switchElementVessel.id = `switch-element-vessel-${index}`;

        iImageContainer.append(iImage);
        iElementIconContainer.append(elementIcon, switchElementVessel);

        const iDropdownContainer = document.createElement("td");
        const iDropdown = document.createElement("select");

        const nonSelectedOption = document.createElement("option");
        nonSelectedOption.value = "Unsigned";
        nonSelectedOption.textContent = "------";

        const fireOption = document.createElement("option");
        fireOption.value = "Fire";
        fireOption.textContent = "Fire";

        const waterOption = document.createElement("option");
        waterOption.value = "Water";
        waterOption.textContent = "Water";

        const earthOption = document.createElement("option");
        earthOption.value = "Earth";
        earthOption.textContent = "Earth";

        iDropdown.append(nonSelectedOption, fireOption, waterOption, earthOption);
        iDropdownContainer.append(iDropdown);
        iRow.append(iImageContainer, iElementIconContainer);
        contentsTable.append(iRow);
        rps.appendAssignItemRow(iRow);
    });
    return contentsTable;
}
// ================

export const rpsUI = {
    rockPaperScissorsSceneWrapper,
    gameSessionWrapper,
    buttonsTable,
    rpsPlayerButtons,
    rpsCpuButtons,
    duelRailway,
    playerRailwayItem,
    cpuRailwayItem
}

export const rpsUIAssignTable = {
    assignTableWrapper,
    assignTableContainer,
    showHideAssignTableButton,
    assignTableContents
}