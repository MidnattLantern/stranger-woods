import playerBatchData from "./player-batch.json";
import cpuBatchData from "./cpu-batch.json";
import { rps } from "./rps";
import type { ISlot } from "./models";
import { rpsELifecycle } from "./rps.elifecycle";
import { rpsEvents } from "./rps.events";
import { rpsAnimate } from "./rps.animate";

function initiateDuel(
    playerSlotIndex: number = rps.getPlayerSelectedSlotIndex(), // 0 - 11
    cpuSlotIndex: number = rps.getCpuSelectedSlotIndex(), // 0 - 11
    playerBatch = playerBatchData as ISlot[],
    cpuBatch = cpuBatchData as ISlot[],
    playerSlotElementType: "fire" | "water" | "earth" = playerBatch[playerSlotIndex].element,
    cpuSlotElementType: "fire" | "water" | "earth" = cpuBatch[cpuSlotIndex].element,
    winner: "player" | "cpu" | null = null
) {
    let timeout;
    function myTimeout() {
        timeout = setTimeout(resume, 1000);
    }
    function resume() {
        rpsELifecycle.resumeMouseTapInputLifecycle();
        rpsELifecycle.resumePlayerSlotsLifecycle();
        rpsEvents.handleCpuRotateDisc();
    }
    rpsELifecycle.pauseMouseTapInputLifecycle();
    rpsELifecycle.pausePlayerSlotsLifecycle();
    /*
    - Fire beats earth
    - Water beats fire
    - Earth beats water
    */
    switch (playerSlotElementType) {
        case "fire":
            if (cpuSlotElementType === "fire") {
                winner = null;
                rpsAnimate.runRailDraw();
            } else if (cpuSlotElementType === "water") {
                winner = "cpu";
                rpsAnimate.runCpuRailItemWin();
            } else { // cpu picked "earth"
                winner = "player";
                rpsAnimate.runPlayerRailItemWin();
            }
            break;
        case "water":
            if (cpuSlotElementType === "fire") {
                winner = "player";
                rpsAnimate.runPlayerRailItemWin();
            } else if (cpuSlotElementType === "water") {
                winner = null;
                rpsAnimate.runRailDraw();
            } else { // cpu picked "earth"
                winner = "cpu";
                rpsAnimate.runCpuRailItemWin();
            }
            break;
        case "earth":
            if (cpuSlotElementType === "fire") {
                winner = "cpu";
                rpsAnimate.runCpuRailItemWin();
            } else if (cpuSlotElementType === "water") {
                winner = "player";
                rpsAnimate.runPlayerRailItemWin();
            } else { // cpu picked "earth"
                winner = null;
                rpsAnimate.runRailDraw();
            }
            break;
        default:
            break;
    }

    console.log("Winner:", winner);
    myTimeout();
}

export const rpsGame = {
    initiateDuel
}