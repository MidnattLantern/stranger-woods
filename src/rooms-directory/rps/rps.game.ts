import { rps } from "./rps";
import { rpsELifecycle } from "./rps.elifecycle";
import { rpsEvents } from "./rps.events";
import { rpsAnimate } from "./rps.animate";

function initiateDuel(
    playerSlotIndex: number = rps.getPlayerSelectedSlotIndex(), // 0 - 11
    cpuSlotIndex: number = rps.getCpuSelectedSlotIndex(), // 0 - 11
    playerBatch = rps.getPlayerRpsBatch(),
    cpuBatch = rps.getCpuRpsBatch(),
    playerSlotElementType: "fire" | "water" | "earth" = playerBatch[playerSlotIndex].element,
    cpuSlotElementType: "fire" | "water" | "earth" = cpuBatch[cpuSlotIndex].element,
    winner: "player" | "cpu" | null = null,
    playerSelectedSlotIndex = rps.getPlayerSelectedSlotIndex(),
    playerSelectedSlotItem = document.getElementById(`playerSlot${playerSelectedSlotIndex}`),
    playerRailwayItem = rps.getPlayerRailwayItem(),
    playerRailwayIconToUse = playerBatch[playerSelectedSlotIndex].assetSource,
    cpuSelectedSlotIndex = rps.getCpuSelectedSlotIndex(),
    cpuSelectedSlotItem = document.getElementById(`cpuSlot${cpuSelectedSlotIndex}`),
    cpuRailwayItem = rps.getCpuRailwayItem(),
    cpuRailwayIconToUse = cpuBatch[cpuSelectedSlotIndex].assetSource
) {
    let timeout;
    function myTimeout() {
        timeout = setTimeout(resume, 1000);
    }
    function resume() {
        rpsEvents.handleCpuRotateDisc();
        rps.getDuelRailway().classList.add("hidden");
        playerSelectedSlotItem?.classList.remove("hidden");
        cpuSelectedSlotItem?.classList.remove("hidden");
        rpsELifecycle.resumeMouseTapInputLifecycle();
        rpsELifecycle.resumePlayerSlotsLifecycle();
    }
    rpsELifecycle.pauseMouseTapInputLifecycle();
    rpsELifecycle.pausePlayerSlotsLifecycle();
    playerRailwayItem.src = playerRailwayIconToUse;
    cpuRailwayItem.src = cpuRailwayIconToUse;
    rps.getDuelRailway().classList.remove("hidden");
    playerSelectedSlotItem?.classList.add("hidden");
    cpuSelectedSlotItem?.classList.add("hidden");

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