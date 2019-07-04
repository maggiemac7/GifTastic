$(document).ready(function(){

var gifsGoHere = [];
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifsGoHere.length; i++) {

      // Then dynamically generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie to our button
      a.addClass("gif");
      // Adding a data-attribute
      a.attr("data-name", gifsGoHere[i]);
      // Providing the initial button text
      a.text(gifsGoHere[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

$("#add-gif").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // Adding the movie from the textbox to our array
    gifsGoHere.push(gif);
    console.log(gifsGoHere);

    renderButtons();
});


//BUTTON EVENT
$(document).on('click', ".gif", function() {

//GIPHYS DIPLAYED 
var query= 'cats';
$.ajax({
    url:'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + query +'&limit=9',
    method:'GET'
}).done(function(response, err){
    console.log('data', response, 'err', err);
    for (var i = 0; i < response.data.length; i++) {
        console.log(response.data[i].rating)
        console.log(response.data[i].images.fixed_height.url)
        console.log(response.data[i].images.fixed_height_still.url)
        //We need to create an img tag with all that stuff in JS and append to DOM
        var stillLink = response.data[i].images.fixed_height_still.url;
        var gifLink = response.data[i].images.fixed_height.url;
        var imgTag = $('<img>')
                      .attr('src', stillLink)
                      .attr('data-still', stillLink)
                      .attr('data-gif', gifLink)
                      .attr('data-state', 'still')
                      .addClass('img-click')

        $('body').append(imgTag);
    }
    })
});



$(document).on('click', '.img-click',function() {
    var gifLink = $(this).attr('data-gif');
    var stillLink = $(this).attr('data-still');
    var currentState = $(this).attr('data-state');

    if(currentState === "still"){
        //We should switch to gif
        $(this).attr('src', gifLink);
        $(this).attr('data-state', 'gif');
    }
    else {
        //we should switch to still
        $(this).attr('src', stillLink);
        $(this).attr('data-state', 'still');
    }
});

});