//Import Mob to be used in the battle
import { Mob } from "./mob.js";

//Import the initialised instance of the window controls
import { controls } from "./windowControls.js";

// Initiate a battle class. This will encapsulate all logic around a battle.
class Battle {
    constructor(player, frontMonster, numFrontMonster, backMonster, numBackMonster) {
        this.player = player; //The current instance of the player object within Game
        this.mob = new Mob(frontMonster, numFrontMonster, backMonster, numBackMonster);
        this.isOver = false;
    }
    // The below method is called to launch a new battle and run the whole logic for the battle.
    async battleSequence() {
        this.buildBattlefield();
        controls.currentHitPoints(this.player.currentHitPoints, this.player.totalHitPoints);
        while(this.isOver === false) {
            this.buildActionButtons();
            this.player.isDefending = false;
            console.log("Awaiting player click")
            controls.getMessageBox().innerText = "Choose an action";
            await this.awaitPlayerTurn();
            console.log(this.isOver)
            if (this.isOver) {
                break;
            }
            controls.resetControlPanelDiv();
            console.log("resetting controls")
            console.log("Waiting for enemy turn")
            await this.enemyTurn();
            console.log(this.isOver)
            console.log("Enemy turn")
        }
        console.log("BATTLE OVER");
    }
    // Method that returns a promise so the loop delays until the player chooses an action
    awaitPlayerTurn() {
        const controlPanel = document.querySelector("#control-panel");
        return new Promise(resolve => {
            function handleClick() {
                resolve();
            }
            controlPanel.onclick = event => {
                this.playerTurn(event);
                handleClick();
            }
        })
    }

