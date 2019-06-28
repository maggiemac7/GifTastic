$(document).ready(function(){

    //THIS ALL NEEDS TO BE WRAPPED IN A BUTTON EVENT
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
});
// BUTTON END WRAP



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