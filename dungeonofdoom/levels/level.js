class Level {
    constructor(player, levelParamObject) {
        this.player = player;
        this.number = levelParamObject.number;
        this.battleLineup = levelParamObject.battleLineup;
        this.storyPara1 = levelParamObject.storyPara1;
        this.storyPara2 = levelParamObject.storyPara2;
        this.storyPara3 = levelParamObject.storyPara3;
    }
    async start() {
        const playScreen = document.querySelector("#play-screen");
        window["fadeIn"](playScreen);
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center" id="title-screen-main">
                <div class="row">
                    <h1 id="chapter-title" class="pulse"></h1>
                <div class="justify-content-center row" id="para-1">                 
                </div>
                <div class="justify-content-center row" id="para-2">                
                </div>
                <div class="justify-content-center row" id="para-3">                 
                </div>
            </main>
            `
        this.storyBoard();
        
    }
    initiateBattle() {
        //
    }
    async storyBoard() {
        const chapterTitle = document.querySelector("#chapter-title");
        const paragraphElements = [document.querySelector("#para-1"), document.querySelector("#para-2"), document.querySelector("#para-3")];
        let startPara = 1;
        for (let paragraph of paragraphElements) {
            const paragraphElement = document.createElement("p");
            paragraphElement.innerText = this[`storyPara${startPara}`];
            paragraphElement.classList.add("para-text");
            paragraph.append(paragraphElement);
            startPara++
        }
    }
}