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
    // Battle log text push
    addBattleLog(text) {
        const logBodyUl = document.querySelector("#modal-battle-log-body ul");
        const li = document.createElement("li");
        li.innerText = text;
        logBodyUl.append(li);
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
        this.addBattleLog( actionControlObject.text);
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
        this.addBattleLog(actionControlObject.text);
        this.addBattleLog(successFailText);
        if (attackTarget.isAlive === false) {
            this.addBattleLog(attackTarget.deathText);
        }
        resolve();
        console.log("BattleEvent method: swordAttack resolved")
    }
    // Take potion
    async healthPotion(resolve) {
        console.log("BattleEvent method: healthPotion started")
        const actionControlArr = this.findAction(this.event.action);
        const actionControlObject = actionControlArr[0];
        const playerSprite = document.querySelector("#player");
        const lifeGained = this.battle.player.drinkPotion();
        await window[actionControlObject.animation](playerSprite, `${actionControlObject.text} ${lifeGained} hit points`, "#health-potions p", `${this.battle.player.potions}`, "#current-hit-points", `${this.battle.player.currentHitPoints}/${this.battle.player.totalHitPoints}`);
        this.addBattleLog(`${actionControlObject.text} ${lifeGained} hit points`);
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
        const playerSprite = document.querySelector("#player");
        const enemySprite = document.querySelector(`#${this.event.currentCombatant.location}`)
        if (attackResult[0]) {
            attackTarget.takeDamage(attackResult[1]);
            attackTarget.checkDeathStatus();
        }
        // Handle the animation
        const successFailText = attackResult[0] ? actionControlObject.success : actionControlObject.failure;
        const playerHP = `${Math.max(attackTarget.currentHitPoints, 0)}/${attackTarget.totalHitPoints}`
        console.log(this.event.currentCombatant.actions)
        await window[actionControlObject.animation](enemySprite, playerSprite, attackResult[0], actionControlObject.text, successFailText, attackTarget.isAlive, attackTarget.deathText, playerHP);
        this.addBattleLog(actionControlObject.text);
        this.addBattleLog(successFailText);
        if (attackTarget.isAlive === false) {
            this.addBattleLog(attackTarget.deathText);
        }
        resolve()
        console.log("BattleEvent method: basicAttack resolved")
    }
    //Start the battle event
    start(resolve) {
        const actionControlObject = this.findAction(this.event.action)[0]
        this[actionControlObject.methodId](resolve);
    }
}