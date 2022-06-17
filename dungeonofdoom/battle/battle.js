// Initiate a battle class. This will encapsulate all logic around a battle.
class Battle {
    constructor(player, enemy1, enemy2, enemy3) {
        this.player = new Player(); //The current instance of the player object within Game
        this.enemy1 = enemy1;
        this.enemy2 = enemy2;
        this.enemy3 = enemy3;
        this.isOver = false;
    }
    // The below method is called to launch a new battle and run the whole logic for the battle.
    start() {
        this.buildBattlefield();
    }
    // // Method that returns a promise so the loop delays until the player chooses an action
    // awaitPlayerTurn() {
    //     const controlPanel = document.querySelector("#control-panel");
    //     return new Promise(resolve => {
    //         function handleClick() {
    //             resolve();
    //         }
    //         controlPanel.onclick = event => {
    //             this.playerTurn(event);
    //             handleClick();
    //         }
    //     })
    // }

    // playerTurn(event) {
    //     if (event.target.id === "control-panel") {
    //         controls.resetControlPanelDiv();
    //         return;
    //     }
    //     const playerAction = String(event.target.id);
    //     if (playerAction === "defend") {
    //         this.player.defend();
    //         const message = "You are defending!";
    //         controls.message(message);
    //         controls.addItemToBattleLog(message);
    //         controls.resetControlPanelDiv();
    //         return;
    //     }
    //     if (playerAction === "take-potion") {
    //         const lifeGain = this.player.drinkPotion();
    //         const message = `You drank a potions and gained ${lifeGain} hit points`;
    //         controls.currentHitPoints(this.player.currentHitPoints, this.player.totalHitPoints);
    //         controls.message(message);
    //         controls.addItemToBattleLog(message);
    //         controls.resetControlPanelDiv();
    //         return;
    //     }
    //     const attackStatus = this.player.attack()
    //     if (attackStatus[0] === false) {
    //         const message = "You missed your target!";
    //         controls.message(message);
    //         controls.addItemToBattleLog(message);
    //         controls.resetControlPanelDiv();
    //         return;
    //     }
    //     const frontTargetMap = this.mapButtonsToFrontRank(this.mob.frontRank);
    //     const backTargetMap = this.mapButtonsToBackRank(this.mob.backRank);
    //     let target = "";
    //     let targetTileId = "";
    //     const message = "You hit the target!";
    //     controls.message(message);
    //     controls.addItemToBattleLog(message);
    //     switch(playerAction) {   
    //         case "front-enemy-1-square":
    //             targetTileId = frontTargetMap["front-enemy-1-square"];
    //             target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //         case "front-enemy-2-square":
    //             targetTileId = frontTargetMap["front-enemy-2-square"];
    //             target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //         case "front-enemy-3-square":
    //             targetTileId = frontTargetMap["front-enemy-3-square"];
    //             target = this.mob.frontRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //         case "back-enemy-1-square":
    //             targetTileId = backTargetMap["back-enemy-1-square"];
    //             target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //         case "back-enemy-2-square":
    //             targetTileId = backTargetMap["back-enemy-2-square"];
    //             target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //         case "back-enemy-3-square":
    //             targetTileId = backTargetMap["back-enemy-3-square"];
    //             target = this.mob.backRank.filter(enemy => enemy.placement === targetTileId)[0];
    //             target.takeDamage(attackStatus[1]);
    //             target.checkDeathStatus();
    //             if (target.isAlive === false) {
    //                 controls.deathAnimation(targetTileId);
    //             }
    //             break;
    //     }
    //     this.battleOver();
    //     if (this.isOver) {
    //         setTimeout(this.endBattleMessage(true), 5000);
    //         return;
    //     }
    // }
    // // Method that sets the logic for the enemy turn
    // async enemyTurn() {
    //     // Determine which enemies are alive
    //     const frontRankAlive = this.mob.frontRank.filter(enemy => enemy.isAlive);
    //     const backRankAlive = this.mob.backRank.filter(enemy => enemy.isAlive);
    //     frontRankAlive.forEach(async enemy => {
    //         await controls.wait(5000);
    //         controls.getMessageBox.innerText = `A ${enemy.name} used ${enemy.basicAttackName}`
    //         const basicAttackResult = enemy.basicAttack()
    //         if (basicAttackResult[0]) {
    //             const damage = this.player.takeDamage(basicAttackResult[1]);
    //             const message = `You are hit! You lost ${damage} hit points!`
    //             controls.currentHitPoints(this.player.currentHitPoints, this.player.totalHitPoints);
    //             controls.message(message);
    //             controls.addItemToBattleLog(message);
    //             this.player.checkDeathStatus();
    //             this.battleOver();
    //             await controls.wait(5000);
    //         }
    //         const message = `The ${enemy.name} missed with their ${enemy.basicAttackName}`
    //         controls.message(message);
    //         controls.addItemToBattleLog(message);
    //         controls.message(message);
    //         await controls.wait(5000);
    //     })
    //     await controls.wait(5000);
    //     backRankAlive.forEach(async enemy => {
    //         await controls.wait(5000);
    //         controls.getMessageBox.innerText = `A ${enemy.name} used ${enemy.basicAttackName}`
    //         const basicAttackResult = enemy.basicAttack()
    //         if (basicAttackResult[0]) {
    //             const damage = this.player.takeDamage(basicAttackResult[1]);
    //             const message = `You are hit! You lost ${damage} hit points!`
    //             controls.currentHitPoints(this.player.currentHitPoints, this.player.totalHitPoints);
    //             controls.message(message);
    //             controls.addItemToBattleLog(message);
    //             this.player.checkDeathStatus();
    //             this.battleOver();
    //             await controls.wait(5000);
    //         }
    //         const message = `The ${enemy.name} missed with their ${enemy.basicAttackName}`
    //         controls.message(message);
    //         controls.addItemToBattleLog(message);
    //         console.log("Waiting to continue")
    //         await controls.wait(5000);
    //     })
    // }
    
