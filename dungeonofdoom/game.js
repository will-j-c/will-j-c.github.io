class Game {
    constructor() {
        //
    }
    // Start the game
    start() {
        console.log("Game start button clicked")
    }
    init() {
        const playScreen = document.querySelector("#play-screen");
        // Create the title screen
        playScreen.innerHTML = `
        <main class="text-center" id="title-screen-main">
            <audio autoplay loop>
                <source src="./assets/sounds/crows-caw.mp3" type="audio/mp3">                           
            </audio>
            <div>
                <p id="">Unmute</p>
            </div>
            <div class="row">
                <h1 id="title">Dungeon of Doom</h1>
            </div>
            <div class="justify-content-center row" id="image-container">
                    <img src="./assets/title/castleinthedark.gif">                    
            </div>
            <div class="row justify-content-center">
                <button class="col-3" id="start-button">Start Game</button>
            </div>
        </main>
        `
    }
}
//Initiate game
const game = new Game;
game.init();
// Listen for a click on the start button
const startButton = document.querySelector("#start-button");
startButton.onclick = () => game.start();