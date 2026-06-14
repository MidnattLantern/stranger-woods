import earthElement from "/elements/earth-icon.webp";
import fireElement from "/elements/fire-icon.webp";
import waterElement from "/elements/water-icon.webp";
import airCow from "/artifacts/air-cow.webp";
import amethyst from "/artifacts/amethyst.webp";
import walkingPot from "/artifacts/walking-pot.webp";
import brothersSunflower from "/artifacts/brothers-sunflower.webp";
import key from "/artifacts/key.webp";
import cursedEgg from "/artifacts/cursed-egg.webp";
// import feather from "/artifacts/feather.webp";
// import fishStatue from "/artifacts/fish-statue.webp";
// import tinyCyclope from "/artifacts/tiny-cyclope.webp";
// import twilightFeline from "/artifacts/twilight-feline.webp";
import type { ISlot } from "./models";

function shuffleBatch(includeRawElement: false | "fire" | "water" | "earth" = false) {
    let batch: ISlot[] = [];
    let allIncluded: boolean = false;

    while (!allIncluded) { // make sure at least one of each is included, otherwise reroll
        batch = [];
        const included = new Set();
        const INCLUDED_SIZE_REQ = 6;
        const BATCH_SIZE = 12;
        let shuffleStartIndex = 0;
        if (includeRawElement) {
            shuffleStartIndex = 1; // leave the first slot alone for raw element
            switch (includeRawElement) {
                case "water":
                    batch[0] = {
                        name: "Water",
                        element: "water",
                        assetSource: waterElement
                    };
                    break;
                case "fire":
                    batch[0] = {
                        name: "Fire",
                        element: "fire",
                        assetSource: fireElement
                    };
                    break;
                case "earth":
                    batch[0] = {
                        name: "Earth",
                        element: "earth",
                        assetSource: earthElement
                    };
                    break;
                default:
                    break;
            }
        }

        for (let i = shuffleStartIndex; i < BATCH_SIZE; i++) {
            const shuffleIndex = Math.random();

            if (shuffleIndex < 0.166) {
                included.add("air cow");
                batch.push({
                    name: "Air cow",
                    element: "fire",
                    assetSource: airCow
                });
            }
            else if (shuffleIndex < 0.333) {
                included.add("amethyst");
                batch.push({
                    name: "Amethyst",
                    element: "fire",
                    assetSource: amethyst
                });
            }
            else if (shuffleIndex < 0.499) {
                included.add("walking pot");
                batch.push({
                    name: "Walking pot",
                    element: "earth",
                    assetSource: walkingPot
                });
            }
            else if (shuffleIndex < 0.666) {
                included.add("brothers sunflower");
                batch.push({
                    name: "Brothers sunflower",
                    element: "earth",
                    assetSource: brothersSunflower
                });
            }
            else if (shuffleIndex < 0.833) {
                included.add("key");
                batch.push({
                    name: "Key",
                    element: "water",
                    assetSource: key
                });
            }
            else {
                included.add("cursed egg");
                batch.push({
                    name: "Cursed egg",
                    element: "water",
                    assetSource: cursedEgg
                });
            }
        }
        if (included.size === INCLUDED_SIZE_REQ) allIncluded = true;
    }
    console.log("batch ok", batch);
    return batch;
}

export const rpsBatch = {
    shuffleBatch
}