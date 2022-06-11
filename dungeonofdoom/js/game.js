// This JS program will run on the front page and be used to start the game
// Import all the level logic from other files
//
import "./player.js";
import "./monsters.js";

// Define the Game class
class Game {
    constructor() {
        this.player = new Player();

    }
    newBattle() {
        // Initiate a new battle
    }
    start() {
        //
    }
    quit() {
        //
    }
}

// Initiate a battle class. This will encapsulate logic around a battle.
class Battle {
    constructor(frontMonster, numFrontMonster, backMonster, numBackMonster) {
        this.player = game.player; //The current instance of the player object within Game
        this.mob = new Mob(frontMonster, numFrontMonster, backMonster, numBackMonster);
    }
    playerTurn() {
    //     ask player to choose an action and target if applicable 
    //     put that action into a variable 
    //     run the action
    //     display result message of that action 

    }
    enemyTurn() {
        // Detemine which enemies are alive
        // alive enemies choose action
        // enemies cycle through and put that action into effect
        // display result message of that action
    }
    // Check if the battle is over and return true if it is
    battleOver() {
        let battleOver = false;
        // Determine if the player is dead
        if (this.player.isAlive === false) {
            battleOver = true;
            return true;
        }
        // Determine if all the monsters in the mob are dead
        const frontRankAlive = this.mob.frontRank.every(element => element.isAlive);
        const backRankAlive = this.mob.f
        // Return battleOver status of false if none of the above conditions are met
        return battleOver;

    }
    endBattleMessage() {
        // Display a message depending on outcome and initiate next stage of game
    }
}

const game = new Game();
console.log(game.player);
const battle = new Battle(new Skeleton, 3, new Skeleton, 1);
console.log(battle);