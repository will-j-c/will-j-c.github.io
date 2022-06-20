// Fade in
function fadeIn(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("fadeIn");
        targetElement.onanimationend = () => {
            targetElement.classList.remove("fadeIn");
            resolve();
        }
    })
}
// Fade out
function fadeOut(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("fadeOut");
        targetElement.onanimationend = () => {
            targetElement.classList.remove("fadeOut");
            resolve();
        }
    })
}