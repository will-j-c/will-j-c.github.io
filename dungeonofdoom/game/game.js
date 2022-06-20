class Game {
    constructor(levelParams) {
        this.levelParams = levelParams;
        this.prologueObject = prologue;
    }
    // Start the game
    async start() {
        const player = new Player();
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
                <div class="d-flex justify-content-center flex-column" id="para-container">              
                </div>
                <div class="d-flex justify-content-center flex-column btn-group">
                    <button class="btn" id="continue-button">Continue</button>
                </div>
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
        // const level = new Level(player, this.levelParams[0]);
        // level.start();
        
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
                <div class="row justify-content-center btn-group">
                    <button class="btn" id="start-button">Start New Game</button>
                </div>
                    <audio src="./assets/sounds/title.wav" loop>                    
                </audio>
            </main>
            `
            
    await window["fadeIn"](playScreen);
    window["pulse"]("#title");
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

