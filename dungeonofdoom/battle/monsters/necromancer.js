// Create a Necromancer
class Necromancer extends Monster {
    constructor() {
        super(75);
        this.accuracy = 0;
        this.strength = 10;
        this.name = "Necromancer";
        this.artwork = "assets/monster/necromancer.png",
        this.deathText = "The necromancer screams and disappears....",
        this.actions = [
            {
                name: "Drain Life",
                type: "attack",
                action: "basicAttack",
                text: "The necromancer sends a bolt of dark energy towards you!",
                success: "You are hit",
                failure: "It missed",
                animation: "drainLifeAnimation",
                id: "basicAttack",
                methodId: "basicAttack",
                audio: "#spell-attack"
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