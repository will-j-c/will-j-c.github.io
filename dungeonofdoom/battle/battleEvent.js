class BattleEvent {
    constructor(event, battle) {
      this.event = event;
      this.battle = battle;
    }
    submission(resolve) {
        const submission = new BattleTurnSubmission({
            currentCombatant: this.event.currentCombatant,
            onComplete: submission => {
                // submission {what move to use}
                resolve(submission);
            }
        })
        submission.start()
    }
}