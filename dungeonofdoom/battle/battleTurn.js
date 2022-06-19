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
        if (currentCombatant.isAlive) {
            console.log(`Current turn: ${currentCombatant.type} ${this.currentTurnIndex}`)
            let currentCombatantTarget = this.battle.player;
            let action = "basicAttack";

            // If it is the player turn, build the available actions and listen for the choice, then submit to the battleTurnSubmission
            if (currentCombatant.type === "player") {
                console.log("Building initIal buttons")
                this.buildInitialPlayerActions();
                console.log("Updating buttons")
                this.updatePlayerActions();
                // Update the is defending status of the player
                if (this.battle.player.isDefending) {
                    const event = {
                    action: "removeDefend"
                    }
                    console.log("Waiting to update defend status")
                    await this.onNewEvent(event);
                    console.log("updated defend status")
                }
                console.log("Start player turn message started")
                const messageBox = document.querySelector("#message-box");
                messageBox.innerText = "Select an action";
                await window["text"](messageBox);
                console.log("Start player turn message resolved")
                console.log("Waiting for player input")
                const result = await this.playerAction();
                currentCombatantTarget = result[0];
                action = result[1];
            }

            const event = {
                currentCombatant: currentCombatant,
                currentCombatantTarget: currentCombatantTarget,
                action: action
            }
            await this.onNewEvent(event);
        }
        // Set the turn counter to the next object in the battle order
        if (this.currentTurnIndex < this.turnOrder.length - 1) {
            this.currentTurnIndex++;
        } else {
            this.currentTurnIndex = 0;
        }

        // Rerun the turn for the next player
        // Set a small timeout so that the animations fire correctly
        setTimeout(() => this.turn(), 1000);
    }
    buildInitialPlayerActions() {
        const controlPanel = document.querySelector("#control-panel");
        // Create an array of enemies
        const enemies = this.battle.enemies;
        // Create available actions based on player actions
        const actions = this.battle.player.actions;
        for (let action of actions) {
            if (action.type === "attack") {
                let enemyNumber = 1;
                for (let enemy of enemies) {
                    const button = document.createElement("button");
                    button.innerText = `${action.name} ${enemy.name} ${enemyNumber}`;
                    button.setAttribute("id", `attack-enemy-${enemyNumber}`);
                    enemy.buttonRef = `attack-enemy-${enemyNumber}`;
                    enemy.numberRef = `${enemyNumber}`;
                    controlPanel.append(button);
                    enemyNumber++;
                }
            }
            if (action.type === "utility" && action.id !== "health-potion") {
                const button = document.createElement("button");
                button.innerText = action.name;
                button.setAttribute("id", action.id);
                controlPanel.append(button);
            }
            if (action.id === "health-potion") {
                if (this.battle.player.currentHItPoints < this.battle.player.totalHitPoints && this.battle.player.potions > 0) {
                    const button = document.createElement("button");
                    button.innerText = action.name;
                    button.setAttribute("id", action.id);
                    controlPanel.append(button);
                }
            }
        }
    }
    
    updatePlayerActions() {
        // Clear any previous buttons
        const toClear = document.querySelectorAll("#control-panel button");
        for (let button of toClear) {
            button.remove();
        }
        const controlPanel = document.querySelector("#control-panel");
        // Create an array of enemies
        const enemies = this.battle.enemies;
        // Create available actions based on player actions
        const actions = this.battle.player.actions;
        // Create array of alive enemies
        const aliveEnemies = this.battle.enemies.filter(enemy => enemy.isAlive);
        // Create the buttons from the alive enemies
        for (let action of actions) {
            if (action.type === "attack") {
                for (let enemy of aliveEnemies) {
                    const button = document.createElement("button");
                    button.innerText = `${action.name} ${enemy.name} ${enemy.numberRef}`;
                    button.setAttribute("id", `${enemy.buttonRef}`);
                    controlPanel.append(button);
                }
            }
            if (action.type === "utility" && action.id !== "health-potion") {
                const button = document.createElement("button");
                button.innerText = action.name;
                button.setAttribute("id", action.id);
                controlPanel.append(button);
            }
            if (action.id === "health-potion") {
                if (this.battle.player.currentHItPoints < this.battle.player.totalHitPoints && this.battle.player.potions > 0) {
                    const button = document.createElement("button");
                    button.innerText = action.name;
                    button.setAttribute("id", action.id);
                    controlPanel.append(button);
                }
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
        console.log("Starting message started")
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = "The enemy approaches....";
        await window["text"](messageBox);
        console.log("Starting message resolved")
        // // Start the first turn
        // Set a small timeout so that the animations fire correctly
        setTimeout(() => this.turn(), 1000);
    }
}