class Game {
    constructor(levelParams) {
        this.levelParams = levelParams;
        this.prologueObject = prologue;
        this.epilogueObject = epilogue;
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
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/unmute.png" id="mute-button">
                </div>   
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn mb-3" id="continue-button">Continue</button>
                <audio src="./assets/sounds/prologue.mp3" id="burning-village"></audio>
            </main>
        
            `
        // Listen for the mute button
        const muteButton = document.querySelector("#mute-button");
        const audioElement = document.querySelector("#burning-village");
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
        gsap.set(continueButton, {opacity: 0});
        const chapterTitle = document.querySelector(".chapter-title");
        const paragraphContainer = document.querySelector("#para-container");
        chapterTitle.innerText = this.prologueObject.chapterTitle;
        gsap.set(playScreen, {opacity: 1});
        const audio = document.querySelector("#burning-village")
        audio.volume = 0.3;
        audio.play();
        window["fadeIn"](muteButton);
        await window["fadeIn"](chapterTitle);
        for (let para of this.prologueObject.text) {
            const paragraph = document.createElement("p");
            paragraph.setAttribute("class", "para-text");
            paragraph.innerText = para;
            paragraphContainer.append(paragraph)
            paragraph.scrollIntoView({behavior: "smooth"});
            await window["fadeIn"](paragraph, 5);
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
                <div>
                    <h1 class="chapter-title">You Win!</h1>
                </div>
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/unmute.png" id="mute-button">
                </div>  
                <div class="d-flex justify-content-center flex-column" id="para-container">       
                </div>
                <button class="btn" id="end-quit">Quit</button>
                <audio src="./assets/sounds/epilogue.mp3" id="epilogue"></audio>
            </main>
        `
        // Listen for the mute button
        const muteButton = document.querySelector("#mute-button");
        const audioElement = document.querySelector("#epilogue");
        muteButton.onclick = () => {
            if (muteButton.getAttribute("src") === "./assets/icons/mute.png") {
                muteButton.setAttribute("src", "./assets/icons/unmute.png");
                audioElement.play();
                return;
            }
            muteButton.setAttribute("src", "./assets/icons/mute.png");
            audioElement.pause();
        }
        audioElement.volume = 0.5;
        audioElement.play();
        window["fadeIn"]("h1");
        // Listen for a click on the start button
        const quitButton = document.querySelector("button");
        window["fadeIn"](playScreen);
        quitButton.onclick = () => this.init();
    }

    initiateLevel() {
        if (this.levelIndex > this.levelParams.length - 1) {
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
        this.levelIndex = 0;
        const playScreen = document.querySelector("#play-screen");
        // Create the title screen
        playScreen.innerHTML = `
            <main class="text-center" id="title-screen-main">
                <div class="row">
                    <h1 id="title">Dungeon of Doom</h1>
                </div>
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/mute.png" id="mute-button">
                </div>
                <div class="d-flex justify-content-center image-container">
                        <img src="./assets/title/castleinthedark.gif">                    
                </div>

                <button class="btn" id="start-button">Start New Game</button>
                <button class="btn" id="skip-button">Skip Prologue</button>
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
        const skipButton = document.querySelector("#skip-button");
        window["fadeIn"](playScreen);
        window["pulse"]("#title");
        startButton.onclick = () => this.start();
        skipButton.onclick = async () => {
            this.player = new Player();
            const playScreen = document.querySelector("#play-screen");
            await window["fadeOut"](playScreen);
            this.initiateLevel()
        };
    }
    async gameOver() {
        const playScreen = document.querySelector("#play-screen");
        // Create the basic HTML for the rest of the screen to interact with
        playScreen.innerHTML = `
            <main class="text-center">
                <div>
                    <h1 class="chapter-title">You Are Dead</h1>
                </div>
                <div class="img-container d-flex justify-content-start">
                    <img src="./assets/icons/unmute.png" id="mute-button">
                </div> 
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <button class="btn" id="end-quit">Quit</button>
                <audio src="./assets/sounds/evil-laugh.wav" id="game-over"></audio>
            </main>
        `
        // Listen for the mute button
        const muteButton = document.querySelector("#mute-button");
        const audioElement = document.querySelector("#game-over");
        muteButton.onclick = () => {
            if (muteButton.getAttribute("src") === "./assets/icons/mute.png") {
                muteButton.setAttribute("src", "./assets/icons/unmute.png");
                audioElement.play();
                return;
            }
            muteButton.setAttribute("src", "./assets/icons/mute.png");
            audioElement.pause();
        }
        audioElement.play();
        window["fadeIn"]("h1");
        // Listen for a click on the start button
        const quitButton = document.querySelector("button");
        window["fadeIn"](playScreen);
        quitButton.onclick = () => this.init();
    }        
    
}