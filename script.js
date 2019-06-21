const playground = $(".playground");
const circle = $(".circle");
var width = playground.width();
var height = playground.height();
var arrowList = [];

var stage = new Konva.Stage({
  container: ".playground",
  width: width,
  height: height
});

var layer = new Konva.Layer();

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
      circle.position().left - circle.width(),
      circle.position().top - circle.height(),
      endX - 15,
      endY - 15
    ],
    pointerLength: 20,
    pointerWidth: 20,
    fill: '#343a40',
    stroke: '#343a40',
    strokeWidth: 4
  });

  arrowList.push(arrow);
  layer.add(arrow);
  stage.add(layer);
}

$(".btn-calc").click(function() {
  calcVector();
});

function calcVector() {
  var finalArrow = new Konva.Arrow({
    points: [
      circle.position().left - circle.width(),
      circle.position().top - circle.height(),
      0,
      0
    ],
    pointerLength: 20,
    pointerWidth: 20,
    fill: '#343a40',
    stroke: '#343a40',
    strokeWidth: 4
  });
  for (var i = 1; i < arrowList.length; i++) {
    finalArrow.attrs.points[0] = arrowList[i].attrs.points[2];
    finalArrow.attrs.points[1] = arrowList[i].attrs.points[3];
    finalArrow.attrs.points[2] = arrowList[i-1].attrs.points[2];
    finalArrow.attrs.points[3] = arrowList[i-1].attrs.points[3];
  }
  layer.add(finalArrow);
  stage.add(layer);
}

function positionCircle() {
  circle.css({
    top: circle.parent().height() / 2 - circle.height() / 2,
    left: circle.parent().width() / 2 - circle.width() / 2
  });
}
function point(x, y) {
  this.x = x;
  this.y = y;
}
