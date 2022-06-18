// Function that animates the message text
function text(targetElement) {
    targetElement.classList.add("text");
    setTimeout(() => {
        targetElement.classList.remove("text");
    }, 1500)
}
// Bounce animation
function bounce(targetElement) {
    targetElement.classList.add("bounce");
    setTimeout(() => {
        targetElement.classList.remove("bounce");
    }, 1500)
}
// Rubber band animation
function rubberBand(targetElement) {
    targetElement.classList.add("rubberBand");
    setTimeout(() => {
        targetElement.classList.remove("rubberBand");
    }, 1500)
}
// Attack right animation bounceOutRight
function bounceOutRight(targetElement) {
    targetElement.classList.add("bounceOutRight");
    setTimeout(() => {
        targetElement.classList.remove("bounceOutRight");
    }, 1500)
}
// Hit animation
function flash(targetElement) {
    targetElement.classList.add("flash");
    setTimeout(() => {
        targetElement.classList.remove("flash");
    }, 1500)
}