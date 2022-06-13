// Define our hero of the story
class Player {
    static accuracy = 0.7;
    static strength = 10;
    static startPotion = 3;
    constructor() {
        this.totalHitPoints = 100;
        this.currentHitPoints = this.totalHitPoints;
        this.isAlive = true;
        this.isDefending = false;
        this.potions = Player.startPotion;
    }
    // Method for player attacking. Returns array of whether it is a hit and the damage inflicted.
    attack() {
        const isHit = Math.random() <= Player.accuracy ? true : false;
        const damage = Player.strength;
        if (isHit) {
            return [true, damage];
        }
        return [false, 0];
    }
    defend() {
        this.isDefending = true;
    }
    drinkPotion() {
        //
    }
    takeDamage(damage) {
        if (this.isDefending === true) {
            this.currentHitPoints -= 0.5 * damage;
            return;
        }
        this.currentHitPoints -= damage;
    }
    // Check is the player is alive
    checkDeathStatus() {
        if (this.currentHitPoints <=0 ) {
            this.isAlive = false;
        }
    }
}

// A basic monster template that can be extended to add additional details and flavour for monster types
class Monster {
    constructor(hp) {
        this.totalHitPoints = hp;
        this.currentHitPoints = this.totalHitPoints;
        this.isAlive = true;
    }
    // Method that applies damaged received to monster
    takeDamage(damage) {
        this.currentHitPoints -= damage;
    }
    checkDeathStatus() {
        if (this.currentHitPoints <=0 ) {
            this.isAlive = false;
        }
    }
}

// Create a Skeleton
class Skeleton extends Monster {
    static totalHitPoints = 10;
    static accuracy = 0.4;
    static strength = 2;
    static criticalChance = 0.9
    constructor() {
        super(Skeleton.totalHitPoints);
        this.name = "Skeleton";
    }
    basicAttack() {
        const isHit = Math.random() <= Skeleton.accuracy ? true : false;
        const damage = Skeleton.strength;
        if (isHit) {
            return [true, damage];
        }
        return [false, 0];
    }
    // Method to determine if the attack is a critical strike or not
    isCritical() {
        return Math.random() > Skeleton.criticalChance ? true : false;
    }
}

// Create a class of Mob to represent the group of monsters
class Mob {
    // Constructor creates a front and back rank. Each rank is an array of monsters.
    constructor(frontMonster, numFrontMonster, backMonster, numBackMonster) {
        this.frontRank = this.createRank(frontMonster, numFrontMonster);
        this.backRank = this.createRank(backMonster, numBackMonster);
    }
    // Method to create the rank of monsters
    createRank(monster, number) {
        const rank = [];
        for (let i = 1; i <= number; i++) {
            rank.push(monster);
        }
        return rank;
    }
}

// Define the Game class. This will start the game, initiate battles and all other game logic.
class Game {
    static levelOne = [new Skeleton, 3, new Skeleton, 1];
    constructor() {
        this.player = new Player();
        this.currentLevel = Game.levelOne;
    }
    // Initiates a new battle object and loops until the battle is over.
    newBattle() {
        const battle = new Battle(this.currentLevel);
        while (battle.isOver === false) {
            break
        }
    }
    start() {
        //
    }
    quit() {
        //
    }
}

// Initiate a battle class. This will encapsulate all logic around a battle.
class Battle {
    constructor(frontMonster, numFrontMonster, backMonster, numBackMonster) {
        this.player = game.player; //The current instance of the player object within Game
        this.mob = new Mob(frontMonster, numFrontMonster, backMonster, numBackMonster);
        this.isOver = false;
    }
    playerTurn() {
        // Display a message that it is the players turn
        const messageBox = controls.getMessageBox()
        messageBox.innerText = "Choose an action"
    //     ask player to choose an action and target if applicable 
    //     put that action into a variable 
    //     run the action
    //     display result message of that action
    //      check if the battle is over
    //      display victory message

    }
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
        const frontRankAlive = this.mob.frontRank.every(element => element.isAlive);
        const backRankAlive = this.mob.backRank.every(element => element.isAlive);
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
    // Method determines the available actions of the player and add relevant buttons to the DOM for that action
    buildActionButtons() {
        const controlPanel = controls.getControlPanelDiv();
        //Create buttons to attack viable targets. Can only attack the front rank if it is still alive
        if (this.mob.frontRank.some(enemy => enemy.isAlive === true)) {
            this.mob.frontRank.forEach((enemy, index) => {
                if (enemy.isAlive) {
                    const attackButton = control.createButton(`Attack ${enemy.name} ${index + 1}`, ``)
                }
            })
        } else {
            this.mob.backRank.forEach((enemy, index) => {
                if (enemy.isAlive) {
                    const attackButton = control.createButton(`Attack ${enemy.name} ${index + 1}`, ``)
                }
            })
        }
        // Creates the button to defend
        const defendButton = controls.createButton("Defend", "defend");
        controlPanel.append(defendButton);
        // Allow the potion action if player has potions. Creates a take potion button and appends to the control panel
        if (this.player.potions >= 0) {
            const potionButton = controls.createButton("Take potion", "take-potion");
            controlPanel.append(potionButton);
        }
    }
}

// Create a class for controlling the DOM
class WindowControls {
    getMessageBox() {
        return document.querySelector("#message-box");
    }
    getControlPanelDiv() {
        return document.querySelector("#control-panel");
    }
    createButton(text, id) {
        const button = document.createElement("button");
        button.innerText = type;
        button.setAttribute("id", id);
    }
}

// Initialise all the classes
const game = new Game();
const controls = new WindowControls();
// console.log(game.player);
// const battle = new Battle(new Skeleton, 3, new Skeleton, 1);
// console.log(battle);