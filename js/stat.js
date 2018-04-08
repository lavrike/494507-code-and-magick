'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var MAX_COLUMN_HEIGHT = 150;
var GAP = 50;
var barWidth = 40;


var getRandomColor = function () {
  var opacity = Math.random().toFixed(1);

  return 'rgba(0, 0, 255, ' + opacity + ')';
};

var getColor = function (condition) {
  return condition ? 'rgba(255, 0, 0, 1)' : getRandomColor();
};

var getMaxElement = function (times) {
  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  return max;
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(CLOUD_X + 10, CLOUD_Y + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var step = MAX_COLUMN_HEIGHT / (getMaxElement(times) - 0);
  var initialX = 120;
  var initialY = 80;
  var lineHeight = 15;

  for (var i = 0; i < times.length; i++) {
    var currentX = initialX + (GAP + barWidth) * i;
    var currentY = (MAX_COLUMN_HEIGHT - (times[i] * step)) + initialY;

    ctx.fillStyle = getColor(names[i] === 'Вы');
    ctx.fillRect(currentX, (MAX_COLUMN_HEIGHT - (times[i] * step)) + initialY + lineHeight, barWidth, times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), currentX, currentY);
    ctx.fillText(names[i], currentX, initialY + MAX_COLUMN_HEIGHT + barWidth);
  }
};
