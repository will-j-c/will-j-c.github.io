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
    async addStatus(text, id) {
        console.log("BattleEvent method: updateStatus started")
        const currentStatusEffects = document.querySelector("#current-status-effect")
        const statusElement = document.createElement("li");
        statusElement.setAttribute("id", id);
        statusElement.innerText = text;
        console.log(statusElement)
        currentStatusEffects.append(statusElement);
        await window["text"](statusElement);
        console.log("BattleEvent method: updateStatus resolved")
    }
    // Update health bar of player
    async updatePlayerHealth() {
        console.log("BattleEvent method: updatePlayerHealth started")
        const hpElement = document.querySelector("#current-hit-points");
        hpElement.innerText = `${this.battle.player.currentHitPoints}/${this.battle.player.totalHitPoints}`;
        await window["text"](hpElement);
        console.log("BattleEvent method: updatePlayerHealth resolved")
    }
    // Update potion stock of player
    async updatePlayerPotions() {
        console.log("BattleEvent method: updatePlayerPotions started")
        const healthPotionsElement = document.querySelector("#current-health-potions");
        healthPotionsElement.innerText = `Health Potions: ${this.battle.player.potions}`
        await window["text"](healthPotionsElement);
        console.log("BattleEvent method: updatePlayerPotions resolved")
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
        await this.addStatus(actionControlObject.name, actionControlObject.id);
        resolve()
        console.log("BattleEvent method: defend resolved");
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
    // Take potion
    async healthPotion(resolve) {
        console.log("BattleEvent method: healthPotion started")
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const lifeGained = this.battle.player.drinkPotion();
        await this.updatePlayerPotions();
        await this.messageBoxText(`${actionControlObject.text} ${lifeGained} hit points`);
        await this.updatePlayerHealth();
        resolve();
        console.log("BattleEvent method: healthPotion resolved")
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
            await this.updatePlayerHealth();
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
        const actionControlObject = this.findAction(this.event.action)[0]
        this[actionControlObject.methodId](resolve);
    }
}