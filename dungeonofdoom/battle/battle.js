// Initiate a battle class. This will encapsulate all logic around a battle.
class Battle {
    constructor(player, enemy1, enemy2, enemy3) {
        this.player = player; //The current instance of the player object within Game
        this.enemies = [enemy1, enemy2, enemy3];
        this.enemy1 = this.enemies[0];
        this.enemy2 = this.enemies[1];
        this.enemy3 = this.enemies[2];
        this.isOver = false;
    }
    // The below method is called to launch a new battle and run the whole logic for the battle.
    start() {
        this.buildBattlefield();
        this.battleTurn = new BattleTurn ({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.start(resolve);
                })
            }
    })
        this.battleTurn.start();
    }

    quitBattle() {
        //
    }
    
    // Method that adds the divs for the game board. Grid is 6x5 and adds a co-ordinate for each box. Grid also adds art for the enemies.
    buildBattlefield() {
        const playScreen = document.querySelector("#play-screen");
        // Create the bare skeleton of the battle screen
        playScreen.innerHTML = `
            <header class="row">
                <h3>Some battle controls go here</h3>
            </header>
            <main class="text-center">
                <div id="battle-container">
                </div>
                <div class="row">
                    <h3 id="message-box"></h3>
                </div>
                <div class="row">
                    <div class="col m-3">
                        <h2>Player Status</h2>
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
                        class: "row battlefield-row"
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
        playerSprite.setAttribute("class", "sprite");
        playerTile.append(playerSprite);
        // Add the enemies to the the battlefield
        const enemyTiles = ["#col-2-3", "#col-3-3", "#col-4-3"];
        for (let i = 0, len = enemyTiles.length; i < len; i++) {
            const enemyTile = document.querySelector(enemyTiles[i]);
            const enemy = this.enemies[i];
            const enemySprite = document.createElement("img");
            enemySprite.setAttribute("src", enemy.artwork);
            enemySprite.setAttribute("class", "sprite");
            enemyTile.append(enemySprite);
        }

    }
    // Method determines the available actions of the player and add relevant buttons to the DOM for that action
    buildActionButtons() {
        //
    }
}

const battle = new Battle(new Player, new Skeleton, new Skeleton, new Skeleton);
battle.start();