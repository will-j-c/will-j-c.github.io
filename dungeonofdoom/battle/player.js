// Define our hero of the story
class Player {
    static accuracy = 0.7;
    static strength = 7;
    static startPotion = 3;
    constructor() {
        this.totalHitPoints = 100;
        this.currentHitPoints = this.totalHitPoints;
        this.isAlive = true;
        this.isDefending = false;
        this.potions = Player.startPotion;
        this.artwork = "assets/player/daeva.png";
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
        const lifeGained = Math.floor(Math.random() * 20);
        if (this.currentHitPoints + lifeGained > this.totalHitPoints) {
            const revisedLifeGain = this.totalHitPoints - this.currentHitPoints;
            this.currentHitPoints = this.totalHitPoints;
            this.potions -= 1;
            return revisedLifeGain;
        }
        this.currentHitPoints += lifeGained;
        this.potions -= 1;
        return lifeGained;
    }
    takeDamage(damage) {
        if (this.isDefending === true) {
            const halfDamage = damage * 0.5;
            this.currentHitPoints -= halfDamage;
            return halfDamage;
        }
        this.currentHitPoints -= damage;
        return damage;
    }
    // Check is the player is alive
    checkDeathStatus() {
        if (this.currentHitPoints <= 0) {
            this.isAlive = false;
        }
    }
}