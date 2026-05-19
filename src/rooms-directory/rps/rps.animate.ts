import gsap from "gsap";
import { rps } from "./rps";

function spinToSlot(slotIndex: number = rps.getPlayerSelectedSlotIndex()) {
    const rotateDeg = slotIndex * 30;
    const rotateDuration: number = 0.4;
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

export const rpsAnimate = {
    spinToSlot
}