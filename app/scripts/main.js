// var colourData;
$( document ).ready(function() {
  function parseJSON() {
    alert(globalArr);
  }
  var globalArr = new Array();
  $.ajax({
        url: 'http://www.colourlovers.com/api/palettes?format=json&jsonCallback=callback&',
        dataType: "jsonp",
        jsonpCallback: 'callback',
        success: function(response){
          $.each(response, function(index, value) {
            globalArr.push(value)
            alert(globalArr);
          })
  });
});