// Create a Skeleton
class Skeleton extends Monster {
    constructor() {
        super(20);
        this.accuracy = 0.5;
        this.strength = 7;
        this.name = "Skeleton";
        this.artwork = "assets/monster/skeletal_warrior.png"
        this.deathText = "The skeleton disintegrates into a pile of bone"
        this.actions = [
            {
                name: "Shuffle Attack",
                type: "attack",
                action: "basicAttack",
                text: "The skeleton shuffles forward and lunges at you!",
                success: "You are hit",
                failure: "It missed",
                animation: "shuffleAttackAnimation",
                id: "basicAttack",
                methodId: "basicAttack",
                audio: "#skeleton-attack"
            },
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