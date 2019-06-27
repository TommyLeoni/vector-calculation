const playground = $(".playground");
const circle = $("#center-circle");
const cb = $("input:checkbox");
var width = playground.width();
var height = playground.height();
var drawAllVectors = false;
var arrowList = [];
var drawn = false;
var arrowColour;

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
  if (drawn) {
    arrowList = [];
    drawn = false;

    stage = new Konva.Stage({
      container: ".playground",
      width: width,
      height: height
    });

    layer = new Konva.layer();
    stage.add(layer);
  }
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

$("form").submit(function(event) {
  event.preventDefault();
  $("#showAllVectors").is(":checked")
    ? (drawAllVectors = true)
    : (drawAllVectors = false);
  drawFinalVector();
});

function drawFinalVector() {
  var finalArrow = new Konva.Arrow({
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
      points: [finalArrow.attrs.points[2], finalArrow.attrs.points[3], 0, 0],
      pointerLength: 20,
      pointerWidth: 20,
      fill: "#343a40",
      stroke: "#343a40",
      strokeWidth: 4
    });

    currentArrow.attrs.points[2] =
      finalArrow.attrs.points[2] -
      (arrowList[i].attrs.points[0] - arrowList[i].attrs.points[2]);
    currentArrow.attrs.points[3] =
      finalArrow.attrs.points[3] -
      (arrowList[i].attrs.points[1] - arrowList[i].attrs.points[3]);

    finalArrow.attrs.points = currentArrow.attrs.points;
  }

  finalArrow.attrs.points[0] = circle.position().left - circle.width();
  finalArrow.attrs.points[1] = circle.position().top - circle.height();

  if (finalArrow.attrs.points[2] < 20) {
    finalArrow.attrs.points[2] = 20;
  } else if (finalArrow.attrs.points[2] > playground.width()) {
    finalArrow.attrs.points[2] = playground.width() - 20;
  }

  if (finalArrow.attrs.points[3] < 20) {
    finalArrow.attrs.points[3] = 20;
  } else if (finalArrow.attrs.points[3] > playground.height()) {
    finalArrow.attrs.points[3] = playground.height() - 20;
  }

  drawn = true;
  layer.add(finalArrow);
  stage.add(layer);
}

function positionCircle() {
  circle.css({
    top: circle.parent().height() / 2 - circle.height() / 2,
    left: circle.parent().width() / 2 - circle.width() / 2,
    backgroundColor: "#232323"
  });
}

$("body").keypress(function(e) {
  if (e.key == "d") {
    toggleDarkLight();
  }
});

function toggleDarkLight() {
  $("body").toggleClass("bg-dark");
  $("button").toggleClass("btn-dark");
  $(".circle").toggleClass("bg-light");
  $("h3, p, form").toggleClass("text-light");
  arrowList.forEach(function(a) {
    if (a.attrs.stroke == "#ffffff") {
      a.attrs.stroke = "#343a40";
      a.attrs.fill = "#343a40";
    } else {
      a.attrs.stroke = "#ffffff";
      a.attrs.fill = "#ffffff";
    }
    layer.draw();
  });
}
