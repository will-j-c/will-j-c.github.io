// Import the basic Monster template class
import { Monster } from "./basicMonster.js";

// Create a Skeleton
class Skeleton extends Monster {
    static totalHitPoints = 10;
    static accuracy = 0.4;
    static strength = 2;
    // static criticalChance = 0.9
    constructor() {
        super(Skeleton.totalHitPoints);
        this.name = "Skeleton";
        this.artwork = "assets/monster/skeletal_warrior.png"
        this.basicAttackName = "Shuffle Attack";
    }
    basicAttack() {
        const isHit = Math.random() <= Skeleton.accuracy ? true : false;
        const damage = Skeleton.strength;
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
export { Skeleton };