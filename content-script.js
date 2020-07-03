var appendStyleToPage = function (rule, id) {
  var styleNode = document.createElement('style');
  styleNode.setAttribute('id', id);
  styleNode.classList.add('hide-lc-difficulty-style-node');
  styleNode.type = 'text/css';
  if (styleNode.styleSheet) {
    css.styleSheet.cssText = rule;
  } else {
    styleNode.appendChild(document.createTextNode(rule));
  }
  document.head.appendChild(styleNode);
};

var easyMedRule =
  '.td > span.round.label.label-success,' +
  '.td > span.round.label.label-warning {' +
  '  background-color: #ceff2f;' +
  '}' +
  '.css-10o4wqw > div.css-14oi08n,' +
  '.css-10o4wqw > div.css-dcmtd5 {' +
  '  color: #ceff2f;' +
  '}' +
  '.next-challenge__A4ZV > .M__1OuS,' +
  '.next-challenge__A4ZV > .E__2cGj {' +
  '  color: #dcff69;' +
  '  border-color: #dcff69;' +
  '  background-color: lavender;' +
  '}' +
  '.next-challenge__A4ZV > .H__3Dxi:hover,' +
  '.next-challenge__A4ZV > .M__1OuS:hover,' +
  '.next-challenge__A4ZV > .E__2cGj:hover {' +
  '  color: #ceff2f;' +
  '  border-color: #ceff2f;' +
  '}';

var medHardRule =
  '  .td > span.round.label.label-warning,' +
  '.td > span.round.label.label-danger {' +
  '  background-color: orangered;' +
  '}' +
  '.css-10o4wqw > div.css-dcmtd5,' +
  '.css-10o4wqw > div.css-t42afm {' +
  '  color: orangered;' +
  '}' +
  '.next-challenge__A4ZV > .H__3Dxi,' +
  '.next-challenge__A4ZV > .M__1OuS {' +
  '  color: #ff8d63;' +
  '  border-color: #ff8d63;' +
  '  background-color: lavender;' +
  '}' +
  '.next-challenge__A4ZV > .H__3Dxi:hover,' +
  '.next-challenge__A4ZV > .M__1OuS:hover {' +
  '  color: orangered;' +
  '  border-color: orangered;' +
  '}';

var hideAllRule =
  '.td > span.round.label {' +
  '  background-color: purple;' +
  '}' +
  '/* on problem page */' +
  '.css-10o4wqw > div.css-14oi08n,' +
  '.css-10o4wqw > div.css-dcmtd5,' +
  '.css-10o4wqw > div.css-t42afm {' +
  '  color: purple;' +
  '}' +
  '/* once solved */' +
  '.next-challenge__A4ZV > .H__3Dxi,' +
  '.next-challenge__A4ZV > .M__1OuS,' +
  '.next-challenge__A4ZV > .E__2cGj {' +
  '  color: #916c91;' +
  '  border-color: #916c91;' +
  '  background-color: lavender;' +
  '}' +
  '.next-challenge__A4ZV > .H__3Dxi:hover,' +
  '.next-challenge__A4ZV > .M__1OuS:hover,' +
  '.next-challenge__A4ZV > .E__2cGj:hover {' +
  '  color: purple;' +
  '  border-color: purple;' +
  '}';

var removeAllCSS = function () {
  var nodes = document.querySelectorAll('style.hide-lc-difficulty-style-node');
  nodes.forEach(ele => document.head.removeChild(ele));
};

var resetProblemSetAll = function () {
  removeAllCSS();
  var spanList = document.querySelectorAll(
    'td > span.round.label.label-success',
  );
  spanList.forEach(span => (span.innerText = 'Easy'));
  spanList = document.querySelectorAll('td > span.round.label.label-warning');
  spanList.forEach(span => (span.innerText = 'Medium'));
  spanList = document.querySelectorAll('td > span.round.label.label-danger');
  spanList.forEach(span => (span.innerText = 'Hard'));
};

var resetProblemPageDifficulty = function () {
  removeAllCSS();
  var node = document.querySelector('.css-10o4wqw > div');
  if (!node) return;
  if (node.className === 'css-14oi08n') {
    node.innerText = 'Easy';
  } else if (node.className === 'css-dcmtd5') {
    node.innerText = 'Medium';
  } else {
    node.innerText = 'Hard';
  }
};

