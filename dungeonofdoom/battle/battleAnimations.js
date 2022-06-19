// Function that animates the message text
function text(targetElement) {
    targetElement.classList.add("text");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("text");
    }
}
// Bounce animation
function bounce(targetElement) {
    targetElement.classList.add("bounce");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("bounce");
    }
}
// Rubber band animation
function rubberBand(targetElement) {
    targetElement.classList.add("rubberBand");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("rubberBand");
    }
}
// Attack right animation bounceOutRight
function bounceOutRight(targetElement) {
    targetElement.classList.add("bounceOutRight");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("bounceOutRight");
    }
}
// Hit animation
function flash(targetElement) {
    targetElement.classList.add("flash");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("flash");
    }
}
// Death animation
function death(targetElement) {
    targetElement.classList.add("dead");
    targetElement.onanimationend = () => {
        targetElement.classList.add("hidden");
    }
}
// Enemy attack
function bounceOutLeft(targetElement) {
    targetElement.classList.add("bounceOutLeft");
    targetElement.onanimationend = () => {
        targetElement.classList.remove("bounceOutLeft");
    }
}