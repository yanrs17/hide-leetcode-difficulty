var checkbox = document.getElementById('checkbox');
var group = document.getElementById('radio-group');
checkbox.addEventListener('change', function () {
  document
    .querySelectorAll('input.dis')
    .forEach(node => (node.disabled = !checkbox.checked));

  document
    .querySelectorAll('label.dis')
    .forEach(node => (node.style.color = checkbox.checked ? '' : 'gray'));
});

console.log(chrome.tabs);

// chrome.tabs.executeScript(null, null, function () {
//   console.log('this should appear in every tab');
// });
