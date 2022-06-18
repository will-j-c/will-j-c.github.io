class BattleEvent {
    constructor(event, battle) {
      this.event = event;
      this.battle = battle;
    }
    // Find index of action in Object's list of actions by the id that the event returns
    findAction(id) {
        const actions = this.event.currentCombatant.actions;
        let actionControlObject = "EMPTY"; // Initalise the variable to hold the action control object
        actions.forEach(action => {
            for (let key in action) {
                if (key === "id"){
                    if (action[key] === id) {
                        actionControlObject = action;
                    }
                }
            }
        })
        return actionControlObject;        
    }
    // Start a new event

    // Method that displays text in the message box
    messageBoxText(resolve) {
        const text = this.event.text;
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = text;
        window[this.event.animation](messageBox);
        resolve();
    }

    defend(resolve) {
        const actionControlObject = this.findAction(this.event.action);
        this.event.currentCombatant.actions[actionControlObject.action];
        // Overwrite the current event and initialise the new event
        this.event = {
            action: "messageBoxText",
            text: `${actionControlObject.text}`,
            animation: "text"
        }
        this.start(resolve);
        const playerSprite = document.querySelector("#player")
        window[actionControlObject.animation](playerSprite);
        resolve();
    }

    //Start the battle event
    start(resolve) {
        this[this.event.action](resolve);
    }
}