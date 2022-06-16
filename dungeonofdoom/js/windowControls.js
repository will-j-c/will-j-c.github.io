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
}
const controls = new WindowControls;
export { WindowControls, controls };