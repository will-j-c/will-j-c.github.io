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
    battleSequence() {
        this.buildBattlefield();
        this.buildActionButtons();
        this.playerTurn();
        this.enemyTurn();
    }
    playerTurn() {
        // Display a message that it is the players turn
        const messageBox = controls.getMessageBox()
        this.player.isDefending = false;
        messageBox.innerText = "Choose an action"
        const controlPanel = document.querySelector("#control-panel");
        // Set event listener to listen for the button press. Need to use arrow function to inherit "this" from class
        controlPanel.onclick = event => {
            if (event.target.id === "control-panel") {
                return;
            }
            const playerAction = String(event.target.id);
            console.log(playerAction)
            if (playerAction === "defend") {
                this.player.defend();
                messageBox.innerText = "You are defending!"
                return;
            }
            if (playerAction === "take-potion") {
                this.player.drinkPotion();
                messageBox.innerText = "You drank a potion!"
                return;
            }
            const attackStatus = this.player.attack()
            if (attackStatus[0] === false) {
                messageBox.innerText = "You missed your target!"
                return;
            }
            let target = "";
            switch(playerAction) {   
                case "front-enemy-1-square":
                    target = this.mob.frontRank[0]
                    target.takeDamage(attackStatus[1]);
                    this. mob.frontRank[0].checkDeathStatus();
                    if (this.mob.frontRank[0].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-2-4`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
                case "front-enemy-2-square":
                    target = this.mob.frontRank[1]
                    target.takeDamage(attackStatus[1]);
                    this. mob.frontRank[1].checkDeathStatus();
                    if (this.mob.frontRank[1].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-3-4`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
                case "front-enemy-3-square":
                    target = this.mob.frontRank[2]
                    target.takeDamage(attackStatus[1]);
                    this. mob.frontRank[2].checkDeathStatus();
                    if (this.mob.frontRank[2].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-4-4`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
                case "back-enemy-1-square":
                    target = this.mob.backRank[0]
                    target.takeDamage(attackStatus[1]);
                    this. mob.backRank[0].checkDeathStatus();
                    if (this.mob.backRank[0].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-2-5`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
                case "back-enemy-2-square":
                    target = this.mob.backRank[1]
                    target.takeDamage(attackStatus[1]);
                    this. mob.backRank[1].checkDeathStatus();
                    if (this.mob.backRank[1].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-3-5`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
                case "back-enemy-3-square":
                    target = this.mob.backRank[2]
                    target.takeDamage(attackStatus[1]);
                    this. mob.backRank[2].checkDeathStatus();
                    if (this.mob.backRank[2].isAlive === false) {
                        const tileImg = controls.getSquare(`#col-4-5`).firstChild;
                        tileImg.classList.add("dead");
                        tileImg.addEventListener("animationend", () => {
                            tileImg.setAttribute("class", "hidden");
                        })
                    }
                    break;
            }
            this.battleOver();
            if (this.isOver) {
                setTimeout(this.endBattleMessage(true), 2000);

            }
            this.buildActionButtons();
        }
    }
    // Method that sets the logic for the enemy turn
    enemyTurn() {
        // Detemine which enemies are alive
        // alive enemies choose action
        // enemies cycle through and put that action into effect
        // display result message of that action
        // Check if the battle is over
        // Display defeat message
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
        // Create the 5 rows
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
            // BUild the 6 columns, set their attributes adn append to the row
            for (let j = 1; j <= 6; j++) {
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
                    for (const attribute in enemyImgAttributes) {
                        enemyImg.setAttribute(`${attribute}`, `${enemyImgAttributes[attribute]}`)
                    }
                    const tile = document.querySelector(`#${backRankTiles[index]}`);
                    tile.append(enemyImg);
                })
                break;
            case 2:
                this.mob.backRank.forEach((enemy, index) => {
                    const enemyImg = document.createElement("img")
                    const enemyImgAttributes = {
                            id: `fr-enemy-${index + 1}-img`, 
                            src: enemy.artwork
                        };
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
        //Clear the HTML each time this is called
        controlPanel.innerHTML = "";
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
        if (this.player.potions > 0) {
            const potionButton = controls.createButton("Take potion", "take-potion");
            controlPanel.append(potionButton);
        }
    }
}

export { Battle };