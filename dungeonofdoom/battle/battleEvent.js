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

    // Player action methods
    async defend(resolve) {
        console.log("BattleEvent method: defend started")
        // Get the action data object for the event and initialise the defend() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        this.event.currentCombatant[actionMethod]();
        const statusEffect = document.createElement("li");
        statusEffect.setAttribute("id", "defend-status");
        document.querySelector("#current-status-effect").append(statusEffect);
        const playerSprite = document.querySelector("#player")
        console.log(statusEffect)
        await window[actionControlObject.animation](playerSprite, actionControlObject.text, "#defend-status", actionControlObject.statusOnComplete);
        resolve()
        console.log("BattleEvent method: defend resolved");
    }

    async stabAttack(resolve) {
        console.log("BattleEvent method: swordAttack started")
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionMethod = actionControlObject.action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        const playerSprite = document.querySelector("#player");
        const targetSprite = document.querySelector(`#${attackTarget.location}`);
        //Handle the state change for a hit
        if (attackResult[0] === true) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
        }
        // Handle the animation
        const successFailText = attackResult[0] ? actionControlObject.success : actionControlObject.failure;
        await window[actionControlObject.animation](playerSprite, targetSprite, attackResult[0], actionControlObject.text, successFailText, attackTarget.isAlive, attackTarget.deathText);
        resolve()
        console.log("BattleEvent method: swordAttack resolved")
    }
    // Take potion
    async healthPotion(resolve) {
        console.log("BattleEvent method: healthPotion started")
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const playerSprite = document.querySelector("#player");
        const lifeGained = this.battle.player.drinkPotion();
        await window[actionControlObject.animation](playerSprite, `${actionControlObject.text} ${lifeGained}`, "#health-potions p", `${this.battle.player.potions}`, "#current-hit-points", `${this.battle.player.currentHitPoints}/${this.battle.player.totalHitPoints}`);
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
        const actionControlIndex = actionControlArr[1];
        const actionMethod = this.event.currentCombatant.actions[actionControlIndex].action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        const enemySprite = document.querySelector(`#${this.event.currentCombatant.location}`)
        if (attackResult[0]) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
            const targetSprite = document.querySelector(`#player`);
            if (attackTarget.isAlive === false) {
                const targetSprite = document.querySelector(`#player`);
            }
        }
        // Handle the animation
        //
        resolve()
        console.log("BattleEvent method: basicAttack resolved")
    }
    //Start the battle event
    start(resolve) {
        const actionControlObject = this.findAction(this.event.action)[0]
        this[actionControlObject.methodId](resolve);
    }
}