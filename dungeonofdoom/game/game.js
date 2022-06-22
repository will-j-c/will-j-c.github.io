class Game {
    constructor(levelParams) {
        this.levelParams = levelParams;
        this.prologueObject = prologue;
        this.levelIndex = 0;
    }
    // Start the game
    async start() {
        this.player = new Player();
        const playScreen = document.querySelector("#play-screen");
        await window["fadeOut"](playScreen);
        this.prologue();
    }
    async prologue() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div class="row">
                    <h1 class="chapter-title"></h1>
                <div/>
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn" id="continue-button">Continue</button>
            </main>
            `
        const continueButton = document.querySelector("#continue-button");
        gsap.set(continueButton, {opacity: 0});
        const chapterTitle = document.querySelector(".chapter-title");
        const paragraphContainer = document.querySelector("#para-container");
        chapterTitle.innerText = this.prologueObject.chapterTitle;
        
        gsap.set(playScreen, {opacity: 1});
        await window["fadeIn"](chapterTitle);
        for (let para of this.prologueObject.text) {
            const paragraph = document.createElement("p");
            paragraph.setAttribute("class", "para-text");
            paragraphContainer.append(paragraph)
            await window["typewriter"](paragraph, para);
        }
        await window["fadeIn"](continueButton);
        continueButton.onclick = () => {
            this.initiateLevel();
        }
    }

    endingSequence() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div class="row">
                    <h1>You Win!</h1>
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn">Quit</button>
            </main>
        `
        window["fadeIn"]("h1");
        // Listen for a click on the start button
        const quitButton = document.querySelector("button");
        window["fadeIn"](playScreen);
        quitButton.onclick = () => this.init();
    }

    initiateLevel() {
        if (this.levelIndex >= this.levelParams.length - 1) {
            this.endingSequence();
            return;
        }
        const level = new Level({
            player: this.player, 
            levelParamObject: this.levelParams[this.levelIndex], 
            game: this, 
            onEndLevel: event => {
                return new Promise(resolve => {
                    switch(event) {
                        case "quit":
                            this.init();
                            break;
                        case "dead":
                            this.gameOver();
                            break;
                        case "proceed":
                            this.levelIndex++;
                            this.initiateLevel();
                            break;
                    }
                    resolve();
                })
            }
        });
        level.start();
    }
    async init() {
        const playScreen = document.querySelector("#play-screen");
        // Create the title screen
        playScreen.innerHTML = `
            <main class="text-center" id="title-screen-main">
                <div class="row">
                    <h1 id="title">Dungeon of Doom</h1>
                </div>
                <div id="img-container">
                    <img src="./assets/icons/mute.png" id="mute-button">
                </div>
                <div class="justify-content-center row" id="image-container">
                        <img src="./assets/title/castleinthedark.gif">                    
                </div>

                <button class="btn" id="start-button">Start New Game</button>
                <audio src="./assets/sounds/crows-caw.mp3" loop>                    
                </audio>
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
        
            // Listen for a click on the start button
        const startButton = document.querySelector("#start-button");
        window["fadeIn"](playScreen);
        window["pulse"]("#title");
        startButton.onclick = () => this.start();
    }
    async gameOver() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div class="row">
                    <h1>You Died</h1>
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn">Quit</button>
            </main>
        `
        window["fadeIn"]("h1");
        // Listen for a click on the start button
        const quitButton = document.querySelector("button");
        window["fadeIn"](playScreen);
        quitButton.onclick = () => this.init();
    }        
    
}

// Listen for the mute button
// const muteButton = document.querySelector("#mute-button");
// muteButton.onclick = () => {
//     const currentAudioAttributes = [...document.querySelector("audio").attributes];
//     if (currentAudioAttributes.some(attribute => attribute.name === "muted")) {
//         const audioElement = document.querySelector("audio")
//         audioElement.removeAttribute("muted");
//         muteButton.setAttribute("src", "./assets/icons/unmute.png");
//         // audioElement.play();
//         return;
//     }
//     const audioElement = document.querySelector("audio");
//     audioElement.setAttribute("muted", "");
//     muteButton.setAttribute("src", "./assets/icons/mute.png");
//     // audioElement.stop();
// }

