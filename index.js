(function () {
  var ele = null;
  var pollCount = 0;
  var pollMax = 10;
  var interval = setInterval(function () {
    ele = document.querySelector('.css-10o4wqw > div');
    if (ele !== null) {
      ele.innerText = 'Difficulty Hidden';
      ele.style.color = 'purple';
      clearInterval(interval);
    } else if (pollCount >= pollMax) {
      clearInterval(interval);
      return;
    } else {
      pollCount++;
    }
  }, 200);
})();
