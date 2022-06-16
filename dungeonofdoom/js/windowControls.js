// Create a class for controlling the DOM
class WindowControls {
    getMessageBox() {
        return document.querySelector("#message-box");
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
}
const controls = new WindowControls;
export { WindowControls, controls };