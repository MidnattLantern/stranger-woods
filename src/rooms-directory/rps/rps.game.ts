import playerBatchData from "./player-batch.json";
import cpuBatchData from "./cpu-batch.json";
import { rps } from "./rps";
import type { ISlot } from "./models";

function initiateDuel(
    playerSlotIndex: number = rps.getPlayerSelectedSlotIndex(),
    cpuSlotIndex: number = rps.getCpuSelectedSlotIndex(),
    playerBatch = playerBatchData as ISlot[],
    cpuBatch = cpuBatchData as ISlot[],
    playerSlotElementType: "fire" | "water" | "earth" = playerBatch[playerSlotIndex].element,
    cpuSlotElementType: "fire" | "water" | "earth" = cpuBatch[cpuSlotIndex].element,
    winner: "player" | "cpu" | null = null
) {
    console.log("Player used a", playerSlotElementType);
    console.log("Cpu used a", cpuSlotElementType);

    /*
    - Fire beats earth
    - Water beats fire
    - Earth beats water
    */
    switch (playerSlotElementType) {
        case "fire":
            if (cpuSlotElementType === "fire") {
                winner = null;
            } else if (cpuSlotElementType === "water") {
                winner = "cpu";
            } else { // cpu picked "earth"
                winner = "player";
            }
            break;
        case "water":
            if (cpuSlotElementType === "fire") {
                winner = "player";
            } else if (cpuSlotElementType === "water") {
                winner = null;
            } else { // cpu picked "earth"
                winner = "cpu";
            }
            break;
        case "earth":
            if (cpuSlotElementType === "fire") {
                winner = "cpu";
            } else if (cpuSlotElementType === "water") {
                winner = "player";
            } else { // cpu picked "earth"
                winner = null;
            }
            break;
        default:
            break;
    }
    
    console.log("Winner:", winner);
}

export const rpsGame = {
    initiateDuel
}