const playground = $(".playground");
const circle = $(".circle");
const cb = $("input:checkbox");
var width = playground.width();
var height = playground.height();
var arrowList = [];

var stage = new Konva.Stage({
  container: ".playground",
  width: width,
  height: height
});

var layer = new Konva.Layer();

$(window).resize(function () {
  positionCircle();
  width = playground.width();
  height = playground.height();
  stage = new Konva.Stage({
    container: ".playground",
    width: width,
    height: height
  });
});

$(document).ready(function () {
  positionCircle();
});

playground.click(function (e) {
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
      circle.position().left - circle.width(),
      circle.position().top - circle.height(),
      endX - 15,
      endY - 15
    ],
    pointerLength: 20,
    pointerWidth: 20,
    fill: "#343a40",
    stroke: "#343a40",
    strokeWidth: 4
  });

  arrowList.push(arrow);
  layer.add(arrow);
  stage.add(layer);
}

$("form").submit(function (event) {
  event.preventDefault();
  calcVector();
});

function calcVector(drawCalc) {
  var lastArrow = new Konva.Arrow({
    points: [
      circle.position().left - circle.width(),
      circle.position().top - circle.height(),
      arrowList[0].attrs.points[2],
      arrowList[0].attrs.points[3]
    ],
    pointerLength: 20,
    pointerWidth: 20,
    fill: "red",
    stroke: "red",
    strokeWidth: 4
  });

  for (var i = 1; i < arrowList.length; i++) {
    var currentArrow = new Konva.Arrow({
      points: [lastArrow.attrs.points[2], lastArrow.attrs.points[3], 0, 0],
      pointerLength: 20,
      pointerWidth: 20,
      fill: "#343a40",
      stroke: "#343a40",
      strokeWidth: 4
    });

    currentArrow.attrs.points[2] =
      lastArrow.attrs.points[2] -
      (arrowList[i].attrs.points[0] - arrowList[i].attrs.points[2]);
    currentArrow.attrs.points[3] =
      lastArrow.attrs.points[3] -
      (arrowList[i].attrs.points[1] - arrowList[i].attrs.points[3]);
    lastArrow.attrs.points = currentArrow.attrs.points;
  }

  lastArrow.attrs.points[0] = circle.position().left - circle.width();
  lastArrow.attrs.points[1] = circle.position().top - circle.height();

  if (lastArrow.attrs.points[2] < 20) {
    lastArrow.attrs.points[2] = 20;
  } 
  
  if (lastArrow.attrs.points[2] > playground.width()) {
    lastArrow.attrs.points[2] = playground.width() - 20;
  }

  if (lastArrow.attrs.points[3] < 20) {
    lastArrow.attrs.points[3] = 20;
  } else if (lastArrow.attrs.points[3] > playground.height()) {
    lastArrow.attrs.points[3] = playground.height() - 20;
  }

  layer.add(lastArrow);
  stage.add(layer);
}

function positionCircle() {
  circle.css({
    top: circle.parent().height() / 2 - circle.height() / 2,
    left: circle.parent().width() / 2 - circle.width() / 2
  });
}