'use strict';

(function () {
  var setupEyes = document.querySelector('.wizard-eyes');
  var setupFireball = document.querySelector('.setup-fireball-wrap');
  var setupCoat = document.querySelector('.wizard-coat');

  var changeFireballColor = function () {
    var randomFireballColor = window.FIREBALL_COLORS[getRandom(0, window.FIREBALL_COLORS.length)];
    setupFireball.style.background = randomFireballColor;
    var inputFireballColor = document.querySelector('input[name=fireball-color]');
    inputFireballColor.value = randomFireballColor;
  };

  var changeEyesColor = function () {
    var randomEyeColor = window.EYES_COLORS[getRandom(0, window.EYES_COLORS.length)];
    setupEyes.style.fill = randomEyeColor;
    var inputEyesColor = document.querySelector('input[name=eyes-color]');
    inputEyesColor.value = randomEyeColor;
  };

  var changeCoatColor = function () {
    var randomCoatColor = window.COAT_COLORS[getRandom(0, window.COAT_COLORS.length)];
    setupCoat.style.fill = randomCoatColor;
    var inputCoatColor = document.querySelector('input[name=coat-color]');
    inputCoatColor.value = randomCoatColor;
  };

  setupEyes.addEventListener('click', changeEyesColor);
  setupFireball.addEventListener('click', changeFireballColor);
  setupCoat.addEventListener('click', changeCoatColor);

  var similarListElement = window.userDialog.querySelector('.setup-similar-list');

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
    var nameWizard = window.WIZARD_NAMES[getRandom(0, window.WIZARD_NAMES.length)];
    var surnameWizard = window.SURNAMES[getRandom(0, window.SURNAMES.length)];
    var randomCoatColor = window.COAT_COLORS[getRandom(0, window.COAT_COLORS.length)];
    var randomEyeColor = window.EYES_COLORS[getRandom(0, window.EYES_COLORS.length)];

    var newWizard = {
      name: nameWizard + ' ' + surnameWizard,
      coatColor: randomCoatColor,
      eyeColor: randomEyeColor
    };

    wizards.push(newWizard);
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  window.userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();
