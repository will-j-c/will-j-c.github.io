class Game {
    constructor(levelParams) {
        this.levelParams = levelParams;
    }
    // Start the game
    async start() {
        const player = new Player();
        const playScreen = document.querySelector("#play-screen");
        await window["fadeOut"](playScreen);
        const level = new Level(player, this.levelParams[0]);
        console.log(level)
        level.start();
    }
    async init() {
        const playScreen = document.querySelector("#play-screen");
        // Create the title screen
        playScreen.innerHTML = `
            <main class="text-center" id="title-screen-main">
                <audio src="./assets/sounds/title.wav" loop autoplay muted>                    
                </audio>
                <div class="row">
                    <h1 id="title" class="pulse">Dungeon of Doom</h1>
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
            </main>
            `
    await window["fadeIn"](playScreen);
    }
}
//Initiate game
// const game = new Game(levelParams);
// game.init();

// Listen for the mute button
const muteButton = document.querySelector("#mute-button");
muteButton.onclick = () => {
    const currentAudioAttributes = [...document.querySelector("audio").attributes];
    if (currentAudioAttributes.some(attribute => attribute.name === "muted")) {
        const audioElement = document.querySelector("audio")
        audioElement.removeAttribute("muted");
        muteButton.setAttribute("src", "./assets/icons/unmute.png");
        // audioElement.play();
        return;
    }
    const audioElement = document.querySelector("audio");
    audioElement.setAttribute("muted", "");
    muteButton.setAttribute("src", "./assets/icons/mute.png");
    // audioElement.stop();
}

// Listen for a click on the start button
const startButton = document.querySelector("#start-button");
startButton.onclick = () => game.start();