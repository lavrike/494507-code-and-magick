
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill =
    wizard.eyeColor;

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
