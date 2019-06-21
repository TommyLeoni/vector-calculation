const playground = $(".playground-container");
const circle = $(".circle");

$(window).resize(function() {
  positionCircle();
});

$(document).ready(function() {
  positionCircle();
});

playground.click(function(e) {
  var direction = getArrowDirection(e.pageX, e.pageY);
  addArrow(e.pageX, e.pageY);
  playground.append("<div class='arrow'/>");
});

function addArrow(endX, endY) {
  var width = playground.width();
  var height = playground.height();

  var stage = new Konva.Stage({
    container: ".playground",
    width: width,
    height: height
  });

  var layer = new Konva.Layer();

  var arrow = new Konva.Arrow({
    x: 50,
    y: 50,
    points: [0, 0, 100, 200],
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
