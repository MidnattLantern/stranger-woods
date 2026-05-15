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

export const rpsStoryController = {
    getStoryToUse,
    getStoryIndex,
    setNextStoryIndex
};