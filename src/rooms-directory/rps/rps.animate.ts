import gsap from "gsap";

function spinToSlot(slotIndex: number) {
    let rotateDeg: number = 0;
    const rotateDuration: number = 0.4;
    const rotateEasing: string = "back.out";

    switch (slotIndex) {
        case 1:
            rotateDeg = 25;
            break;
        case 2:
            rotateDeg = 0;
            break;
        case 3:
            rotateDeg = -25;
            break;
        default:
            break;
    }

    gsap.to("#trans-origin-wheel", {
        rotate: rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    });

    gsap.to("#playerSlot1Image", {
        rotate: -rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    })

    gsap.to("#playerSlot2Image", {
        rotate: -rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    })

    gsap.to("#playerSlot3Image", {
        rotate: -rotateDeg,
        duration: rotateDuration,
        transformOrigin: "center",
        ease: rotateEasing
    })
}

export const rpsAnimate = {
    spinToSlot
}