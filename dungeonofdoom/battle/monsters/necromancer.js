// Create a Necromancer
class Necromancer extends Monster {
    constructor() {
        super(75);
        this.accuracy = 0.6;
        this.strength = 10;
        this.name = "Necromancer";
        this.artwork = "assets/monster/necromancer.png"
        this.actions = [
            {
                name: "Slash Attack",
                type: "attack",
                action: "basicAttack",
                text: "The ghoul darts forward, snarling!",
                success: "You are hit",
                failure: "It missed",
                animation: "bounceOutLeft",
                id: "basicAttack",
                methodId: "basicAttack"
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