var addListeners = function (cb) {
  if (window.location.pathname !== '/problemset/all/') return;

  var header = document.querySelector('tr.reactable-column-header');
  var pagination = document.querySelector('tbody.reactable-pagination');
  var select = document.querySelector('select.form-control');

  header.addEventListener('click', cb);
  pagination.addEventListener('click', cb);
  select.addEventListener('change', cb);
};

var removeListeners = function (cb) {
  var header = document.querySelector('tr.reactable-column-header');
  var pagination = document.querySelector('tbody.reactable-pagination');
  var select = document.querySelector('select.form-control');

  header.removeEventListener('click', cb);
  pagination.removeEventListener('click', cb);
  select.removeEventListener('change', cb);
};

var resetAllDifficulty = function () {
  if (window.location.pathname === '/problemset/all/') {
    removeListeners();
    resetProblemSetAll();
  }

  if (window.location.pathname.includes('/problems/')) {
    resetProblemPageDifficulty();
  }
};

var pageHasLoaded = function (callback) {
  var ele = null;
  var pollCount = 0;
  var pollMax = 50;
  var interval = null;

  if (window.location.pathname === '/problemset/all/') {
    interval = setInterval(function () {
      ele = document.querySelector('select.form-control');
      if (ele !== null) {
        callback();
        clearInterval(interval);
        document
          .querySelector('tbody.reactable-pagination')
          .addEventListener('click', callback);
        //TODO remove event listeners when extension is disabled
        document
          .querySelector('tr.reactable-column-header')
          .addEventListener('click', callback);
        document
          .querySelector('select.form-control')
          .addEventListener('change', callback);
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
        callback();
        clearInterval(interval);
      } else if (pollCount >= pollMax) {
        clearInterval(interval);
        return;
      } else {
        pollCount++;
      }
    }, 200);
  } else {
    return;
  }
};

var changeToEasyMed = function () {
  if (!document.getElementById('hide-lc-difficulty-easy-med')) {
    appendStyleToPage(easyMedRule, 'hide-lc-difficulty-easy-med');
  }

  spanList = document.querySelectorAll(
    'td > span.round.label.label-warning, td > span.round.label.label-success',
  );
  spanList.forEach(span => (span.innerText = 'Easy/Medium'));

  var node = document.querySelector('.css-10o4wqw > div');
  if (!node) return;
  if (node.className === 'css-14oi08n' || node.className === 'css-dcmtd5') {
    node.innerText = 'Easy/Medium';
  }
};

var changeToMedHard = function () {
  if (!document.getElementById('hide-lc-difficulty-med-hard')) {
    appendStyleToPage(easyMedRule, 'hide-lc-difficulty-med-hard');
  }

  spanList = document.querySelectorAll(
    'td > span.round.label.label-danger, td > span.round.label.label-success',
  );
  spanList.forEach(span => (span.innerText = 'Medium/Hard'));

  var node = document.querySelector('.css-10o4wqw > div');
  if (!node) return;
  if (node.className === 'css-t42afm' || node.className === 'css-dcmtd5') {
    node.innerText = 'Medium/Hard';
  }
};

var changeToHideAll = function () {
  appendStyleToPage(hideAllRule, 'hide-lc-difficulty-hide-all');

  spanList = document.querySelectorAll('td > span.round.label');
  spanList.forEach(span => (span.innerText = 'Difficulty Hidden'));

  // TODO wait for page to load
  var node = document.querySelector('.css-10o4wqw > div');
  if (!node) return;
  node.innerText = 'Difficulty Hidden';
};

var changePageContent = function (arg) {
  resetAllDifficulty();
  pageHasLoaded(function () {
    if (arg === 'easyMed') {
      changeToEasyMed();
      addListeners(changeToEasyMed);
    }
    if (arg === 'medHard') {
      changeToMedHard();
      addListeners(medHard);
    }
    if (arg === 'hideAll') {
      changeToHideAll();
      addListeners(hideAll);
    }
  });
};

// TODO write controller logic. if extension becomes inactive, resetalldifficulty
// if extension is already inactice, just don't take any action on the page
// create html form
// on off swtich for extension
// radio buttons for which type of hiding
