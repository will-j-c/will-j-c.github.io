class BattleTurn {
    constructor({battle, onNewEvent}) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.turnOrder = [this.battle.player];
        this.currentTurnIndex = 0;
    }
    // Method that determines the actions completed in the turn
    async turn() {
        //Get the current active combatant
        const currentCombatant = this.turnOrder[this.currentTurnIndex];
        let currentCombatantTarget = this.battle.player;
        let action = "basicAttack";

        // If it is the player turn, build the available actions and listen for the choice, then submit to the battleTurnSubmission
        if (currentCombatant.type === "player") {
            this.buildPlayerActions();
            const controlPanel = document.querySelector("#control-panel");
            console.log("Waiting")
            const result = await this.playerAction();
            currentCombatantTarget = result[0];
            action = result[1];
        }
       
        const event = {
            currentCombatant: currentCombatant,
            currentCombatantTarget: currentCombatantTarget,
            action: action
        }
        console.log("Waiting 2")
        await this.onNewEvent(event);

        // Set the turn counter to the next object in the battle order
        console.log(this.turnOrder) 
        console.log(this.turnOrder.length) 
        if (this.currentTurnIndex < this.turnOrder.length - 1) {
            this.currentTurnIndex++;
        } else {
            this.currentTurnIndex = 0;
        }
        
        
        console.log(this.currentTurnIndex)
        console.log(this.turnOrder[this.currentTurnIndex])
        // Rerun the turn for the next player
        this.turn();
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
    }
    // Method to return a promise that resolves when a player clicks the button for the action they want to take
    playerAction() {
        return new Promise(resolve => {
            const controlPanel = document.querySelector("#control-panel");
            controlPanel.onclick = event => {
                if(event.target.tagName !== "BUTTON") {
                    this.playerAction();
                }
            const utilityIdArr = ["defend", "health-potion"];
                if (utilityIdArr.some(id => id === event.target.id)) {
                    resolve([this.battle.player, event.target.id]);
                }
            const attacksIdArr = ["attack-enemy-1", "attack-enemy-2", "attack-enemy-3"]
            if (attacksIdArr.some(id => id === event.target.id)) {
                const index = event.target.id.replace(/^\D+/g, '');
                resolve([this.turnOrder[index], "swordAttack"]);
            }
        }
        }) 
    }
    // Start the turn event
    async start() {
        // Push battle enemies into the turn order
        for (let enemy of this.battle.enemies) {
            this.turnOrder.push(enemy);
        }
        await this.onNewEvent({
            action: "messageBoxText",
            text: "The enemy approaches.....",
            animation: "text"
        })
        // // Start the first turn
        this.turn();
    }
}