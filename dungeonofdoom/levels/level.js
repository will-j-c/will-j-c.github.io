class Level {
    constructor({player, levelParamObject, game, onEndLevel}) {
        this.player = player;
        this.chapterTitle = levelParamObject.chapterTitle;
        this.battleLineup = levelParamObject.battleLineup;
        this.text = levelParamObject.text;
        this.audio = levelParamObject.audio;
        this.endAudio = levelParamObject.endAudio;
        this.endText = levelParamObject.endText;
        this.game = game;
        this.tile = levelParamObject.tile,
        this.onEndLevel = onEndLevel;
    }
    async start() {
        const playScreen = document.querySelector("#play-screen");
        window["fadeIn"](playScreen);
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
                return new Promise(async resolve => {
                    if (event === "proceed") {
                        const playScreen = document.querySelector("#play-screen");
                        await window["fadeOut"](playScreen);
                        this.afterBattle(event)
                    } else {
                        const playScreen = document.querySelector("#play-screen");
                        await window["fadeOut"](playScreen);
                        this.onEndLevel(event);
                    }
                    resolve();
                    console.log("Level class: Battle Resolved")
                })
            }
        });
        battle.start();
    }
    async afterBattle(event) {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/unmute.png" id="mute-button">
                </div>
                <div class="d-flex justify-content-center flex-column mt-10" id="para-container-end">              
                </div>
                <button class="btn" id="continue-button">Continue</button>
                <audio id="chapter-audio" src="${this.endAudio}"></audio>
            </main>
            `
        // Listen for the mute button
        const muteButton = document.querySelector("#mute-button");
        const audioElement = document.querySelector("audio");
        muteButton.onclick = () => {
            if (muteButton.getAttribute("src") === "./assets/icons/mute.png") {
                muteButton.setAttribute("src", "./assets/icons/unmute.png");
                audioElement.play();
                return;
            }
            muteButton.setAttribute("src", "./assets/icons/mute.png");
            audioElement.pause();
        }
        const continueButton = document.querySelector("#continue-button");
        const chapterAudio = document.querySelector("#chapter-audio");
        chapterAudio.volume = 0.5;
        chapterAudio.play();
        gsap.set(continueButton, {opacity: 0});
        const paragraphContainer = document.querySelector("#para-container-end");
        gsap.set(playScreen, {opacity: 1});
        for (let para of this.endText) {
            const paragraph = document.createElement("p");
            paragraph.setAttribute("class", "para-text");
            paragraph.innerText = para;
            paragraphContainer.append(paragraph)
            await window["fadeIn"](paragraph);
        }
        await window["fadeIn"](continueButton);
        continueButton.onclick = async () => {
            await window["fadeOut"](playScreen);
            this.onEndLevel(event);
        }       
    }
    async storyBoard() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div>
                    <h1 class="chapter-title"></h1>
                </div>
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/unmute.png" id="mute-button">
                </div>
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn" id="continue-button">Continue</button>
                <audio id="chapter-audio" src="${this.audio}"></audio>
            </main>
            `
        // Listen for the mute button
        const muteButton = document.querySelector("#mute-button");
        const audioElement = document.querySelector("audio");
        muteButton.onclick = () => {
            if (muteButton.getAttribute("src") === "./assets/icons/mute.png") {
                muteButton.setAttribute("src", "./assets/icons/unmute.png");
                audioElement.play();
                return;
            }
            muteButton.setAttribute("src", "./assets/icons/mute.png");
            audioElement.pause();
        }
        const continueButton = document.querySelector("#continue-button");
        const chapterAudio = document.querySelector("#chapter-audio");
        chapterAudio.volume = 0.5;
        chapterAudio.play();
        gsap.set(continueButton, {opacity: 0});
        const chapterTitle = document.querySelector(".chapter-title");
        const paragraphContainer = document.querySelector("#para-container");
        chapterTitle.innerText = this.chapterTitle;
        gsap.set(playScreen, {opacity: 1});
        await window["fadeIn"](chapterTitle);
        for (let para of this.text) {
            const paragraph = document.createElement("p");
            paragraph.setAttribute("class", "para-text");
            paragraph.innerText = para;
            paragraphContainer.append(paragraph);
            paragraph.scrollIntoView({behavior: "smooth"});
            await window["fadeIn"](paragraph);
        }
        await window["fadeIn"](continueButton);
        continueButton.onclick = async () => {
            await window["fadeOut"](playScreen);
            this.initiateBattle();
        }
    }
}