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
    async messageBoxText(text) {
        console.log("BattleEvent method: messageBoxText started")
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = text;
        await window["text"](messageBox);
        console.log("BattleEvent method: messageBoxText resolved")
    }

    // Update status of player
    async updateStatus(text) {
        console.log("BattleEvent method: updateStatus started")
        const statusElement = document.querySelector("#current-status-effect");
        statusElement.innerText = text;
        await window["text"](statusElement);
        console.log("BattleEvent method: updateStatus resolved")
    }

    // Player action methods
    async defend(resolve) {
        console.log("BattleEvent method: defend started")
        // Get the action data object for the event and initialise the defend() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        this.event.currentCombatant[actionMethod]();
        // Update the text in the message box
        await this.messageBoxText(`${actionControlObject.text}`)
        // Handle the animation
        const playerSprite = document.querySelector("#player")
        await window[actionControlObject.animation](playerSprite);
        // Handle updating the status bar
        await this.updateStatus(`Current Status Effect: ${actionControlObject.statusOnComplete}`);
        resolve()
        console.log("BattleEvent method: defend resolved")
    }
    // Remove defend status
    async removeDefend(resolve) {
        console.log("BattleEvent method: removeDefend started")
        this.battle.player.isDefending = false;
        // Handle updating the status bar
        await this.updateStatus(`Current Status Effect: None`);
        resolve();
        console.log("BattleEvent method: removeDefend resolved")
    }

    async swordAttack(resolve) {
        console.log("BattleEvent method: swordAttack started")
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        // Update the text in the message box
        await this.messageBoxText(`${actionControlObject.text}`);
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        // // Handle the animation for attacking
        const playerSprite = document.querySelector("#player")
        await window[actionControlObject.animation](playerSprite);
        //Handle the state change for a hit
        // Handle the animation for a hit
        if (attackResult[0] === true) {
            attackTarget.takeDamage(attackResult[1]);
            // Testing method
            this.enemyHealthPUpdate(`${attackTarget.p}`, attackTarget);
            //
            attackTarget.checkDeathStatus();
            const targetSprite = document.querySelector(`#${attackTarget.location}`);
            await window["flash"](targetSprite);
            await this.messageBoxText(`${actionControlObject.success}`);
            // Check if the target is dead, if so, do death animation
            if (attackTarget.isAlive === false) {
                const targetSprite = document.querySelector(`#${attackTarget.location}`);
                await window["death"](targetSprite);
            }
        } else {
            await this.messageBoxText(`${actionControlObject.failure}`);
        }
        resolve()
        console.log("BattleEvent method: swordAttack resolved")
    }
    // Enemy action methods
    // Enemy basic attack
    async basicAttack(resolve) {
        console.log("BattleEvent method: basicAttack started")
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        // Update the text in the message box
        await this.messageBoxText(`${actionControlObject.text}`);
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        // // Handle the animation for attacking
        const enemySprite = document.querySelector(`#${this.event.currentCombatant.location}`)
        await window[actionControlObject.animation](enemySprite);
        if (attackResult[0]) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
            const targetSprite = document.querySelector(`#player`);
            await window["flash"](targetSprite);
            await this.messageBoxText(`${actionControlObject.success}`);
            // Check if the target is dead, if so, do death animation
            if (attackTarget.isAlive === false) {
                const targetSprite = document.querySelector(`#player`);
                await window["death"](targetSprite);
            }
        } else {
            await this.messageBoxText(`${actionControlObject.failure}`);
        }
        resolve()
        console.log("BattleEvent method: basicAttack resolved")
    }
    // Testing methods
    enemyHealthPUpdate(pId, enemy) {
        const p = document.querySelector(`#${pId}`)
        p.innerText = `${enemy.currentHitPoints}/${enemy.totalHitPoints}`;
    }
    //Start the battle event
    start(resolve) {
        this[this.event.action](resolve);
    }
}