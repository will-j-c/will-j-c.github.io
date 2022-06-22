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
            duration: (0.5),
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
// Player and enemy bounces
function bounce(target) {
    const rand = Math.random() * 1;
    const t1 = gsap.timeline({repeat: -1, delay: rand});
    t1.to(target, {animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",transform: "translate3d(0, 0, 0)" , duration: 0.2});
    t1.to(target, {animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform: "translate3d(0, -10px, 0) scaleY(1)" , duration: 0.2});
    t1.to(target, {animationTimingFunction: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform: "translate3d(0, -15px, 0) scaleY(1)" , duration: 0.2});
    t1.to(target, {animationTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",transform: "translate3d(0, 0, 0) scaleY(0.95)" , duration: 0.2});
    t1.to(target, {transform: "translate3d(0, -4px, 0) scaleY(1.02)" , duration: 0.1});
    return t1;
}
// Pause the bounce animation when other actions are ongoing
function pauseBounce(target) {
    gsap.set(target, {y: 0}).kill();
}

// Function that animates the message text
function updateText(targetElementAsString, text) {
    return new Promise(resolve => {
        document.querySelector(targetElementAsString).innerText = text;
        tl = gsap.timeline({onComplete: resolve()});
        tl.to(targetElementAsString, {x: 10, duration: 0.1});
        tl.to(targetElementAsString, {x: -10, duration: 0.1});
        tl.to(targetElementAsString, {x: 0, duration: 0.1});
        })
}

// Stab attack animation
async function stabAttack(attacker, target, isHit, startText, successFailText) {
    return new Promise(async resolve => {
        const attackerPosition = attacker.getBoundingClientRect();
        const targetPosition = target.getBoundingClientRect();
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = startText;
        const moveX = targetPosition.left - attackerPosition.right - 20;
        const moveY = targetPosition.top - attackerPosition.top;
        await text(messageBox);
        const t1 = gsap.timeline(
            {
                onComplete: () => resolve(),
            });
        t1.to(attacker, {duration: 0.2, x: -attackerPosition.left / 3});
        t1.to(attacker, {duration: 0.3, x: moveX, y: moveY, ease: Elastic.easeOut.config(1.2, 1)});
        if (isHit) {
            t1.to(messageBox, {onStart: ( () => text(messageBox))});
            t1.to(target, {duration: 0.3, opacity: 0, repeat: 1}), ">-0.3";
            t1.to(target, {duration: 0.3, opacity: 1, repeat: 0});
            t1.to(attacker, {duration: 1.5, x: 0, y: 0, ease: "power2.out"}, ">");
        } else {
            t1.to(target, {transform: "rotate3d(0, 0, 1, 15deg)", x: targetPosition.left/3, y: 10,duration: 0.1}, ">-0.3")
            t1.to(target, {transform: "rotate3d(0, 0, 1, -10deg)", x: targetPosition.left/3, y: 0, duration: 0.1})
            t1.to(target, {transform: "rotate3d(0, 0, 1, 5deg)", duration: 0.1})
            t1.to(target, {transform: "rotate3d(0, 0, 1, -5deg)", duration: 0.1})
            t1.to(target, {transform: "rotate3d(0, 0, 1, 0deg)", duration: 0.1})
            t1.to(attacker, {duration: 1.5, x: 0, ease: "power2.out", y: 0}, ">-0.7");
        }
    })
}