import { dialogueBox } from '@/components/dialogue-box/dialogue-box';
import type { IScriptEvent } from './models';
import introStory from "@rps-story/intro.json";
import { rps } from './rps';

let rpsStoryToUse: IScriptEvent[] = introStory;
let rpsStoryIndex: number = 0;

function getStoryToUse() {
    return rpsStoryToUse;
}

function getStoryIndex() {
    return rpsStoryIndex;
}

function setNextStoryIndex() {
    rpsStoryIndex++;
}

function handleInitializeStoryline() {
    dialogueBox.showDialogueBox(rpsStoryToUse[rpsStoryIndex].textEvent);
    beginRPSNextStoryLineLifecycle();
}

function handleNextStoryline() {
    const rpsNextBtn = dialogueBox.nextButton;
    if (rpsNextBtn.disabled) return;
    if (rpsStoryIndex+1 < rpsStoryToUse.length) {
        setNextStoryIndex();
        dialogueBox.updateDialogueBox(rpsStoryToUse[rpsStoryIndex].textEvent);
    } else {
        endRPSNextStoryLineLifecycle();
        rps.handleBeginRpsGame();
    }
}

// ====
// RAII
// ====
// consider moving to rps.events.ts
function beginRPSNextStoryLineLifecycle() {
    const rpsNextBtn = dialogueBox.nextButton;
    rpsNextBtn.addEventListener('click', handleNextStoryline);
}

function endRPSNextStoryLineLifecycle() {
    const rpsNextBtn = dialogueBox.nextButton;
    rpsNextBtn.removeEventListener('click', handleNextStoryline);
}
// ====

const lifeCycle = { // consider moving to rps.events.ts
    beginRPSNextStoryLineLifecycle,
    endRPSNextStoryLineLifecycle
}

export const rpsStoryController = {
    getStoryToUse,
    getStoryIndex,
    setNextStoryIndex,
    handleInitializeStoryline,
    handleNextStoryline,
    lifeCycle
};