const checkbox = document.getElementById('checkbox');
const checkboxReveal = document.getElementById('checkbox-reveal');
const checkboxAcceptance = document.getElementById('checkbox-acceptance');
const group = document.getElementById('radio-group');
const easyMed = document.getElementById('easy-med');
const medHard = document.getElementById('med-hard');
const none = document.getElementById('hide-none');
const all = document.getElementById('all');
const url = [
  'https://leetcode.com/problemset/all/',
  'https://leetcode.com/problems/*',
];

// fetch state and update form to match
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(
    ['hidelcActive', 'hidelcRule', 'hidelcAcceptance', 'hidelcReveal'],
    ({ hidelcActive, hidelcRule, hidelcAcceptance, hidelcReveal }) => {
      setTimeout(toggleForm, 0);

      checkbox.checked = hidelcActive;
      checkboxAcceptance.checked = hidelcAcceptance;
      checkboxReveal.checked = hidelcReveal;

      if (hidelcRule === 'easyMed') {
        easyMed.checked = true;
      } else if (hidelcRule === 'medHard') {
        medHard.checked = true;
      } else if (hidelcRule === 'hideAll') {
        all.checked = true;
      }
    },
  );
});

const toggleForm = () => {
  document
    .querySelectorAll('input.dis')
    .forEach(node => (node.disabled = !checkbox.checked));
  checkboxReveal.disabled = !checkbox.checked;
  checkboxAcceptance.disabled = !checkbox.checked;

  document
    .querySelectorAll('label.dis')
    .forEach(node => (node.style.color = checkbox.checked ? '' : 'gray'));
  checkboxReveal.style.color = checkbox.checkbox ? '' : 'gray;';
  checkboxAcceptance.style.color = checkbox.checkbox ? '' : 'gray;';
};

// enable or disable form based on extension active
checkbox.addEventListener('change', () => {
  toggleForm();
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
  chrome.storage.local.set({ hidelcRule: 'easyMed' });
});

medHard.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'medHard' });
    });
  });
  chrome.storage.local.set({ hidelcRule: 'medHard' });
});

all.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'hideAll' });
    });
  });
  chrome.storage.local.set({ hidelcRule: 'hideAll' });
});

none.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcRule: 'none' });
    });
  });
  chrome.storage.local.set({ hidelcRule: 'none' });
});

checkboxReveal.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, { hidelcReveal: checkboxReveal.checked });
    });
  });
  chrome.storage.local.set({
    hidelcReveal: checkboxReveal.checked,
  });
});

checkboxAcceptance.addEventListener('change', () => {
  chrome.tabs.query({ url }, tabs => {
    tabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, {
        hidelcAcceptance: checkboxAcceptance.checked,
      });
    });
  });
  chrome.storage.local.set({
    hidelcAcceptance: checkboxAcceptance.checked,
  });
});
