'use strict';
(function () {
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {

    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target.cloneNode(true);
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      evt.dataTransfer.effectAllowed = 'copy';
    }
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
