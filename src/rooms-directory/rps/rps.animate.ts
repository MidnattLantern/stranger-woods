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

function runCpuRailItemWin() {
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

function runPlayerRailItemWin() {
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

function openElementSlider() {
    const INIT_DELAY = 0.2;
    const DELAY_DURATION = 0.3;

    gsap.from("#elementSelectorContainer", {
        opacity: 0,
        delay: INIT_DELAY,
        duration: 0.1
    });

    gsap.from("#prevElementRail", {
        x: "65px",
        delay: INIT_DELAY,
        duration: DELAY_DURATION
    });

    gsap.from("#prevElementRailClip", {
        x: "65px",
        delay: INIT_DELAY,
        duration: DELAY_DURATION
    });

    gsap.from("#nextElementRail", {
        x: "-65px",
        delay: INIT_DELAY,
        duration: DELAY_DURATION
    });

    gsap.from("#nextElementRailClip", {
        x: "-65px",
        delay: INIT_DELAY,
        duration: DELAY_DURATION
    });

    gsap.from(".element-selector-body", {
        opacity: 0,
        delay: DELAY_DURATION,
        duration: DELAY_DURATION
    });
}

function slideElementSelector(directionMultiplier: -1 | 1) {
    const SLIDE_DURATION = 0.3;
    let prevElementTimeline = gsap.timeline();
    let selectedElementTimeline = gsap.timeline();
    let nextElementTimeline = gsap.timeline();

    prevElementTimeline.to("#prevElementRail", {
        x: 35.5 * directionMultiplier,
        duration: SLIDE_DURATION,
        ease: "none"
    })
    .to("#prevElementRail", {
        x: 0,
        duration: 0
    })

    selectedElementTimeline.to("#selectedElementRail", {
        x: 50 * directionMultiplier,
        duration: SLIDE_DURATION,
        ease: "none"
    })
    .to("#selectedElementRail", {
        x: 0,
        duration: 0
    })

    nextElementTimeline.to("#nextElementRail", {
        x: 35.5 * directionMultiplier,
        duration: SLIDE_DURATION,
        ease: "none"
    })
    .to("#nextElementRail", {
        x: 0,
        duration: 0
    })
}

export const rpsAnimate = {
    playerSpinToSlot,
    cpuSpinToSlot,
    runPlayerRailItemWin,
    runCpuRailItemWin,
    runRailDraw,
    openElementSlider,
    slideElementSelector
}