    playerTurn(event) {
        if (event.target.id === "control-panel") {
            controls.resetControlPanelDiv();
            return;
        }
        const playerAction = String(event.target.id);
        if (playerAction === "defend") {
            this.player.defend();
            const message = "You are defending!";
            controls.message(message);
            controls.addItemToBattleLog(message);
            controls.resetControlPanelDiv();
            return;
        }
        if (playerAction === "take-potion") {
            const lifeGain = this.player.drinkPotion();
            const message = `You drank a potions and gained ${lifeGain} hit points`;
            controls.currentHitPoints(this.player.currentHitPoints, this.player.totalHitPoints);
            controls.message(message);
            controls.addItemToBattleLog(message);
            controls.resetControlPanelDiv();
            return;
        }
        const attackStatus = this.player.attack()
        if (attackStatus[0] === false) {
            const message = "You missed your target!";
            controls.message(message);
            controls.addItemToBattleLog(message);
            controls.resetControlPanelDiv();
            return;
        }
        const frontTargetMap = this.mapButtonsToFrontRank(this.mob.frontRank);
        const backTargetMap = this.mapButtonsToBackRank(this.mob.backRank);
        let target = "";
        let targetTileId = "";
        const message = "You hit the target!";
        controls.message(message);
        controls.addItemToBattleLog(message);
        switch(playerAction) {   
            case "front-enemy-1-square":
                targetTileId = frontTargetMap["front-enemy-1-square"];
                target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
            case "front-enemy-2-square":
                targetTileId = frontTargetMap["front-enemy-2-square"];
                target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
            case "front-enemy-3-square":
                targetTileId = frontTargetMap["front-enemy-3-square"];
                target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
            case "back-enemy-1-square":
                targetTileId = backTargetMap["back-enemy-1-square"];
                target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
            case "back-enemy-2-square":
                targetTileId = backTargetMap["back-enemy-2-square"];
                target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
            case "back-enemy-3-square":
                targetTileId = backTargetMap["back-enemy-3-square"];
                target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
                target.takeDamage(attackStatus[1]);
                target.checkDeathStatus();
                if (target.isAlive === false) {
                    controls.deathAnimation(targetTileId);
                }
                break;
        }
        this.battleOver();
        if (this.isOver) {
            setTimeout(this.endBattleMessage(true), 5000);
            return;
        }
    }
    // Method that sets the logic for the enemy turn
    async enemyTurn() {
        // Determine which enemies are alive
        const frontRankAlive = this.mob.frontRank.filter(enemy => enemy.isAlive);
        const backRankAlive = this.mob.backRank.filter(enemy => enemy.isAlive);
        frontRankAlive.forEach(async enemy => {
            controls.getMessageBox.innerText = `A ${enemy.name} used ${enemy.basicAttackName}`
            const basicAttackResult = enemy.basicAttack()
            if (basicAttackResult[0]) {
                const damage = this.player.takeDamage(basicAttackResult[1]);
                const message = `You are hit! You lost ${damage} hit points!`
                controls.message(message);
                controls.addItemToBattleLog(message);
                this.player.checkDeathStatus();
                this.battleOver();
                await this.continue();
            }
            const message = `The ${enemy.name} missed with their ${enemy.basicAttackName}`;
            await this.continue();
        })
        backRankAlive.forEach(async enemy => {
            controls.getMessageBox.innerText = `A ${enemy.name} used ${enemy.basicAttackName}`
            const basicAttackResult = enemy.basicAttack()
            if (basicAttackResult[0]) {
                const damage = this.player.takeDamage(basicAttackResult[1]);
                const message = `You are hit! You lost ${damage} hit points!`
                controls.message(message);
                controls.addItemToBattleLog(message);
                controls.message(message);
                controls.addItemToBattleLog(message);
                this.player.checkDeathStatus();
                this.battleOver();
                await this.continue();
                console.log("Waiting to continue")
            }
            const message = `The ${enemy.name} missed with their ${enemy.basicAttackName}`
            controls.message(message);
            controls.addItemToBattleLog(message);
            console.log("Waiting to continue")
            await this.continue();
            console.log("Waiting to continue")
        })
    }
    continue() {
        const controlPanel = document.querySelector("#control-panel");
        controlPanel.innerHTML ==- "";
        const continueButton = document.createElement("button");
        controlPanel.append(continueButton);
        return new Promise(resolve => {
            function handleClick() {
                resolve();
            }
            continueButton.onclick = () => {
                handleClick();
                continueButton.remove();
            }
        })
    }
    // Check if the battle is over and update the status of the battle if it is
    battleOver() {
        // Determine if the player is dead
        if (this.player.isAlive === false) {
            this.isOver = true;
            return;
        }
        // Determine if all the monsters in the mob are dead
        const frontRankAlive = this.mob.frontRank.some(element => element.isAlive);
        const backRankAlive = this.mob.backRank.some(element => element.isAlive);
        if (frontRankAlive === false && backRankAlive === false) {
            this.isOver = true;
            return;
        }
    }
    // Display a message to the screen when the battle is over. Take a boolean - true if player wins, false if otherwise.
    endBattleMessage(result) {
        const messageBox = controls.getMessageBox();
        if (result) {
            messageBox.innerText = "You defeated the enemies"
        } else {
            messageBox.innerText = "You died"
        }   
    }
    quitBattle() {
        //
    }
    // Method that adds the divs for the game board. Grid is 6x5 and adds a co-ordinate for each box. Grid also adds art for the enemies.
    buildBattlefield() {
        controls.createBattleFieldGrid()
        // Add the initial player art to the board
        const playerStartTile = controls.getSquare("#col-3-2");
        const playerImg = document.createElement("img")
        const playerImgAttributes = {
                    id: "player-img", 
                    src: this.player.artwork
                };
        //Set the attributes for the player
        for (const attribute in playerImgAttributes) {
            playerImg.setAttribute(`${attribute}`, `${playerImgAttributes[attribute]}`)
        }
        playerStartTile.append(playerImg);
        // Add the initial enemies to the board
        // Set the particulars about the current enemy setup
        const frontRankTiles = ["col-2-4", "col-3-4", "col-4-4"];
        const backRankTiles = ["col-2-5", "col-3-5", "col-4-5"];
        const frontRankLen = this.mob.frontRank.length;
        const backRankLen = this.mob.backRank.length;
        // Determine how many enemies in the rank and place the enemies according to this
        switch(frontRankLen) {
            case 3:
                this.mob.frontRank.forEach((enemy, index) => {
                    const enemyImg = document.createElement("img")
                    const enemyImgAttributes = {
                            id: `fr-enemy-${index + 1}-img`, 
                            src: enemy.artwork
                        };
                    enemy.placement = `#${frontRankTiles[index]}`;
                    for (const attribute in enemyImgAttributes) {
                        enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                    }
                    const tile = document.querySelector(`#${frontRankTiles[index]}`);
                    tile.append(enemyImg);
                })
                break;
            case 2:
                this.mob.frontRank.forEach((enemy, index) => {
                    const enemyImg = document.createElement("img")
                    const enemyImgAttributes = {
                            id: `fr-enemy-${index + 1}-img`, 
                            src: enemy.artwork
                        };
                    enemy.placement = `#${frontRankTiles[index]}`;
                    for (const attribute in enemyImgAttributes) {
                        enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                    }
                    const tile = document.querySelector(`#${frontRankTiles[index]}`);
                    tile.append(enemyImg);
                })
                break;
            case 1:
                const enemyImg = document.createElement("img")
                const enemyImgAttributes = {
                            id: `fr-enemy-1-img`, 
                            src: this.mob.frontRank[0].artwork
                        };
                this.mob.frontRank[0].placement = `#${frontRankTiles[1]}`;
                for (const attribute in enemyImgAttributes) {
                    enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                }
                const tile = document.querySelector(`#${frontRankTiles[1]}`);
                tile.append(enemyImg);
                break;
            case 0:
                break;
        }
        switch(backRankLen) {
            case 3:
                this.mob.backRank.forEach((enemy, index) => {
                    const enemyImg = document.createElement("img")
                    const enemyImgAttributes = {
                            id: `fr-enemy-${index + 1}-img`, 
                            src: enemy.artwork
                        };
                    enemy.placement = `#${backRankTiles[index]}`;
                    for (const attribute in enemyImgAttributes) {
                        enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                    }
                    const tile = document.querySelector(`#${backRankTiles[index]}`);
                    tile.append(enemyImg);
                })
                break;
            case 2:
                this.mob.backRank.forEach((enemy, index) => {
                    console.log(enemy)
                    const enemyImg = document.createElement("img")
                    const enemyImgAttributes = {
                            id: `fr-enemy-${index + 1}-img`, 
                            src: enemy.artwork
                        };
                    enemy.placement = `#${backRankTiles[index]}`;
                    for (const attribute in enemyImgAttributes) {
                        enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                    }
                    const tile = document.querySelector(`#${backRankTiles[index]}`);
                    tile.append(enemyImg);
                })
                break;
            case 1:
                const enemyImg = document.createElement("img")
                const enemyImgAttributes = {
                            id: `fr-enemy-1-img`, 
                            src: this.mob.backRank[0].artwork
                        };
                this.mob.backRank[0].placement = `#${backRankTiles[1]}`;
                for (const attribute in enemyImgAttributes) {
                    enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                }
                const tile = document.querySelector(`#${backRankTiles[1]}`);
                tile.append(enemyImg);
                break;
            case 0:
                break;
        }
    }
    // Method determines the available actions of the player and add relevant buttons to the DOM for that action
    buildActionButtons() {
        const controlPanel = controls.getControlPanelDiv();
        //Create buttons to attack viable targets. Can only attack the front rank if it is still alive
        if (this.mob.frontRank.some(enemy => enemy.isAlive === true)) {
            this.mob.frontRank.forEach((enemy, index) => {
                if (enemy.isAlive) {
                    const attackButton = controls.createButton(`Attack front ${enemy.name} ${index + 1}`, `front-enemy-${index + 1}-square`);
                    controlPanel.append(attackButton);
                }
            })
        } else {
            this.mob.backRank.forEach((enemy, index) => {
                if (enemy.isAlive) {
                    const attackButton = controls.createButton(`Attack back ${enemy.name} ${index + 1}`, `back-enemy-${index + 1}-square`);
                    controlPanel.append(attackButton);
                }
            })
        }
        // Creates the button to defend
        const defendButton = controls.createButton("Defend", "defend");
        controlPanel.append(defendButton);
        // Allow the potion action if player has potions. Creates a take potion button and appends to the control panel
        if (this.player.potions > 0 && this.player.currentHitPoints !== this.player.totalHitPoints) {
            const potionButton = controls.createButton("Take potion", "take-potion");
            controlPanel.append(potionButton);
        }
    }
    // Method to map buttons to tiles. Takes the rank array to mapp and it's position "front or "back"
    mapButtonsToFrontRank(rank) {
        const rankLen = rank.length;
        if (rankLen === 3) {
            return {
                "front-enemy-1-square": "#col-2-4",
                "front-enemy-2-square": "#col-3-4",
                "front-enemy-3-square": "#col-4-4" 
            }
        }
        if (rankLen === 2) {
            return {
                "front-enemy-1-square": "#col-2-4",
                "front-enemy-2-square": "#col-3-4",
            }
        }
        if (rankLen === 1) {
            return {
                "front-enemy-1-square": "#col-3-4",
            }
        }
    }
    mapButtonsToBackRank(rank) {
        const rankLen = rank.length;
        if (rankLen === 3) {
            return {
                "back-enemy-1-square": "#col-2-5",
                "back-enemy-2-square": "#col-3-5",
                "back-enemy-3-square": "#col-4-5" 
            }
        }
        if (rankLen === 2) {
            return {
                "back-enemy-1-square": "#col-2-5",
                "back-enemy-2-square": "#col-3-5",
            }
        }
        if (rankLen === 1) {
            return {
                "back-enemy-1-square": "#col-3-5",
            }
        }
    }
}

export { Battle };