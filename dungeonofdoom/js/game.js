// Import the game player modules
import { Battle } from "./battle.js";

// Import the player character
import { Player } from "./player.js";

// Import the monsters
import { Mob } from "./mob.js";
import { Skeleton } from "./skeleton.js";

//Import the DOM controls
import { WindowControls } from "./windowControls.js";

// Define the Game class. This will start the game, initiate battles and all other game logic.
class Game {
    static levelOne = [Skeleton, 3, Skeleton, 3];
    constructor() {
        this.player = new Player();
        this.currentLevel = Game.levelOne;
        this.currentBattle = "";
    }
    // Initiates a new battle object and loops until the battle is over.
    newBattle() {
        const battle = new Battle(this.player, this.currentLevel[0], this.currentLevel[1], this.currentLevel[2], this.currentLevel[3]);
        this.currentBattle = battle;
        battle.battleSequence();
    }
    start() {
        //
    }
    quit() {
        //
    }
}

// Initialise all the game
const game = new Game();
const controls = new WindowControls();
game.newBattle();