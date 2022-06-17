class BattleEvent {
    constructor(event, battle) {
      this.event = event;
      this.battle = battle;
    }

    messageBoxText(resolve) {
        const text = this.event.text;
        const messageBox = document.querySelector("#message-box");
        messageBox.innerText = text;
        resolve();
    }

    defend(resolve) {
        // 
    }

    //Start the battle event
    start(resolve) {
        this[this.event.type](resolve);
    }
}