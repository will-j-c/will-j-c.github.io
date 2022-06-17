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