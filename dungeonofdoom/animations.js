// Fade in
function fadeIn(targetElement) {
    return new Promise(resolve => {
        gsap.fromTo(targetElement, {
            opacity: 0,
            ease: "power1.inOut",
        }, 
        {
            opacity: 1,
            duration: 2,
            ease: "power1.inOut",
            onComplete: resolve
        })
    })
}

// Fade out
function fadeOut(targetElement) {
    return new Promise(resolve => {
        gsap.fromTo(targetElement, {
            opacity: 1,
            ease: "power1.inOut",
        }, 
        {
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            onComplete: resolve
        })
    })
}

// Pulse

function pulse(targetElement) {
    return new Promise(resolve => {
        const tl = gsap.timeline({repeat: -1})
        tl.to(targetElement, {
            scale: 1.01,
            duration: 0.5,
            ease: Power0.easeNone
          })
        tl.to(targetElement, {
            scale: 0.99,
            duration: 1,
            ease: Power0.easeNone
        })
        tl.to(targetElement, {
            scale: 1,
            duration: 0.5,
            ease: Power0.easeNone
        })
        resolve();
    })
}

// Typewriter effect
function typewriter(targetElement, text) {
    return new Promise(resolve =>  {
        const timeAdjustment = text.length/350;
        scroll(0, 500)
        gsap.to(targetElement, {
            duration: (1),
            text: {
                value: text,
                delimiter: " "
            },
            ease: "none",
            onComplete: resolve
        });
        
    })
}

// Battle Animations

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
        }, 1000)
        resolve();
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