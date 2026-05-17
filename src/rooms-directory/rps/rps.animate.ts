import gsap from "gsap";

function spinPlayerElementalsDisc() {

    gsap.to("#trans-origin-container", {
        rotate: 360,
        duration: 5,
        repeat: -1,
        transformOrigin: "center",
        ease: "none"
    });
}

export const rpsAnimate = {
    spinPlayerElementalsDisc
}