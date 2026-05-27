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

function runPlayerRailItemWin() {
    let playerTimeline = gsap.timeline();
    let cpuTimeline = gsap.timeline();

    cpuTimeline
    .to("#cpuRailwayItem", {
        y: "110%",
        duration: 0.3,
        ease: "power1.in"
    })
    .to("#cpuRailwayItem", {
        y: "150%",
        duration: 0.1,
        ease: "none"
    })
    .to("#cpuRailwayItem", {
        y: "0%",
        duration: 0.6,
        ease: "power4.in"
    });

    playerTimeline
    .to("#playerRailwayItem", {
        y: "-110%",
        duration: 0.3,
        ease: "power1.in"
    })
    .to("#playerRailwayItem", {
        y: "0%",
        duration: 0.3,
        ease: "bounce.out"
    });
}

function runCpuRailItemWin() {
    let playerTimeline = gsap.timeline();
    let cpuTimeline = gsap.timeline();

    playerTimeline
    .to("#playerRailwayItem", {
        y: "-110%",
        duration: 0.3,
        ease: "power1.in"
    })
    .to("#playerRailwayItem", {
        y: "-150%",
        duration: 0.1,
        ease: "none"
    })
    .to("#playerRailwayItem", {
        y: "0%",
        duration: 0.6,
        ease: "power4.in"
    });

    cpuTimeline
    .to("#cpuRailwayItem", {
        y: "110%",
        duration: 0.3,
        ease: "power1.in"
    })
    .to("#cpuRailwayItem", {
        y: "0%",
        duration: 0.3,
        ease: "bounce.out"
    });
}

function runRailDraw() {
    let playerTimeline = gsap.timeline();
    let cpuTimeline = gsap.timeline();

    playerTimeline
    .to("#playerRailwayItem", {
        y: "-110%",
        duration: 0.7,
        ease: "bounce.out"
    })
    .to("#playerRailwayItem", {
        y: "0%",
        duration: 0.3,
        ease: "none"
    });

    cpuTimeline
    .to("#cpuRailwayItem", {
        y: "110%",
        duration: 0.7,
        ease: "bounce.out"
    })
    .to("#cpuRailwayItem", {
        y: "0%",
        duration: 0.3,
        ease: "none"
    });
}

export const rpsAnimate = {
    playerSpinToSlot,
    cpuSpinToSlot,
    runPlayerRailItemWin,
    runCpuRailItemWin,
    runRailDraw
}