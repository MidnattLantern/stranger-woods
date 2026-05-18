import { dialogueBox } from '@/components/dialogue-box/dialogue-box';
import type { IScriptEvent } from './models';
import introStory from "@rps-story/intro.json";

let rpsStoryToUse: IScriptEvent[] = introStory;
let rpsStoryIndex: number = 0;

function getStoryToUse() {
    return rpsStoryToUse;
};

function getStoryIndex() {
    return rpsStoryIndex;
};

function setNextStoryIndex() {
    rpsStoryIndex++;
}

function handleNextStoryline() {
    const rpsNextBtn = dialogueBox.nextButton;
    if (rpsNextBtn.disabled) return;
    dialogueBox.updateDialogueBox(introStory[rpsStoryIndex].textEvent);
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

const lifeCycle = {
    beginRPSNextStoryLineLifecycle,
    endRPSNextStoryLineLifecycle
}

export const rpsStoryController = {
    getStoryToUse,
    getStoryIndex,
    setNextStoryIndex,
    handleNextStoryline,
    lifeCycle
};

// garbage 