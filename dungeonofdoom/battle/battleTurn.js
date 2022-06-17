class BattleTurn {
    constructor(battle, onNewEvent) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.turnOrder = [this.battle.player];
    }
    // Method that determines the actions completed in the turn
    async turn() {
        //Get the current active combatant
        let currentIndex = 0;
        const currentCombatant = this.turnOrder[currentIndex];
        let currentCombatantTarget = this.battle.player;
        // If it is the player turn, build the available actions and listen for the choice, then submit to the battleTurnSubmission
        if (currentCombatant.type === "player") {
            this.buildPlayerActions();
            const controlPanel = document.querySelector("#control-panel");
            currentCombatantTarget = await this.playerAction();
            console.log(currentCombatantTarget);
        }
            
        const submission = await this.onNewEvent({
        type: "submission",
        currentCombatant,
        currentCombatantTarget
        })
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
    
       if (currentIndex < this.turnOrder) {
        currentIndex++;
       } else {
        currentIndex = 0;
       }
        // this.turn();
    }
    buildPlayerActions() {
        const controlPanel = document.querySelector("#control-panel");
        // Clear any previous buttons
        const toClear = document.querySelectorAll("#control-panel button");
        for (let button of toClear) {
            button.remove();
        }
        // Create an array of alive enemies
        const aliveEnemies = this.battle.enemies.filter(enemy => enemy.isAlive);
        // Create available actions based on player actions
        const actions = this.battle.player.actions;
        for (let action of actions) {
            if (action.type === "attack") {
                let enemyNumber = 1;
                for (let enemy of aliveEnemies) {
                    const button = document.createElement("button");
                    button.innerText = `${action.name} ${enemy.name} ${enemyNumber}`;
                    button.setAttribute("id", `attack-enemy-${enemyNumber}`);
                    controlPanel.append(button);
                    enemyNumber++;
                }
            }
            if (action.type === "utility") {
                const button = document.createElement("button");
                button.innerText = action.name;
                button.setAttribute("id", action.id);
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
    playerAction() {
        return new Promise(resolve => {
            const controlPanel = document.querySelector("#control-panel");
            controlPanel.onclick = event => {
                if(event.target.tagName !== "BUTTON") {
                    this.playerAction();
                }
            const utilityIdArr = ["defend", "health-potion"];
                if (utilityIdArr.some(id => id === event.target.id)) {
                    resolve(this.battle.player);
                }
            const attacksIdArr = ["attack-enemy-1", "attack-enemy-2", "attack-enemy-3"]
            if (attacksIdArr.some(id => id === event.target.id)) {
                const index = event.target.id.replace(/^\D+/g, '');
                resolve(this.turnOrder[index]);
            }
        }
        }) 
    }

    async start() {
        // Push battle enemies into the turn order
        for (let enemy of this.battle.enemies) {
            this.turnOrder.push(enemy);
        }
        // await this.onNewEvent({
        //     type: "messageBoxText",
        //     text: "The enemy approaches....."
        // })
        // // Start the first turn
        this.turn();
    }
}