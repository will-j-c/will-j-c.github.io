// JS file to encapsulate all the monsters in the game

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
    }
    shuffleAttack() {
        //
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