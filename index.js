(function () {
  var ele = null;
  var pollCount = 0;
  var pollMax = 50;
  var interval = null;

  var changeDifficultyBadges = function () {
    setTimeout(() => {
      var spanList = document.querySelectorAll('td > span.round.label');
      for (let i = 0; i < spanList.length; i++) {
        var span = spanList[i];
        span.innerText = 'Hidden';
        span.style['background-color'] = 'purple';
      }
      clearInterval(interval);
    }, 0);
  };

  if (window.location.pathname === '/problemset/all/') {
    interval = setInterval(function () {
      ele = document.querySelector('select.form-control');
      if (ele !== null) {
        changeDifficultyBadges();
        clearInterval(interval);
        document
          .querySelector('tbody.reactable-pagination')
          .addEventListener('click', changeDifficultyBadges);
        document
          .querySelector('tr.reactable-column-header')
          .addEventListener('click', changeDifficultyBadges);
        document
          .querySelector('select.form-control')
          .addEventListener('change', changeDifficultyBadges);
      } else if (pollCount >= pollMax) {
        clearInterval(interval);
        return;
      } else {
        pollCount++;
      }
    }, 200);
  } else if (window.location.pathname.includes('/problems/')) {
    interval = setInterval(function () {
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

    (function hideDifficultyOfNextChallenges() {
      var head = document.head;
      var styleEle = document.createElement('style');
      var rule =
        'div.next-challenge__A4ZV > a.next-challenge-btn__L_19 { background-color: lavender; color: purple; border-color: purple; } div.next-challenge__A4ZV > a.next-challenge-btn__L_19:hover { background-color: lavender; color: purple; border-color: purple; }';
      styleEle.type = 'text/css';
      if (styleEle.styleSheet) {
        css.styleSheet.cssText = rule;
      } else {
        styleEle.appendChild(document.createTextNode(rule));
      }
      head.appendChild(styleEle);
    })();
  } else {
    return;
  }
})();
