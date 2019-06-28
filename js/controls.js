$(window).resize(function() {
  positionCircle();
  width = playground.width();
  height = playground.height();
  stage = new Konva.Stage({
    container: ".playground",
    width: width,
    height: height
  });
});

$(document).ready(function() {
  positionCircle();
});

$("form").submit(function(event) {
  event.preventDefault();
  $("#showAllVectors").is(":checked")
    ? (drawAllVectors = true)
    : (drawAllVectors = false);
  drawFinalVector();
});

$("body").keypress(function(e) {
  if (e.key == "d") {
    toggleDarkLight();
  }
});

playground.click(function(e) {
    var parentOffset = $(this)
      .parent()
      .offset();
    var x = e.pageX - parentOffset.left + 15;
    var y = e.pageY - parentOffset.top + 15;
    addArrow(x, y);
  });
