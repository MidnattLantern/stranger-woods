import { rps } from "./rps";
import batchPreset1 from "./batch-preset-1.json";
import fireIcon from "/elements/fire-icon.webp";
import waterIcon from "/elements/water-icon.webp";
import earthIcon from "/elements/earth-icon.webp";
import elementSelectorSVG from "@assets/element-selector.svg?raw";

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

    // prev
    const prevElementPrevSlotImage = container.querySelector("#prevElementPrevSlotImage");
    if (!prevElementPrevSlotImage) return;

    const prevElementCurrentSlotImage = container.querySelector("#prevElementCurrentSlotImage");
    if (!prevElementCurrentSlotImage) return;

    const prevElementNextSlot = container.querySelector("#prevElementNextSlot");
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

    return container;
};

export const rpsAssignTable = {
    elementSelector
}