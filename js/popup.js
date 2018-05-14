'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var popupEscPress = function (e) {
    if (e.keyCode === ESC_KEY) {
      popupClose();
    }
  };

  var popupOpen = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPress);
  };

  var popupClose = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    popupOpen();
    document.addEventListener('keydown', popupEscPress);
  });

  setupOpen.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEY) {
      popupOpen();
    }
  });

  setupClose.addEventListener('click', function () {
    popupClose();
  });

  setupClose.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEY) {
      popupClose();
    }
  });

  var submitHandler = document.querySelector('.setup-submit');
  submitHandler.addEventListener('submit', function () {
    popupClose();
  });

  submitHandler.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEY) {
      popupClose();
    }
  });
})();
