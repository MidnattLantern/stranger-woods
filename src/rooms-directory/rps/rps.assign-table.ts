import { rps } from "./rps";
import mockData from "./batch-preset-1.json";

function rpsAssignTableTable() {
    const test = mockData;
    let testTable = document.createElement("table");
    testTable.classList.add("hide-table");

    test.map((i) => {
        const iRow = document.createElement("tr");
        const iImageContainer = document.createElement("td");

        const iImage = document.createElement("img");
        iImage.src = i.assetSource;
        iImage.alt = i.name;
        iImage.className = "assign-table__item-image";

        iImageContainer.append(iImage);

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
        iRow.append(iImageContainer, iDropdownContainer);
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