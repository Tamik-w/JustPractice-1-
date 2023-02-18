"use strict";

var track = document.getElementById("image-track");

var handleOnDown = function handleOnDown(e) {
  return track.dataset.mouseDownAt = e.clientX;
};

var handleOnUp = function handleOnUp() {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

var handleOnMove = function handleOnMove(e) {
  if (track.dataset.mouseDownAt === "0") return;
  var mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;
  var percentage = mouseDelta / maxDelta * -100,
      nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  track.dataset.percentage = nextPercentage;
  track.animate({
    transform: "translate(".concat(nextPercentage, "%, -50%)")
  }, {
    duration: 1200,
    fill: "forwards"
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = track.getElementsByClassName("image")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var image = _step.value;
      image.animate({
        objectPosition: "".concat(100 + nextPercentage, "% center")
      }, {
        duration: 1200,
        fill: "forwards"
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
/* -- Had to add extra lines for touch events -- */


window.onmousedown = function (e) {
  return handleOnDown(e);
};

window.ontouchstart = function (e) {
  return handleOnDown(e.touches[0]);
};

window.onmouseup = function (e) {
  return handleOnUp(e);
};

window.ontouchend = function (e) {
  return handleOnUp(e.touches[0]);
};

window.onmousemove = function (e) {
  return handleOnMove(e);
};

window.ontouchmove = function (e) {
  return handleOnMove(e.touches[0]);
};