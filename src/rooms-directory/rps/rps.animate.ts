import gsap from "gsap";
import { rps } from "./rps";

function playerSpinToSlot(slotIndex: number = rps.getPlayerDiscRotationIndex()) {
    const rotateDeg = slotIndex * 30;
    const rotateDuration: number = 0.5;
    const rotateEasing: string = "back.out";

    gsap.to("#playerTransOriginWheel", {
        rotate: -rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    });

    gsap.to(".playerSlotI", {
        rotate: rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    })
}

function cpuSpinToSlot(slotIndex: number = rps.getCpuDiscRotationIndex()) {
    const rotateDeg = slotIndex * 30;
    const rotateDuration: number = 0.5;
    const rotateEasing: string = "back.out";

    gsap.to("#cpuTransOriginWheel", {
        rotate: -rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    });

    gsap.to(".cpuSlotI", {
        rotate: rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    })
}

export const rpsAnimate = {
    playerSpinToSlot,
    cpuSpinToSlot
}