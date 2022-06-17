class BattleTurn {
    constructor(battle, onNewEvent) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentCombatant = "player"; // Player starts
    }
    // Method that determines the actions completed in the turn
    async turn() {
        //Get the current active combatant
        const currentCombatant = this.battle[this.currentCombatant];
        // If it is the player turn, build the available actions
        if (this.currentCombatant === "player") {
            this.buildPlayerActions();
        }
        // const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
        // const enemy = this.battle.combatants[enemyId];
    
        // const submission = await this.onNewEvent({
        //   type: "submissionMenu",
        //   caster,
        //   enemy
        // })
        // const resultingEvents = submission.action.success;
        // for (let i=0; i<resultingEvents.length; i++) {
        //   const event = {
        //     ...resultingEvents[i],
        //     submission,
        //     action: submission.action,
        //     caster,
        //     target: submission.target,
        //   }
        //   await this.onNewEvent(event);
        // }
    
        // this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        // this.turn();
    }
    buildPlayerActions() {
        const controlPanel = document.querySelector("#control-panel");
        // Clear any previous buttons
        const toClear = document.querySelectorAll("#control-panel button");
        console.log(toClear);
        // Create an array of alive enemies
        console.log(this.battle.enemies);
        const aliveEnemies = this.battle.enemies.filter(enemy => {
            console.log("enemy.isAlive: ", enemy.isAlive);
            enemy.isAlive === true;
        })
        console.log("aliveEnemies: ", aliveEnemies);
        // Create available actions based on player actions
        const actions = this.battle.player.actions;
        for (let action of actions) {
            if (action.type === "attack") {
                let enemyNumber = 1;
                for (enemy of aliveEnemies) {
                    const button = document.createElement("button");
                    button.innerText = `${action.name} ${enemy.name} ${enemyNumber}`;
                    controlPanel.append(button);
                    enemyNumber++;
                }
            }
            if (action.type === "utility") {
                const button = document.createElement("button");
                button.innerText = action.name;
                controlPanel.append(button);
            }
        }
        // Create an array of alive enemies
    //     const aliveEnemies = this.battle.enemies.filter(enemy => {
    //         enemy.isAlive === true;
    //     })
    //     // Create a button for each alive enemy
    //     for (enemy of aliveEnemies) {
    //         let index = 1;
    //         const button = document.createElement("button");
    //         button.innerText = ``
    //     }
    }

    async start() {
        // await this.onNewEvent({
        //     type: "messageBoxText",
        //     text: "The enemy approaches....."
        // })
        // // Start the first turn
        this.turn();
    }
}