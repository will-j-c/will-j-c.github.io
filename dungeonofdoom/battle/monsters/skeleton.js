// Create a Skeleton
class Skeleton extends Monster {
    // static criticalChance = 0.9
    constructor() {
        super(10);
        this.accuracy = 0.6;
        this.strength = 10;
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
                animation: "bounceOutLeft",
                id: "basicAttack",
                methodId: "basicAttack"
            },
            // {
            //     name: "Grab Attack",
            //     type: "attack",
            //     action: "specialAttack",
            //     text: "The skeleton tries to !",
            //     success: "You are hit",
            //     failure: "It missed",
            //     animation: "bounceOutRight"
            // }
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
    // // Method to determine if the attack is a critical strike or not
    // isCritical() {
    //     return Math.random() > Skeleton.criticalChance ? true : false;
    // }
}