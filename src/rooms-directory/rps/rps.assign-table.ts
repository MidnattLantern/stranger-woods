import { rps } from "./rps";
import mockData from "./batch-preset-1.json";
import fireIcon from "/elements/fire-icon.webp";
import waterIcon from "/elements/water-icon.webp";
import earthIcon from "/elements/earth-icon.webp";
import elementSelectorSVG from "@assets/element-selector.svg?raw";

function rpsAssignTableTable() {
    const test = mockData;
    let testTable = document.createElement("table");
    testTable.classList.add("hide-table");

    test.map((i, index) => {
        const iRow = document.createElement("tr");
        const iImageContainer = document.createElement("td");

        iRow.id = `assign-item-index-${index.toString()}`;

        const iImage = document.createElement("img");
        iImage.src = i.assetSource;
        iImage.alt = i.name;
        iImage.className = "assign-table__item-image";

        const iElementIconContainer = document.createElement("td");
        iElementIconContainer.className = "assign-table__icon-container";

        const elementIcon = document.createElement("img");
        elementIcon.src = fireIcon;
        elementIcon.alt = "Fire";
        elementIcon.className = "assign-table__element-icon";

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
        testTable.append(iRow);
    });
    return testTable;
}

function handleToggleAssignTable() {
    rps.toggleAssignTableOpen();
};

function elementSelector() {
    const container = document.createElement("div");
    container.className = "element-selector";

    const prevItem = document.createElement("img");
    prevItem.src = waterIcon;
    prevItem.alt = "Water";

    const nextItem = document.createElement("img");
    nextItem.src = earthIcon;
    nextItem.alt = "Earth";

    container.innerHTML = elementSelectorSVG;

    const selectedElementSlotImage = container.querySelector("#selectedElementSlot");
    if (!selectedElementSlotImage) return;
    selectedElementSlotImage.setAttribute("href", waterIcon);

    const prevElementSlotImage = container.querySelector("#prevElementSlot");
    if (!prevElementSlotImage) return;
    prevElementSlotImage.setAttribute("href", earthIcon);

    const nextElementSlotImage = container.querySelector("#nextElementSlot");
    if (!nextElementSlotImage) return;
    nextElementSlotImage.setAttribute("href", fireIcon);

    return container;
};

export const rpsAssignTable = {
    rpsAssignTableTable,
    handleToggleAssignTable,
    elementSelector
}