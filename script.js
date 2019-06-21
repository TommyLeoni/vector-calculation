const playground = $(".playground");
const circle = $(".circle");
var width = playground.width();
var height = playground.height();

var stage = new Konva.Stage({
  container: ".playground",
  width: width,
  height: height
});

var layer = new Konva.Layer();

$(window).resize(function() {
  positionCircle();
});

$(document).ready(function() {
  positionCircle();
});

playground.click(function(e) {
  var parentOffset = $(this)
    .parent()
    .offset();
  var x = e.pageX - parentOffset.left;
  var y = e.pageY - parentOffset.top;
  addArrow(x, y);
});

function addArrow(endX, endY) {
  var arrow = new Konva.Arrow({
    points: [
      circle.position().left - circle.width() / 4,
      circle.position().top - circle.height() / 4,
      endX - 15,
      endY - 15
    ],
    pointerLength: 20,
    pointerWidth: 20,
    fill: "black",
    stroke: "black",
    strokeWidth: 4
  });

  // add the shape to the layer
  layer.add(arrow);

  // add the layer to the stage
  stage.add(layer);
}

function getArrowDirection(x, y) {
  if (x > playground.width / 2) {
    if (y > playground.height / 2) {
      return "arrow-";
    }
  }
}

function positionCircle() {
  circle.css({
    top: circle.parent().height() / 2 - circle.height() / 2,
    left: circle.parent().width() / 2 - circle.width() / 2
  });
}
