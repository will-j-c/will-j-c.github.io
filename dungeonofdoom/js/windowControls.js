// Create a class for controlling the DOM
class WindowControls {
    getMessageBox() {
        return document.querySelector("#message-box");
    }
    message(string) {
        this.getMessageBox.innerText = string;
    }
    currentHitPoints(currentHp, startingHp) {
        const hitPoints = document.querySelector("#current-hit-points")
        hitPoints.innerText = `${currentHp}/${startingHp}`;
    }
    getControlPanelDiv() {
        return document.querySelector("#control-panel");
    }
    createButton(text, id) {
        const button = document.createElement("button");
        button.innerText = text;
        button.setAttribute("id", id);
        return button;
    }
    getSquare(id) {
        return document.querySelector(`${id}`);
    }
    resetControlPanelDiv() {
        this.getControlPanelDiv().innerHTML = "";
    }
    deathAnimation(targetTileId) {
        const tileImg = controls.getSquare(targetTileId).firstChild;
        tileImg.classList.add("dead");
        tileImg.addEventListener("animationend", () => {
            tileImg.setAttribute("class", "hidden");
        })
    }
    addItemToBattleLog(string) {
        const battleLog = document.querySelector("#battle-log");
        const logEntry = document.createElement("li");
        logEntry.innerText = string;
        battleLog.append(logEntry);
    }
    createBattleFieldGrid() {
        // Create the 5 rows
        const battleContainer = document.querySelector("#battle-container");
        for (let i = 1; i <= 5; i++) {
            const rowDiv = document.createElement("div");
            const rowDivAttributes = {
                        id: `row-${i}`,
                        class: "row"
                    };
            battleContainer.append(rowDiv);
            // Set the attributes for the rows
            for (const attribute in rowDivAttributes) {
                rowDiv.setAttribute(`${attribute}`, `${rowDivAttributes[attribute]}`);
            }
            // BUild the 6 columns, set their attributes adn append to the row
            for (let j = 1; j <= 6; j++) {
                const colDiv = document.createElement("div");
                const colDivAttributes = {
                        id: `col-${i}-${j}`,
                        class: "col pt-3 pb-3 tile"
                    };
                //Set the attributes for the columns
                for (const attribute in colDivAttributes) {
                    colDiv.setAttribute(`${attribute}`, `${colDivAttributes[attribute]}`)
                }
                //Append the column to the row
                rowDiv.append(colDiv);
            }
        }
    }
}
const controls = new WindowControls;
export { WindowControls, controls };