class Book {
    //
}

// A class to encapsulate all the logic surrounding a general book search
class Search {
    static apiEndpoint = "http://openlibrary.org/search.json";
    constructor() {
        this.generalSearchString = "";
    }
    search() {
        // Async search function goes here.
    }
    setSearchString() {
        // Method to set the search string
    }
    // Method to create the html 
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
        //
    }
}
async function search(searchString) {
    const url = `http://openlibrary.org/search.json${searchString}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    data.docs.forEach(element => {
        const div = addSearchItem(element.title);
        const bodyElement = document.querySelector("body");
        bodyElement.append(div);
    });
}