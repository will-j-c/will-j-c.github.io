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
    async fetchDataDisplaySearch(url) {
        const response = await fetch(url);
        const data = await response.json();
        // Deal with the search request here. Need to put in logic around try/catch
        data.docs.forEach(element => {
            const div = this.createSearchResultDiv(element.title);
            const bodyElement = document.querySelector("body");
            bodyElement.append(div);
        })
    }
    // Method to take input from search field and return 
    setSearchString() {
        // Take the form data and convert it to search friendly string
        const input = this.getFormData().replace(/\s+/g, "+");
        this.generalSearchString = `${Search.apiEndpoint}?q=${input}`;
        return `${Search.apiEndpoint}?q=${input}`;
    }
    // Method to create a div element with inner list elements to display the relevant data
    createSearchResultDiv(title) {
        const divElement = document.createElement("div");
        divElement.innerHTML = `
            <ul>
                <li>Title: ${title}</li>
            </ul>
        `;
        return divElement;
    }
    // Method to retrieve the string from the form.
    getFormData() {
        const input = document.querySelector("#general-search").value;
        return input;
    }
    submitSearch() {
        const input = this.setSearchString();
        console.log(input);
    }
}
const search = new Search();
const button = document.querySelector("button");
button.addEventListener("click", search.submitSearch);