// Function that animates the message text
function text(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("text");
        console.log("text animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("text")
            console.log("text animation complete")
            resolve();
        }
    })
}
// Bounce animation
function bounce(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("bounce");
        console.log("bounceOutLeft animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("bounce");
            console.log("bounce animation complete")
            resolve();
        }
    })
}
// Rubber band animation
function rubberBand(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("rubberBand");
        console.log("rubberBand animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("rubberBand");
            console.log("rubberBand animation complete")
            resolve();
        }
    
    })
}
// Attack right animation bounceOutRight
function bounceOutRight(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("bounceOutRight");
        console.log("bounceOutRight animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("bounceOutRight");
            console.log("bounceOutRight animation complete")
            resolve();
        }
    })
}
// Hit animation
function flash(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("flash");
        console.log("flash animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("flash");
            console.log("flash animation complete")
            resolve();
        }
    })    
}
// Death animation
function death(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("dead");
        console.log("death animation waiting to complete")
        setTimeout(() => {
            targetElement.classList.add("hidden");
            console.log("death animation complete")
            resolve();
        }, 1000)
    })
}
// Enemy attack
function bounceOutLeft(targetElement) {
    return new Promise(resolve => {
        targetElement.classList.add("bounceOutLeft");
        console.log("bounceOutLeft animation waiting to complete")
        targetElement.onanimationend = () => {
            targetElement.classList.remove("bounceOutLeft");
            console.log("bounceOutLeft animation complete")
            resolve();
        }
    })
}