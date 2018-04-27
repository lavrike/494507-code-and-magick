'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var setupEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var setupCoat = document.querySelector('.wizard-coat');

  var changeFireballColor = function () {
    var randomFireballColor = FIREBALL_COLORS[getRandom(0, FIREBALL_COLORS.length)];
    setupFireball.style.background = randomFireballColor;
    var inputFireballColor = document.querySelector('input[name=fireball-color]');
    inputFireballColor.value = randomFireballColor;
  };

  var changeEyesColor = function () {
    var randomEyeColor = EYES_COLORS[getRandom(0, EYES_COLORS.length)];
    setupEyes.style.fill = randomEyeColor;
    var inputEyesColor = document.querySelector('input[name=eyes-color]');
    inputEyesColor.value = randomEyeColor;
  };

  var changeCoatColor = function () {
    var randomCoatColor = COAT_COLORS[getRandom(0, COAT_COLORS.length)];
    setupCoat.style.fill = randomCoatColor;
    var inputCoatColor = document.querySelector('input[name=coat-color]');
    inputCoatColor.value = randomCoatColor;
  };

  setupEyes.addEventListener('click', changeEyesColor);
  setupFireball.addEventListener('click', changeFireballColor);
  setupCoat.addEventListener('click', changeCoatColor);

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

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizards = [];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;

    return wizardElement;
  };
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    var nameWizard = WIZARD_NAMES[getRandom(0, WIZARD_NAMES.length)];
    var surnameWizard = SURNAMES[getRandom(0, SURNAMES.length)];
    var randomCoatColor = COAT_COLORS[getRandom(0, COAT_COLORS.length)];
    var randomEyeColor = EYES_COLORS[getRandom(0, EYES_COLORS.length)];

    var newWizard = {
      name: nameWizard + ' ' + surnameWizard,
      coatColor: randomCoatColor,
      eyeColor: randomEyeColor
    };

    wizards.push(newWizard);
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

/*   var setDash = function (target) {
    if (target.tagName.toLowerCase() !== 'img') {
      target.style.outline = '2px dashed red';
    }
  }; */

  shopElement.addEventListener('dragstart', function (evt) {

    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      evt.dataTransfer.effectAllowed = 'copy';
    }
    /* artifactsElement.style.outline = '2px dashed red'; */
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    if (evt.target.hasChildNodes()) {
      return;
    }
    evt.target.style.outline = 'none';
    evt.target.appendChild(draggedItem);
    evt.target.style.backgroundColor = '';
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      if (evt.target.hasChildNodes()) {
        return;
      }
      evt.target.style.outline = '2px dashed red';
      evt.target.style.backgroundColor = 'yellow';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.outline = 'none';
    evt.target.style.backgroundColor = '';
  });
})();
