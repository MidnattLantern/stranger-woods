import { rps } from "./rps";
import batchPreset1 from "./batch-preset-1.json";
import fireIcon from "/elements/fire-icon.webp";
import waterIcon from "/elements/water-icon.webp";
import earthIcon from "/elements/earth-icon.webp";
import elementSelectorSVG from "@assets/element-selector.svg?raw";

function initializeElementSelector() {
    const container = document.createElement("div");
    container.className = "element-selector";
    container.id = "elementSelectorContainer";

    const prevItem = document.createElement("img");
    prevItem.src = waterIcon;
    prevItem.alt = "Water";

    const nextItem = document.createElement("img");
    nextItem.src = earthIcon;
    nextItem.alt = "Earth";

    container.innerHTML = elementSelectorSVG;

    // prev
    const prevElementPrevSlotImage = container.querySelector("#prevElementPrevSlotImage");
    if (!prevElementPrevSlotImage) return;
    // prevElementPrevSlotImage.setAttribute("href", earthIcon);

    const prevElementCurrentSlotImage = container.querySelector("#prevElementCurrentSlotImage");
    if (!prevElementCurrentSlotImage) return;
    // prevElementCurrentSlotImage.setAttribute("href", waterIcon);

    const prevElementNextSlotImage = container.querySelector("#prevElementNextSlotImage");
    if (!prevElementNextSlotImage) return;
    // prevElementNextSlotImage.setAttribute("href", fireIcon);

    // next
    const nextItemPrevSlotImage = container.querySelector("#nextItemPrevSlotImage");
    if (!nextItemPrevSlotImage) return;
    // nextItemPrevSlotImage.setAttribute("href", fireIcon);

    const nextElementCurrentSlotImage = container.querySelector("#nextElementCurrentSlotImage");
    if (!nextElementCurrentSlotImage) return;
    // nextElementCurrentSlotImage.setAttribute("href", earthIcon);

    const nextElementNextSlotImage = container.querySelector("#nextElementNextSlotImage");
    if (!nextElementNextSlotImage) return;
    // nextElementNextSlotImage.setAttribute("href", waterIcon);

    // current
    const selectedElementPrevSlotImage = container.querySelector("#selectedElementPrevSlotImage");
    if (!selectedElementPrevSlotImage) return;
    // selectedElementPrevSlotImage.setAttribute("href", waterIcon);

    const selectedElementCurrentSlotImage = container.querySelector("#selectedElementCurrentSlotImage");
    if (!selectedElementCurrentSlotImage) return;
    // selectedElementCurrentSlotImage.setAttribute("href", fireIcon);

    const selectedElementNextSlotImage = container.querySelector("#selectedElementNextSlotImage");
    if (!selectedElementNextSlotImage) return;
    // selectedElementNextSlotImage.setAttribute("href", earthIcon);

    return container;
};

function updateElementSelector() {
    const selectedItemIndex = rps.getAssignTableSelectedIndex();
    const currentAssignment = rps.getAssignedElementItem(selectedItemIndex).element;

    const container = document.getElementById("elementSelectorContainer");
    if (!container) return;
    // prev
    const prevElementPrevSlotImage = container.querySelector("#prevElementPrevSlotImage");
    if (!prevElementPrevSlotImage) return;

    const prevElementCurrentSlotImage = container.querySelector("#prevElementCurrentSlotImage");
    if (!prevElementCurrentSlotImage) return;

    const prevElementNextSlot = container.querySelector("#prevElementNextSlotImage");
    if (!prevElementNextSlot) return;

    // next
    const nextItemPrevSlotImage = container.querySelector("#nextItemPrevSlotImage");
    if (!nextItemPrevSlotImage) return;

    const nextElementCurrentSlotImage = container.querySelector("#nextElementCurrentSlotImage");
    if (!nextElementCurrentSlotImage) return;

    const nextElementNextSlotImage = container.querySelector("#nextElementNextSlotImage");
    if (!nextElementNextSlotImage) return;

    // current
    const selectedElementPrevSlotImage = container.querySelector("#selectedElementPrevSlotImage");
    if (!selectedElementPrevSlotImage) return;

    const selectedElementCurrentSlotImage = container.querySelector("#selectedElementCurrentSlotImage");
    if (!selectedElementCurrentSlotImage) return;

    const selectedElementNextSlotImage = container.querySelector("#selectedElementNextSlotImage");
    if (!selectedElementNextSlotImage) return;

    switch (currentAssignment) {
        case "earth":
            prevElementPrevSlotImage.setAttribute("href", waterIcon);
            prevElementCurrentSlotImage.setAttribute("href", fireIcon);
            prevElementNextSlot.setAttribute("href", earthIcon);

            selectedElementPrevSlotImage.setAttribute("href", fireIcon);
            selectedElementCurrentSlotImage.setAttribute("href", earthIcon);
            selectedElementNextSlotImage.setAttribute("href", waterIcon);

            nextItemPrevSlotImage.setAttribute("href", earthIcon);
            nextElementCurrentSlotImage.setAttribute("href", waterIcon);
            nextElementNextSlotImage.setAttribute("href", fireIcon);
            break;
        case "fire":
            prevElementPrevSlotImage.setAttribute("href", earthIcon);
            prevElementCurrentSlotImage.setAttribute("href", waterIcon);
            prevElementNextSlot.setAttribute("href", fireIcon);

            selectedElementPrevSlotImage.setAttribute("href", waterIcon);
            selectedElementCurrentSlotImage.setAttribute("href", fireIcon);
            selectedElementNextSlotImage.setAttribute("href", earthIcon);

            nextItemPrevSlotImage.setAttribute("href", fireIcon);
            nextElementCurrentSlotImage.setAttribute("href", earthIcon);
            nextElementNextSlotImage.setAttribute("href", waterIcon);
            break;
        case "water":
            prevElementPrevSlotImage.setAttribute("href", fireIcon);
            prevElementCurrentSlotImage.setAttribute("href", earthIcon);
            prevElementNextSlot.setAttribute("href", waterIcon);

            selectedElementPrevSlotImage.setAttribute("href", earthIcon);
            selectedElementCurrentSlotImage.setAttribute("href", waterIcon);
            selectedElementNextSlotImage.setAttribute("href", fireIcon);

            nextItemPrevSlotImage.setAttribute("href", waterIcon);
            nextElementCurrentSlotImage.setAttribute("href", fireIcon);
            nextElementNextSlotImage.setAttribute("href", earthIcon);
            break;
        default:
            break;
    };
};

export const rpsAssignTable = {
    initializeElementSelector,
    updateElementSelector
}