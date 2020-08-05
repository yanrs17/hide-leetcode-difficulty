chrome.runtime.onMessage.addListener();
chrome.webRequest.onCompleted.addListener(
  ({ url }) => {
    if (
      url.includes('https://leetcode.com/problems/') &&
      url.includes('/submit/')
    ) {
      //start part 1
      //timeout to change state
      chrome.storage.local.set({ hidelcSubmitted: true });
      setTimeout(
        () => chrome.storage.local.set({ hidelcSubmitted: false }),
        1000 * 20,
      );
    } else if (url === 'https://leetcode.com/graphql') {
      chrome.storage.local.get(['hidelcSubmitted'], ({ hidelcSubmitted }) => {
        if (!hidelcSubmitted) return;
        chrome.tabs.query({ active: true }, tabs => {
          debugger;
          chrome.tabs.sendMessage(tabs[0].id, { hidelcReveal: true });
        });
      });
    }
  },
  {
    urls: [
      'https://leetcode.com/graphql',
      'https://leetcode.com/problems/*/submit/',
    ],
  },
);