    // // Check if the battle is over and update the status of the battle if it is
    // battleOver() {
    //     // Determine if the player is dead
    //     if (this.player.isAlive === false) {
    //         this.isOver = true;
    //         return;
    //     }
    //     // Determine if all the monsters in the mob are dead
    //     const frontRankAlive = this.mob.frontRank.some(element => element.isAlive);
    //     const backRankAlive = this.mob.backRank.some(element => element.isAlive);
    //     if (frontRankAlive === false && backRankAlive === false) {
    //         this.isOver = true;
    //         return;
    //     }
    // }
    // // Display a message to the screen when the battle is over. Take a boolean - true if player wins, false if otherwise.
    // endBattleMessage(result) {
    //     const messageBox = controls.getMessageBox();
    //     if (result) {
    //         messageBox.innerText = "You defeated the enemies"
    //     } else {
    //         messageBox.innerText = "You died"
    //     }   
    // }
    quitBattle() {
        //
    }
    // Method that adds the divs for the game board. Grid is 6x5 and adds a co-ordinate for each box. Grid also adds art for the enemies.
    buildBattlefield() {
        const playScreen = document.querySelector("#play-screen");
        // Create the bare skeleton of the battle screen
        playScreen.innerHTML = `
            <header class="row">
                <h1>Some battle controls go here</h1>
            </header>
            <main class="text-center">
                <div class="row">
                    <div class="col-3">
                        <h3>Battle Log<h3>
                        <ul id="battle-log"></ul>
                    </div>
                    <div id="battle-container" class="col-9">
                    </div>
                </div>
                <div class="row">
                    <h3 id="message-box"></h3>
                </div>
                <div class="row">
                    <div class="col m-3">
                        <h2>Health</h2>
                        <h3 id="current-hit-points"></h3>
                    </div>
                    <div class="col m-3" id="control-panel">
                    <h2>Actions<h2>
                    </div>
                </div>
            </main>`

        // Create the 5 rows with 3 columns and append them to the battle container
        const battleContainer = document.querySelector("#battle-container");
        for (let i = 1; i <= 5; i++) {
            const rowDiv = document.createElement("div");
            const rowDivAttributes = {
                        id: `row-${i}`,
                        class: "row"
                    };
            battleContainer.append(rowDiv);
            // Set the attributes for the rows
            for (const attribute in rowDivAttributes) {
                rowDiv.setAttribute(`${attribute}`, `${rowDivAttributes[attribute]}`);
            }
            // BUild the 3 columns, set their attributes and append to the row
            for (let j = 1; j <= 3; j++) {
                const colDiv = document.createElement("div");
                const colDivAttributes = {
                        id: `col-${i}-${j}`,
                        class: "col pt-3 pb-3 tile"
                    };
                //Set the attributes for the columns
                for (const attribute in colDivAttributes) {
                    colDiv.setAttribute(`${attribute}`, `${colDivAttributes[attribute]}`)
                }
                //Append the column to the row
                rowDiv.append(colDiv);
            }
        }
        // Add the player image to the battlefield
        const playerTile = document.querySelector("#col-3-1");
        const playerSprite = document.createElement("img");
        playerSprite.setAttribute("src", this.player.artwork);
        playerTile.append(playerSprite);  
    }
    // Method determines the available actions of the player and add relevant buttons to the DOM for that action
    buildActionButtons() {
        //
    }
}

const battle = new Battle();
battle.start();