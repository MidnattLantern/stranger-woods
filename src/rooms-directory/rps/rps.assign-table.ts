import { rps } from "./rps";
import mockData from "./batch-preset-1.json";
import fireIcon from "/elements/fire-icon.webp";

function rpsAssignTableTable() {
    const test = mockData;
    let testTable = document.createElement("table");
    testTable.classList.add("hide-table");

    test.map((i, index) => {
        const iRow = document.createElement("tr");
        const iImageContainer = document.createElement("td");

        iRow.tabIndex = 0;
        iRow.id = `assign-item-index-${index.toString()}`;

        const iImage = document.createElement("img");
        iImage.src = i.assetSource;
        iImage.alt = i.name;
        iImage.className = "assign-table__item-image";

        const iElementIconContainer = document.createElement("td");

        const elementIcon = document.createElement("img");
        elementIcon.src = fireIcon;
        elementIcon.alt = "Fire";
        elementIcon.className = "assign-table__item-icon";

        iImageContainer.append(iImage);
        iElementIconContainer.append(elementIcon);

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

export const rpsAssignTable = {
    rpsAssignTableTable,
    handleToggleAssignTable
}