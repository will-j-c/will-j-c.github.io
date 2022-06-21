class Level {
    constructor({player, levelParamObject, game, onEndLevel}) {
        this.player = player;
        this.chapterTitle = levelParamObject.chapterTitle;
        this.battleLineup = levelParamObject.battleLineup;
        this.text = levelParamObject.text;
        this.game = game;
        this.tile = levelParamObject.tile,
        this.onEndLevel = onEndLevel;
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
        await this.storyBoard();
    }
    async initiateBattle() {
        
        const battle = new Battle({
            player: this.player, 
            enemy1: this.battleLineup[0], 
            enemy2: this.battleLineup[1], 
            enemy3: this.battleLineup[2],
            level: this, 
            onEnd: event => {
                return new Promise(resolve => {
                    this.onEndLevel(event);
                    resolve();
                    console.log("Level class: Battle Resolved")
                })
            }
        });
        battle.start();
    }
    async storyBoard() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div class="row">
                    <h1 class="chapter-title"></h1>
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn" id="continue-button">Continue</button>
            </main>
            `
        const continueButton = document.querySelector("#continue-button");
        gsap.set(continueButton, {opacity: 0});
        const chapterTitle = document.querySelector(".chapter-title");
        const paragraphContainer = document.querySelector("#para-container");
        chapterTitle.innerText = this.chapterTitle;
        
        gsap.set(playScreen, {opacity: 1});
        await window["fadeIn"](chapterTitle);
        for (let para of this.text) {
            const paragraph = document.createElement("p");
            paragraph.setAttribute("class", "para-text");
            paragraphContainer.append(paragraph)
            await window["typewriter"](paragraph, para);
        }
        await window["fadeIn"](continueButton);
        continueButton.onclick = () => {
            this.initiateBattle();
        }
    }
}