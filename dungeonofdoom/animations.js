// Fade in
function fadeIn(targetElement, duration=2) {
    return new Promise(resolve => {
        gsap.fromTo(targetElement, {
            opacity: 0,
            ease: "power1.inOut",
        }, 
        {
            opacity: 1,
            duration: duration,
            ease: "power1.inOut",
            onComplete: resolve
        })
    })
}

// Fade out
function fadeOut(targetElement, duration=2) {
    return new Promise(resolve => {
        gsap.fromTo(targetElement, {
            opacity: 1,
            ease: "power1.inOut",
        }, 
        {
            opacity: 0,
            duration: duration,
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

// Function that animates the message text
function updateText(targetElementAsString, text) {
    return new Promise(resolve => {
        document.querySelector(targetElementAsString).innerText = text;
        tl = gsap.timeline({onComplete: resolve()});
        tl.to(targetElementAsString, {x: 10, duration: 0.05});
        tl.to(targetElementAsString, {x: -10, duration: 0.01});
        tl.to(targetElementAsString, {x: 0, duration: 0.01});
        })
}
// Player animations
// Stab attack animation
async function stabAttackAnimation(attacker, target, isHit, startText, successFailText, isAlive, deathText) {
    return new Promise(async resolve => {
        const attackerPosition = attacker.getBoundingClientRect();
        const targetPosition = target.getBoundingClientRect();
        const battlefieldPosition = document.querySelector("#battle-container").getBoundingClientRect();
        const moveX = targetPosition.left - attackerPosition.right - 20;
        const moveY = targetPosition.top - attackerPosition.top;
        const t1 = gsap.timeline({onComplete: () => resolve()});
        t1.call(updateText, ["#message-box", startText]);
        t1.to(attacker, {duration: 0.2, x: -attackerPosition.left / 3}, "<+=0.2");
        t1.to(attacker, {duration: 0.3, x: moveX, y: moveY, ease: Elastic.easeOut.config(1.2, 1)}, "<+=0.2");
        if (isHit) {
            t1.call(updateText, ["#message-box", successFailText]);
            t1.to(target, {duration: 0.3, opacity: 0, repeat: 1}), "-=1";
            t1.to(target, {duration: 0.3, opacity: 1, repeat: 0});
            t1.to(attacker, {duration: 1.5, x: 0, y: 0, ease: "power2.out"}, "-=0.5");
            if (isAlive === false) {
                t1.call(updateText, ["#message-box", deathText]);
                t1.to(target, {transform: "rotate3d(0, 0, 1, 90deg)", duration: 0.4}, "-=1");
                t1.to(target, {opacity: 0, duration: 0.2});
            }
        } else {
            t1.to(target, {x: (battlefieldPosition.right - targetPosition.right)/2, y: -15,duration: 0.1}, ">");
            t1.call(updateText, ["#message-box", successFailText]);
            t1.to(target, {x: 0, duration: 1});
            t1.to(attacker, {duration: 1.5, x: 0, ease: "power2.out", y: 0}, ">-0.7");
        }
    })
}

function takePotionAnimation(target, text, potionId, potionStock, hitPointElement, hitPointText) {
    return new Promise(async resolve => {
        await updateText("#message-box", text);
        await updateText(potionId, potionStock);
        const t1 = gsap.timeline({onComplete: () => resolve(), repeat: 2});
        t1.to(target, {y: -10, duration: 0.1});
        t1.to(target, {y: 0, duration: 0.1});
        t1.to(target, {y: 10, duration: 0.1});
        await updateText(hitPointElement, hitPointText);
    })
}
// Defend animation
function defendAnimation(target, text, statusEffectId, statusEffectText) {
    return new Promise(async resolve => {
        await updateText("#message-box", text);
        const t1 = gsap.timeline({onComplete: () => resolve(), repeat: 2});
        t1.to(target, {x: -10, duration: 0.1});
        t1.to(target, {x: 0, duration: 0.1});
        t1.to(target, {x: 10, duration: 0.1});
        await updateText(statusEffectId, statusEffectText);
    })
}

// Enemy animations

function shuffleAttackAnimation(attacker, target, isHit, startText, successFailText, isAlive, deathText, playerHP) {
    return new Promise(async resolve => {
        const attackerPosition = attacker.getBoundingClientRect();
        const targetPosition = target.getBoundingClientRect();
        const battlefieldPosition = document.querySelector("#battle-container").getBoundingClientRect();
        const moveX = targetPosition.right - attackerPosition.left - 20;
        const moveY = targetPosition.top - attackerPosition.top;
        const t1 = gsap.timeline({onComplete: () => resolve()});
        t1.call(updateText, ["#message-box", startText]);
        t1.to(attacker, {duration: 0.4, x: (battlefieldPosition.right - attackerPosition.right) / 3, ease: "steps(2)"}, "<+=0.2");
        t1.to(attacker, {duration: 0.5, x: moveX, y: moveY, ease: "steps(8)"}, "<+=0.2");
        if (isHit) {
            t1.call(updateText, ["#message-box", successFailText]);
            t1.to(target, {duration: 0.3, opacity: 0, repeat: 1}), "-=1";
            t1.to(target, {duration: 0.3, opacity: 1, repeat: 0});
            t1.call(updateText, ["#current-hit-points", playerHP]);
            t1.to(attacker, {duration: 1.8, x: 0, y: 0, ease: "steps(8)"}, "-=0.5");
            if (isAlive === false) {
                t1.call(updateText, ["#message-box", deathText]);
                t1.to(target, {transform: "rotate3d(0, 0, 1, -90deg)", duration: 0.4}, "-=1");
                t1.to(target, {opacity: 0, duration: 0.2});
            }
        } else {
            t1.to(target, {x: (battlefieldPosition.left - targetPosition.left)/2, y: 15,duration: 0.1}, ">");
            t1.call(updateText, ["#message-box", successFailText]);
            t1.to(target, {x: 0, y: 0, duration: 1});
            t1.to(attacker, {duration: 1.8, x: 0, ease: "steps(8)", y: 0}, ">-0.7");
        }
    })
}