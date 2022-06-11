// Fetch the album information from theaudiodb
const endpoint = "https://theaudiodb.com/api/v1/json/2/album.php";
const artistID = "112516"
const requestURL = `${endpoint}?i=${artistID}`

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    const idx = pickRandomAlbumIndex(data.album);
    const albumObj = data.album[idx];
    addAlbumToDOM(albumObj.strAlbum, albumObj.intYearReleased, albumObj.strDescriptionEN, albumObj.strWikipediaID, albumObj.strAlbumThumb);
}

// Function to add details from the request object to the DOM
function addAlbumToDOM(title, year, desc, link, img) {
    const sectionElement = document.querySelector("#album-container");
    const linkToUse = adjustLink(link);
    const descToUse = adjustDesc(desc);
    sectionElement.innerHTML = `
    <div class="row" id="album-section">    
        <ul class="col">
            <li><b>Album Title:</b> ${title}</li>
            <li><b>Release Year:</b> ${year}</li>
            <li><b>Description:</b> ${descToUse}</li>
            <li><b>Spotify Artist Link:</b> <a href="https://open.spotify.com/artist/1DFr97A9HnbV3SKTJFu62M" target="_blank" rel="noopener noreferrer">Link</a></li>
            <li><b>Wikipedia Link:</b> <a href="https://en.wikipedia.org/wiki/${linkToUse}" target="_blank" rel="noopener noreferrer">Link</a></li>    
        </ul>
        <img src="${img}" class="img-thumbnail col" style="max-height:300px;max-width:300px; display: inline;">
    </div>
    `
    pickSplash(); // Change the splash each time as well. For fun!
}

// Function to pick a random album
function pickRandomAlbumIndex(arr) {
    const arrLEngth = arr.length;
    return Math.floor(Math.random() * arrLEngth);
}

// Function that swaps a generic link if the return is null
function adjustLink(link) {
    if (link === null) {
        return "Mot%C3%B6rhead"
    }
    return link;
}

// Function that swaps a generic description if the description received is null
function adjustDesc(desc) {
    if (desc === undefined) {
        return "Details of this album appear to have been lost due to too much whiskey."
    }
    return desc;
}
// Function that chooses a random splash image when the page loads.
function pickSplash() {
    const idArr = ["splash-image", "splash-image2", "splash-image3"];
    const asideElement = document.querySelector("aside");
    const randId = idArr[pickRandomAlbumIndex(idArr)];
    asideElement.setAttribute("id", randId);
}

// Run on page load so a splash is always picked
fetchData(requestURL);

// Set up an event listener that runs the above on clicking the button
const buttonElement = document.querySelector("button");
buttonElement.addEventListener("click", function(){fetchData(requestURL)}); // Event listeners need an anonymous function to invoke parameters on another function