'use strict';

(function () {
  var overlaySetup = document.querySelector('.overlay.setup');
  var setupUserpic = document.querySelector('.setup-user-pic');
  setupUserpic.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      overlaySetup.style.top = (overlaySetup.offsetTop - shift.y) + 'px';
      overlaySetup.style.left = (overlaySetup.offsetLeft - shift.x) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
//нужно ли здесь создавать селектор, если он есть в другом модуле?
  var setupClose = document.querySelector('.setup-close');
  setupClose.addEventListener('click', function () {
    overlaySetup.style.top = '80px';
    overlaySetup.style.left = '50%';
  });
})();
