class BattleEvent {
    constructor(event, battle) {
      this.event = event;
      this.battle = battle;
    }
    // Find index of action in Object's list of actions by the id that the event returns
    findAction(id) {
        const actions = this.event.currentCombatant.actions;
        let actionControlObject = "EMPTY";
        let actionIndex = ""; // Initalise the variable to hold the action control object
        actions.forEach((action, index) => {
            for (let key in action) {
                if (key === "id"){
                    if (action[key] === id) {
                        actionControlObject = action;
                        actionIndex = index;
                    }
                }
            }
        })
        return [actionControlObject, actionIndex];        
    }

    // Method that displays text in the message box
    messageBoxText(resolve) {
        const text = this.event.text;
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = text;
        window[this.event.animation](messageBox);
        resolve();
    }

    // Update status of player
    updateStatus(resolve) {
        const text = this.event.text;
        const statusElement = document.querySelector("#current-status-effect");
        statusElement.innerText = text;
        window[this.event.animation](statusElement);
        resolve();
    }

    defend(resolve) {
        // Get the action data object for the event and initialise the defend() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        this.event.currentCombatant[actionMethod]();
        // Overwrite the current event and initialise the message box event to update the text
        this.event = {
            action: "messageBoxText",
            text: `${actionControlObject.text}`,
            animation: "text"
        }
        this.start(resolve);
        // Handle updating the status bar
        this.event = {
            action: "updateStatus",
            text: `Current Status Effect: ${actionControlObject.statusOnComplete}`,
            animation: "rubberBand"
        }
        this.start(resolve);
        // Handle the animation
        const playerSprite = document.querySelector("#player")
        window[actionControlObject.animation](playerSprite);
        resolve();
    }
    // Remove defend status
    removeDefend(resolve) {
        this.battle.player.isDefending = false;
        // Handle updating the status bar
        this.event = {
            action: "updateStatus",
            text: `Current Status Effect: None`,
            animation: "rubberBand"
        }
        setTimeout(() => this.start(resolve), 2000);
    }

    swordAttack(resolve) {
        // Get the action data object for the event and initialise the defend() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        // // Handle the animation for attacking
        const playerSprite = document.querySelector("#player")
        window[actionControlObject.animation](playerSprite);
 
        // Overwrite the current event and initialise the message box event to update the text
        // Wait a second for the animation to resolve
        this.event = {
            action: "messageBoxText",
            text: attackResult[0] ? `${actionControlObject.success}` : `${actionControlObject.failure}`,
            animation: "text"
        }
        setTimeout(() => this.start(resolve), 1200);

        //Handle the state change for a hit
        // Handle the animation for a hit
        if (attackResult[0] === true) {
            console.log("Before Hit: ", attackTarget)
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
            console.log("After Hit: ", attackTarget)
            const targetSprite = document.querySelector(`#${attackTarget.location}`);
            setTimeout(() => window["flash"](targetSprite), 1200);
            // Check if the target is dead, if so, do death animation
            if (attackTarget.isAlive === false) {
                const targetSprite = document.querySelector(`#${attackTarget.location}`);
                setTimeout(() => window["death"](targetSprite), 1500);
            }
        }
        resolve();
    }
    // Enemy basic attack
    basicAttack(resolve) {
        console.log("Enemy attacks")
        setTimeout(() => resolve(), 5000);
    }

    //Start the battle event
    start(resolve) {
        this[this.event.action](resolve);
    }
}