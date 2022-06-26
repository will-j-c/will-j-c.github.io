// Create a Spider
class Spider extends Monster {
    constructor() {
        super(50);
        this.accuracy = 0.6;
        this.strength = 10;
        this.name = "Spider";
        this.artwork = "assets/monster/wolf_spider.png",
        this.deathText = "The spider collapses in a splash of ichor",
        this.actions = [
            {
                name: "Pounce Attack",
                type: "attack",
                action: "basicAttack",
                text: "The spider leaps into the air and flies towards you with fangs out!",
                success: "You are hit",
                failure: "It missed",
                animation: "pounceAttackAnimation",
                id: "basicAttack",
                methodId: "basicAttack",
                audio: "#spider-attack"
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