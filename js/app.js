const strengthDisplay = $("#strengthDisplay");
const playground = $(".playground");
const circle = $("#center-circle");
const cb = $("input:checkbox");

var height = playground.height();
var width = playground.width();
var drawAllVectors = false;
var arrowList = [];
var drawn = false;
var arrowColour = '#343a40';

function toggleDarkLight() {
  $("body").toggleClass("bg-dark");
  $("button").toggleClass("btn-dark");
  $(".circle").toggleClass("bg-light");
  $("h3, p, form").toggleClass("text-light");
  arrowList.forEach(function(a) {
    if (a.attrs.stroke == "#ffffff") {
      a.attrs.stroke = "#343a40";
      a.attrs.fill = "#343a40";
      arrowColour = '#343a40';
    } else {
      a.attrs.stroke = "#ffffff";
      a.attrs.fill = "#ffffff";
      arrowColour = '#ffffff';
    }
    layer.draw();
  });
}
