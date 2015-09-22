$( document ).ready(function() {
  var globalArr;
  var globalIndex = 0;
  var customBoard = new DrawingBoard.Board('sampleBoard', {
  background: "#69D2E7",
  color: "#FFFFFF",
  size: 30,
  controls: [
    { Size: { type: "range" } },
    { Navigation: { back: false, forward: false } },
    'DrawingMode'
  ],
  webStorage: 'local'
  });

  $("tr td").on("click", function() {
    var index = $(this).text();
    customBoard.resetBackground('#' + index);
  })

  function getCssColor(color) {
    return "#" + color
  }

  function initialLoad(){
      pickAnObject(0);
  };

  function pickAnObject(index){
    $('#image').attr('src', globalArr[index].imageUrl);
    $('#hyperlink').attr('href', globalArr[index].url);
    $('#palette-title').text(globalArr[index].title);
    $('#creator').text(globalArr[index].userName);
    $('#date').text(globalArr[index].dateCreated);
    $('#views').text(globalArr[index].numViews);
    for (var i = 0; i <= 4; ++i) {
    $('tr td:nth-child(' + (i+1) + ')')
        .text(globalArr[index].colors[i])
        .css('background-color', getCssColor(globalArr[index].colors[i]));
    }
  };

  $("#next, #previous").on("click", function(event) {
    event.preventDefault();

    var inc = this.id === 'next' ? 1 : -1;

    globalIndex += inc;
    if (globalArr.length === globalIndex) {
      swal("There are no more values");
      globalIndex--;
    } else if (globalIndex === -1) {
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
      jsonpCallback: 'callback'
  }).then(function(response) {
      globalArr = response;
      initialLoad(globalArr);
  });
});