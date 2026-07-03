import { rps } from "./rps";
import nullPlaceholder from "/elements/null-placeholder.webp";
import fireIcon from "/elements/fire-icon.webp";
import waterIcon from "/elements/water-icon.webp";
import earthIcon from "/elements/earth-icon.webp";
import elementSelectorSVG from "@assets/element-selector.svg?raw";
import { rpsELifecycle } from "./rps.elifecycle";

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

    const prevElementCurrentSlotImage = container.querySelector("#prevElementCurrentSlotImage");
    if (!prevElementCurrentSlotImage) return;

    const prevElementNextSlotImage = container.querySelector("#prevElementNextSlotImage");
    if (!prevElementNextSlotImage) return;

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
        default: // is null (at initialization)
            prevElementPrevSlotImage.setAttribute("href", earthIcon);
            prevElementCurrentSlotImage.setAttribute("href", waterIcon);
            prevElementNextSlot.setAttribute("href", fireIcon);

            selectedElementPrevSlotImage.setAttribute("href", waterIcon);
            selectedElementCurrentSlotImage.setAttribute("href", nullPlaceholder);
            selectedElementNextSlotImage.setAttribute("href", earthIcon);

            nextItemPrevSlotImage.setAttribute("href", fireIcon);
            nextElementCurrentSlotImage.setAttribute("href", earthIcon);
            nextElementNextSlotImage.setAttribute("href", waterIcon);
            break;
    };
    rpsELifecycle.resumeClickAssignTableInputLifecycle();
};

export const rpsAssignTable = {
    initializeElementSelector,
    updateElementSelector
}