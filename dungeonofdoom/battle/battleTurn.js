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
                // this.updatePlayerActions();
                this.showButtons();
                console.log(`Player defending status: ${this.battle.player.isDefending}`)
                console.log("Waiting to update status effects")
                this.updateStatusEffects();
                console.log("Status effects updated");
                console.log(`Player defending status: ${this.battle.player.isDefending}`)
                console.log("Start player turn message started")
                updateText("#message-box", "Select an action")
                console.log("Start player turn message resolved")
                console.log("Waiting for player input")
                const result = await this.playerAction();
                if (result[0] === "target") {
                    console.log("Waiting for target selection")
                    result[0] = await this.playerTarget();
                }
                console.log(result)
                this.hideButtons();
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
        // Check if the battle is over over
        this.checkIsOver();
        // If the battle is over
        if (this.battle.isOver) {
            if (this.battle.player.isAlive) {
                this.battle.onEnd("proceed");
            } else {
                this.battle.onEnd("dead");
            }
        } else {
            // Rerun the turn for the next player
            // Set a small timeout so that the animations fire correctly
            setTimeout(() => this.turn(), 1000);
        }
    }
    buildInitialPlayerActions() {
        // Clear any previous buttons
        const toClear = document.querySelectorAll("#control-panel button");
        for (let button of toClear) {
            button.remove();
        }
        // Create available actions based on player actions
        const actions = this.battle.player.actions;
        for (let action of actions) {
            if (action.type === "attack") {
                console.log(action.name)
                const attackButtons = document.querySelector("#attack-buttons");
                    const button = document.createElement("button");
                    button.innerText = `${action.name}`;
                    button.setAttribute("id", `${action.id}`);
                    button.setAttribute("class", "btn col-4");

                    attackButtons.append(button);
            }
            if (action.type === "utility" && action.id !== "health-potion") {
                console.log(action.name)
                const abilityButtons = document.querySelector("#ability-buttons");
                const button = document.createElement("button");
                button.innerText = action.name;
                button.setAttribute("id", action.id);
                button.setAttribute("class", "btn col-4");
                abilityButtons.append(button);
            }
            if (action.id === "health-potion") {
                if (this.battle.player.currentHitPoints < this.battle.player.totalHitPoints && this.battle.player.potions > 0) {
                    console.log(action.name)
                    const abilityButtons = document.querySelector("#consumable-buttons");
                    const button = document.createElement("button");
                    button.innerText = action.name;
                    button.setAttribute("id", action.id);
                    button.setAttribute("class", "btn col-4");
                    abilityButtons.append(button);
                }
            }
        }
    }

    buildTargetActionButtons() {
        // Clear any previous buttons
        const toClear = document.querySelectorAll("#control-panel button");
        for (let button of toClear) {
            button.remove();
        }
        // Create array of alive enemies
        const aliveEnemies = this.battle.enemies.filter(enemy => enemy.isAlive);
        for (let i = 0, len = aliveEnemies.length; i < len; i++) {
            const attackButtons = document.querySelector("#attack-buttons");
            const button = document.createElement("button");
            button.innerText = `${aliveEnemies[i].name} ${i + 1}`;
            button.setAttribute("id", `enemy-${i+1}`);
            button.setAttribute("class", "btn col");
            aliveEnemies[i].buttonRef = button.id;
            attackButtons.append(button);
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
                    return;
                }
            const attackIdArr = this.battle.player.actions.map(action => action.id);
            if (attackIdArr.some(id => id === event.target.id)) {
                this.buildTargetActionButtons();
                console.log("Built target buttons")
                resolve(["target",event.target.id]);
            }
        }
        }) 
    }
    playerTarget() {
        return new Promise(resolve => {
            const aliveEnemies = this.battle.enemies.filter(enemy => enemy.isAlive);
            const controlPanel = document.querySelector("#control-panel");
            controlPanel.onclick = event => {
                if(event.target.tagName !== "BUTTON") {
                    this.playerTarget();
                }
                const target = event.target.id;
                const targetEnemy = aliveEnemies.filter(enemy => enemy.buttonRef === target)[0];
                resolve(targetEnemy);
            }
        }) 
    }
    // Check to see if the battle is over
    checkIsOver() {
        console.log(`Player Alive: ${this.battle.player.isAlive}`)
        if (this.battle.player.isAlive === false) {
            this.battle.isOver = true;
        }
        console.log(`All enemies dead: ${this.battle.enemies.every(enemy => enemy.isAlive === false)}`)
        if (this.battle.enemies.every(enemy => enemy.isAlive === false)) {
            this.battle.isOver = true;
        }
        console.log(`Battle over: ${this.battle.isOver}`)
    }
    // Update status effects
    async updateStatusEffects() {
        if (this.battle.player.isDefending) {
            this.battle.player.isDefending = false;
            const defendLi = document.querySelector("#defend-status");
            await updateText("#defend-status", "");
            defendLi.remove();
        }
    }
    // Hide buttons
    hideButtons() {
        const buttonPanel = document.querySelector("#buttons-panel");
        buttonPanel.style.display = "none";
    }
    // Show buttons
    showButtons() {
        const buttonPanel = document.querySelector("#buttons-panel");
        buttonPanel.style.display = "initial";
    }
    // Start the turn event
    async start() {
        // Push battle enemies into the turn order
        for (let enemy of this.battle.enemies) {
            this.turnOrder.push(enemy);
        }
        console.log("Starting message started")
        updateText("#message-box", "The enemy approaches....")
        console.log("Starting message resolved")
        // // Start the first turn
        // Set a small timeout so that the animations fire correctly
        setTimeout(() => this.turn(), 1000);
    }
}