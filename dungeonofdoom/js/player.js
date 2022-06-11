// Define our hero of the story
class Player {
    static accuracy = 0.7;
    static strength = 10;
    constructor() {
        this.totalHitPoints = 100;
        this.currentHitPoints = this.totalHitPoints;
        this.isAlive = true;
    }
    attack() {
        //
    }
    defend() {
        //
    }
    drinkPotion() {
        //
    }
    selectTarget() {
        //
    }
    takeDamage() {
        //
    }
    // Check is the player is alive
    checkDeathStatus() {
        if (this.currentHitPoints <=0 ) {
            this.isAlive = false;
        }
    }
}