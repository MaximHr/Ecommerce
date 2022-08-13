import confetti from "canvas-confetti";

export const runFireWorks = () => {
    var end = Date.now() + (3 * 1000);

// go Buckeyes!
    var colors = ['black', '#f02d34'];

    (function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}