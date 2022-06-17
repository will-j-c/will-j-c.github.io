class BattleTurn {
    constructor(battle, onNewEvent) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentCombatant = "player"; // Player starts
    }
    // Method that determines the actions completed in the turn
    async turn() {
        //Get the current active combatant
        const currentCombatant = this.battle[this.currentCombatant];
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
        const enemy = this.battle.combatants[enemyId];
    
        const submission = await this.onNewEvent({
          type: "submissionMenu",
          caster,
          enemy
        })
        const resultingEvents = submission.action.success;
        for (let i=0; i<resultingEvents.length; i++) {
          const event = {
            ...resultingEvents[i],
            submission,
            action: submission.action,
            caster,
            target: submission.target,
          }
          await this.onNewEvent(event);
        }
    
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    async start() {
        await this.onNewEvent({
            type: "messageBoxText",
            text: "The enemy approaches....."
        })
        // Start the first turn
        this.turn();
    }
}