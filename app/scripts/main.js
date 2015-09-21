$( document ).ready(function() {
$.ajax({
        url: 'http://www.colourlovers.com/api/palettes?format=json&jsonCallback=callback&',
        dataType: "jsonp",
        jsonpCallback: 'callback',
        success: function(response){
          console.log(response)
        }
  })
});