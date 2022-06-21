// Create a Ghoul
class Ghoul extends Monster {
    constructor() {
        this.totalHitPoints = 20;
        this.accuracy = 0.6;
        this.strength = 10;
        super(this.totalHitPoints);
        this.name = "Skeleton";
        this.artwork = "assets/monster/ghoul.png"
        this.actions = [
            {
                name: "Slash Attack",
                type: "attack",
                action: "basicAttack",
                text: "The gghoul darts forward, snarling!",
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