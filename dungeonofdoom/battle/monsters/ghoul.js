// Create a Ghoul
class Ghoul extends Monster {
    constructor() {
        super(30);
        this.accuracy = 0.5;
        this.strength = 10;
        this.name = "Ghoul";
        this.artwork = "assets/monster/ghoul.png",
        this.deathText = "The ghoul whimpers and is still",
        this.actions = [
            {
                name: "Slash Attack",
                type: "attack",
                action: "basicAttack",
                text: "The ghoul darts forward, snarling!",
                success: "You are hit",
                failure: "It missed",
                animation: "slashAttackAnimation",
                id: "basicAttack",
                methodId: "basicAttack",
                audio: "#ghoul-attack"
            }
        ];
    }
    basicAttack() {
        const isHit = Math.random() <= this.accuracy ? true : false;
        const damage = this.strength;
        if (isHit) {
            return [true, damage];
        }
        return [false, 0];
    }
}