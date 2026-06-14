import airCow from "/artifacts/air-cow.webp";
import amethyst from "/artifacts/amethyst.webp";
import walkingPot from "/artifacts/walking-pot.webp";
import brothersSunflower from "/artifacts/brothers-sunflower.webp";
import key from "/artifacts/key.webp";
import cursedEgg from "/artifacts/cursed-egg.webp";
import type { ISlot } from "./models";
import { rps } from "./rps";

function shuffleBatch() {
    let batch: ISlot[] = [];
    let allIncluded: boolean = false;

    while (!allIncluded) { // make sure at least one of each is included, otherwise reroll
        batch = [];
        const included = new Set();
        const INCLUDED_REQUIRED_COUNT = 6;

        for (let i = 0; i < 12; i++) {
            const shuffleIndex = Math.random();
            let item: ISlot;

            if (shuffleIndex < 0.166) item = {
                name: "Air cow",
                element: "fire",
                assetSource: airCow
            };
            else if (shuffleIndex < 0.333) item = {
                name: "Amethyst",
                element: "fire",
                assetSource: amethyst
            };
            else if (shuffleIndex < 0.499) item = {
                name: "Walking pot",
                element: "earth",
                assetSource: walkingPot
            };
            else if (shuffleIndex < 0.666) item = {
                name: "Brothers sunflower",
                element: "earth",
                assetSource: brothersSunflower
            };
            else if (shuffleIndex < 0.833) item = {
                name: "Key",
                element: "water",
                assetSource: key
            };
            else item = {
                name: "Cursed egg",
                element: "water",
                assetSource: cursedEgg
            };

            batch.push(item);
            included.add(item);
        }
        if (included.size === (INCLUDED_REQUIRED_COUNT * 2)) allIncluded = true;
    }
    console.log("batch ok", batch);
    rps.setPlayerRpsBatch(batch);
    rps.setCpuRpsBatch(batch);
}

export const rpsBatch = {
    shuffleBatch
}