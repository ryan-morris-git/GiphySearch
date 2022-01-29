
let searchQuery = document.getElementById("searchBox").value;

getSearchString();

//Checks for if the user has clicked the "Search" button and assigns the text in the search box to the variable "input"
document.querySelector(".searchButton").addEventListener('click', function() {
    let input = document.querySelector("input").value;
    getSearchString();
    search(input);
});

//Updates the "input" variable each time a key is released and searches when the user hits Enter/Return
document.querySelector(".js-userinput").addEventListener('keyup', function(e) {
    getSearchString();
});

function copyImage(url) {
    console.log(url);
}

function getSearchString() {
    searchQuery = document.getElementById("searchBox").value;
    
    if(searchQuery === "") { 
        document.getElementById("searchString").innerHTML = "Enter a search term to find GIFs";
    } else if (searchQuery != "" && document.querySelector(".js-container").innerHTML == "") {
        document.getElementById("searchString").innerHTML = `Click the search button to search for ${searchQuery}`
    } else {
        document.getElementById("searchString").innerHTML = `Here are the results for "${searchQuery}" <br> Click on a GIF to copy its URL to the clipboard.`
    }
}

//Defining the search function, appends the users search query to the end of the search URL for the Giphy API
function search(input) {
    document.querySelector(".js-container").innerHTML = "";

    let url = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + input;

    let giphyAJAXCall = new XMLHttpRequest();
    giphyAJAXCall.open('GET', url);
    giphyAJAXCall.send();

    giphyAJAXCall.addEventListener('load', function(e) {
        let data = e.target.response;
        pushToDom(data)
    });
}

//Defining the function to push the image URLs to the DOM and display them in containers
function pushToDom(input) {

    let response = JSON.parse(input);

    let imageURLs = response.data;

    imageURLs.forEach(function(image) {
        let src = image.images.fixed_height.url;
        
        let container = document.querySelector(".js-container");

        container.innerHTML += `<a href="javascript:void(0)" onclick="navigator.clipboard.writeText('${src}'); alert('URL copied to the clipboard.')"><img src="${src}" class="container-image"></a>`;
    });
}