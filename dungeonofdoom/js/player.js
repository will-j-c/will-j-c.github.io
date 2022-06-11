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
        this.currentHitPoints -= damage;
    }
    // Check is the player is alive
    checkDeathStatus() {
        if (this.currentHitPoints <=0 ) {
            this.isAlive = false;
        }
    }
}