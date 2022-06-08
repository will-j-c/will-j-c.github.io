// A class to encapsulate logic for displaying books on the display book page
class Book {
    //
}

// A class to encapsulate all the logic surrounding a book search
class Search {
    static apiEndpoint = "http://openlibrary.org/search.json";
    constructor() {
        this.generalSearchString = "";
    }
    // Method to send GET request to OpenLibrary and display response in DOM
    async displaySearch(url) {
        const response = await fetch(url);
        const data = await response.json();
        // Deal with the search request here
        // data.docs.forEach(element => {
        // const div = addSearchItem(element.title);
        // const bodyElement = document.querySelector("body");
        // bodyElement.append(div);
    }
    setSearchString() {
        // Method to set the search string
    }
    // Method to create a div element with inner list elements to display the relevant data
    createSearchResultDiv() {
        const divElement = document.createElement("div");
        divElement.innerHTML = `
            <ul>
                <li>Title: ${title}</li>
            </ul>
        `;
        return divElement;
    }
    getFormData() {
        // Method that fetches the search string from the input field
    }
    submitSearch() {
        // Function to run with the button click event listener
    }
}