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