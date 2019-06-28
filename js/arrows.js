var stage = new Konva.Stage({
    container: ".playground",
    width: width,
    height: height
  });
  
  var layer = new Konva.Layer();
  
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
        circle.position().left + circle.width() / 2,
        circle.position().top + circle.height() / 2,
        endX - 15,
        endY - 15
      ],
      pointerLength: 20,
      pointerWidth: 20,
      fill: arrowColour,
      stroke: arrowColour,
      strokeWidth: 4
    });
  
    arrowList.push(arrow);
    layer.add(arrow);
    stage.add(layer);
  }
  
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
        fill: arrowColour,
        stroke: arrowColour,
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
  
    finalArrow.attrs.points[0] = circle.position().left + circle.width() / 2;
    finalArrow.attrs.points[1] = circle.position().top + circle.height() / 2;
  
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