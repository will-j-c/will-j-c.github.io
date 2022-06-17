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
            rank.push(new monster);
        }
        return rank;
    }
}