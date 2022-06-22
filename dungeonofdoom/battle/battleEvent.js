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
        const playerSprite = document.querySelector("#player")
        resolve()
        console.log("BattleEvent method: defend resolved");
    }

    async swordAttack(resolve) {
        console.log("BattleEvent method: swordAttack started")
        // Get the action data object for the event and initialise the swordAttack() method on the player
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const actionMethod = actionControlObject.action;
        const attackResult = this.event.currentCombatant[actionMethod]();
        const attackTarget = this.event.currentCombatantTarget;
        const playerSprite = document.querySelector("#player")
        const targetSprite = document.querySelector(`#${attackTarget.location}`);
        //Handle the state change for a hit
        if (attackResult[0] === true) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
        }
        // Handle the animation
        resolve()
        console.log("BattleEvent method: swordAttack resolved")
    }
    // Take potion
    async healthPotion(resolve) {
        console.log("BattleEvent method: healthPotion started")
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const lifeGained = this.battle.player.drinkPotion();
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