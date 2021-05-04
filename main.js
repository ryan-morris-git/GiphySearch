//Checks for if the user has clicked the "Search" button and assigns the text in the search box to the variable "input"
document.querySelector(".searchButton").addEventListener('click', function() {
    var input = document.querySelector("input").value;
    console.log(input);
    search(input);
});
//Updates the "input" variable each time a key is released and searches when the user hits Enter/Return
document.querySelector(".js-userinput").addEventListener('keyup', function(e) {
    var input = document.querySelector("input").value;
    console.log(input);

    if (e.which === 13) {
        search(input)
    }
});

//Defining the search function, appends the users search query to the end of the search URL for the Giphy API
function search(input) {
    document.querySelector(".js-container").innerHTML = "";

    var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + input;

    var giphyAJAXCall = new XMLHttpRequest();
    giphyAJAXCall.open('GET', url);
    giphyAJAXCall.send();

    giphyAJAXCall.addEventListener('load', function(e) {
        var data = e.target.response;
        pushToDom(data)
    });
}

//Defining the function to push the image URLs to the DOM and display them in containers
function pushToDom(input) {

    var response = JSON.parse(input);

    var imageURLs = response.data;

    imageURLs.forEach(function(image) {
        var src = image.images.fixed_height.url;
        
        var container = document.querySelector(".js-container");

        container.innerHTML += "<a href = " + src + ">" + "<img src=\"" + src + "\" class=\"container-image\"></a>";
    });
}
