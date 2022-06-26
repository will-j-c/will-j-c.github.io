// Define our hero of the story
class Player {
    static accuracy = 0;
    static strength = 10;
    static startPotion = 3;
    constructor() {
        this.totalHitPoints = 100;
        this.currentHitPoints = 90//this.totalHitPoints;
        this.isAlive = true;
        this.isDefending = false;
        this.potions = Player.startPotion;
        this.artwork = "assets/player/player.png";
        this.type = "player";
        this.deathText = "You have been overwhelmed and descend into darkness"
        this.actions = [
            {
                name: "Stab Attack",
                type: "attack",
                action: "targetSingleEnemyAttack",
                text: "You lunge forward and stab at the enemy!",
                success: "You hit the enemy",
                failure: "You missed",
                id: "stab-attack",
                methodId: "stabAttack",
                animation: "stabAttackAnimation",
                audio: "#stab-attack"
            },
            {
                name: "Defend",
                type: "utility",
                action: "defend",
                text: "You raise your shield and defend yourself!",
                id: "defend",
                animation: "bounce",
                methodId: "defend",
                statusOnComplete: "Defending",
                animation: "defendAnimation",
            },
            {
                name: "Health Potion",
                type: "utility",
                action: "healthPotion",
                text: "You drink a health potion and gain",
                id: "health-potion",
                methodId: "healthPotion",
                animation: "takePotionAnimation"
            },
            {
                name: "Chop Attack",
                type: "attack",
                action: "targetSingleEnemyAttack",
                text: "You leap into the air set to cleave your target!",
                success: "You hit the enemy",
                failure: "You missed",
                id: "chop-attack",
                methodId: "chopAttack",
                animation: "chopAttackAnimation",
                audio: "#chop-attack"
            }
        ];
    }
    // Method for player attacking. Returns array of whether it is a hit and the damage inflicted.
    stabAttack() {
        const revisedAccuracy = Player.accuracy * 1.2;
        const isHit = Math.random() <= revisedAccuracy ? true : false;
        const damage = Player.strength;
        if (isHit) {
            return [true, damage];
        }
        return [false, 0];
    }
    chopAttack() {
        const revisedAccuracy = Player.accuracy * 0.8;
        const isHit = Math.random() <= revisedAccuracy ? true : false;
        const damage = Player.strength * 2;
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
            const halfDamage = Math.floor(damage * 0.5);
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