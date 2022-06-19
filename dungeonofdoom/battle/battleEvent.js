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
    // Update text on screen methods
    // Method that displays text in the message box
    async messageBoxText(resolve) {
        const text = this.event.text;
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = text;
        await window[this.event.animation](messageBox);
        console.log("messageBoxText waiting to resolve")
        // messageBox.onanimationend = () => {
            resolve()
            console.log("messageBoxText resolved")
        // };
    }

    // Update status of player
    async updateStatus(resolve) {
        const text = this.event.text;
        const statusElement = document.querySelector("#current-status-effect");
        statusElement.innerText = text;
        await window[this.event.animation](statusElement);
        console.log("updateStatus waiting to resolve")
        resolve();
        console.log("updateStatus resolved")
    }

    // Player action methods

    async defend(resolve) {
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
        await window[actionControlObject.animation](playerSprite);
        console.log("defend waiting to resolve")
        // playerSprite.onanimationend = () => {
            resolve()
            console.log("defend resolved")
        // };
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
        console.log("removeDefend waiting to resolve")
        setTimeout(() => {
            this.start(resolve)
            console.log("removeDefend resolved")
        }, 1000);
    }

    async swordAttack(resolve) {
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        // // Handle the animation for attacking
        const playerSprite = document.querySelector("#player")
        await window[actionControlObject.animation](playerSprite);
 
        // Overwrite the current event and initialise the message box event to update the text
        // Wait a second for the animation to resolve
        this.event = {
            action: "messageBoxText",
            text: attackResult[0] ? `${actionControlObject.success}` : `${actionControlObject.failure}`,
            animation: "text"
        }
        this.start(resolve);

        //Handle the state change for a hit
        // Handle the animation for a hit
        if (attackResult[0] === true) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
            const targetSprite = document.querySelector(`#${attackTarget.location}`);
            await window["flash"](targetSprite);
            // Check if the target is dead, if so, do death animation
            if (attackTarget.isAlive === false) {
                const targetSprite = document.querySelector(`#${attackTarget.location}`);
                await window["death"](targetSprite);
            }
        }
        console.log("swordAttack waiting to resolve")
        // playerSprite.onanimationend = () => {
            resolve()
            console.log("swordAttack resolved")
        // };
        
    }
    // Enemy action methods
    // Enemy basic attack
    async basicAttack(resolve) {
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        // // Handle the animation for attacking
        const enemySprite = document.querySelector(`#${this.event.currentCombatant.location}`)
        await window[actionControlObject.animation](enemySprite);
        console.log("basicAttack waiting to resolve")
        // enemySprite.onanimationend = () => {
        resolve()
        console.log("basicAttack resolved")
        // };
    }

    //Start the battle event
    start(resolve) {
        this[this.event.action](resolve);
    }
}