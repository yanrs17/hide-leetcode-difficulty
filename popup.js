const checkbox = document.getElementById('checkbox');
const group = document.getElementById('radio-group');
const easyMed = document.getElementById('easy-med');
const medHard = document.getElementById('med-hard');
const all = document.getElementById('all');
const url = [
  'https://leetcode.com/problemset/all/',
  'https://leetcode.com/problems/*'
];

chrome.storage.local.get(
  ['hidelcActive', 'hidelcRule'],
  ({ hidelcActive, hidelcRule }) => {
    if (hidelcActive) {
      checkbox.checked = true;
      if (hidelcRule === 'easyMed') {
        easyMed.checked = true;
      } else if (hidelcRule === 'medHard') {
        medHard.checked = true;
      } else if (hidelcRule === 'hideAll') {
        all.checked = true;
      }
    }
  }
);

checkbox.addEventListener('change', () => {
  document
    .querySelectorAll('input.dis')
    .forEach(node => (node.disabled = !checkbox.checked));

  document
    .querySelectorAll('label.dis')
    .forEach(node => (node.style.color = checkbox.checked ? '' : 'gray'));
});

checkbox.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.storage.local.set({ hidelcActive: checkbox.checked });
      chrome.tabs.sendMessage(id, { hidelcActive: checkbox.checked });
    });
  });
});

easyMed.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'easyMed' });
    });
  });
  if (!checkbox.checked) checkbox.checked = true;
  chrome.storage.local.set({ hidelcActive: true, hidelcRule: 'easyMed' });
});

medHard.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'medHard' });
    });
  });

  if (!checkbox.checked) checkbox.checked = true;
  chrome.storage.local.set({ hidelcActive: true, hidelcRule: 'medHard' });
});

all.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'hideAll' });
    });
  });
  if (!checkbox.checked) checkbox.checked = true;
  chrome.storage.local.set({ hidelcActive: true, hidelcRule: 'hideAll' });
});
