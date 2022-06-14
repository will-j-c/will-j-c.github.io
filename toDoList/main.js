// Add event listener to add an item to the to-do list
const addButton = document.querySelector("#to-do-form button");
addButton.onclick = function() {
    const ulELement = document.querySelector("#list-things-to-do ul");
    const todoInput = document.querySelector("#new-todo").value;
    const divItem = document.createElement("div");
    const toDoItem = `
        <li class="to-do-box">    
            <h3 class="align-self-center">${todoInput}</h3>
            <button type="button" class="completed-button btn btn-light">Completed</button>
        </li>
    `
    divItem.innerHTML = toDoItem;
    ulELement.append(divItem);
}

// Add event listener to remove the list item and add it to the next column
const ulToDo = document.querySelector("#list-things-to-do ul");
ulToDo.onclick = function(event) {
    if (event.target.className !== "completed-button btn btn-light") {
        return;
    }
    //Change the button text to remove
    event.target.innerText = "Remove";
    //Change the class of the button
    event.target.setAttribute("class", "remove-button btn btn-light");
    //Change the list element class name
    event.target.parentElement.setAttribute("class", "completed-box");
    // Append to the completed column
    const ulELementDone = document.querySelector("#list-done-to-do ul");
    ulELementDone.append(event.target.parentElement.parentElement);
}

// Add event listener to remove an item from the things done column
const ulComplete = document.querySelector("#list-done-to-do");
ulComplete.onclick = function(event) {
    if (event.target.className !== "remove-button btn btn-light") {
        return;
    }
    event.target.parentElement.parentElement.remove();
}