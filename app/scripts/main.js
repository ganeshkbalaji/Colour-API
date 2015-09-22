$( document ).ready(function() {
  var globalArr;
  var globalIndex = 0;
  var colorOptions;
  function initialLoad(){
    $('#image').attr('src', globalArr[0].imageUrl);
    $('#hyperlink').attr('href', globalArr[0].url);
    $('#palette-title').text(globalArr[0].title);
    $('#creator').text(globalArr[0].userName);
    $('#date').text(globalArr[0].dateCreated);
    $('#views').text(globalArr[0].numViews);
    $('tr td:nth-child(1)').text(globalArr[0].colors[0])
    $('tr td:nth-child(1)').css('background-color', 'globalArr[0].colors[0]');
    $('tr td:nth-child(2)').text(globalArr[0].colors[1]);
    $('tr td:nth-child(3)').text(globalArr[0].colors[2]);
    $('tr td:nth-child(4)').text(globalArr[0].colors[3]);
    $('tr td:nth-child(5)').text(globalArr[0].colors[4]);
  };
  function pickAnObject(index){
    $('#image').attr('src', globalArr[index].imageUrl);
    $('#hyperlink').attr('href', globalArr[index].url);
    $('#palette-title').text(globalArr[index].title);
    $('#creator').text(globalArr[index].userName);
    $('#date').text(globalArr[index].dateCreated);
    $('#views').text(globalArr[index].numViews);
    $('tr td:nth-child(1)').text(globalArr[index].colors[0]);
    $('tr td:nth-child(2)').text(globalArr[index].colors[1]);
    $('tr td:nth-child(3)').text(globalArr[index].colors[2]);
    $('tr td:nth-child(4)').text(globalArr[index].colors[3]);
    $('tr td:nth-child(5)').text(globalArr[index].colors[4]);
  };
  $("#next").on("click", function(event) {
    event.preventDefault();
    globalIndex++;
    if (globalArr.length === globalIndex) {
      swal("There are no more values");
      globalIndex--;
    }
    pickAnObject(globalIndex);
  });
  $("#previous").on("click", function(event) {
    event.preventDefault();
    globalIndex--;
    if (globalIndex === -1  ) {
      swal("You're at the beginning");
      globalIndex++;
    }
    pickAnObject(globalIndex);
  });
  $("#random").on("click", function(event) {
    event.preventDefault();
    globalIndex = Math.floor((Math.random() * globalArr.length) + 1) - 1;
    pickAnObject(globalIndex);
  });
  $.ajax({
        url: 'http://www.colourlovers.com/api/palettes?format=json&jsonCallback=callback&',
        dataType: "jsonp",
        async: false,
        jsonpCallback: 'callback',
        success: function(response){
          globalArr = response;
          initialLoad(globalArr);
        }
  });
});