chrome.runtime.onMessage.addListener();

// triggering a reveal requires two network requests in succession
// the first is a problem/submit, the second is a graphql request
// which fetches the next suggested problems. If these requests happen
// within 15 seconds of each other, it's a solve
chrome.webRequest.onCompleted.addListener(
  ({ url }) => {
    chrome.storage.local.get(['hidelcReveal'], ({ hidelcReveal }) => {
      // if this feature is disabled, return
      if (!hidelcReveal) return;
      if (
        url.includes('https://leetcode.com/problems/') &&
        url.includes('/submit/')
      ) {
        chrome.storage.local.set({ hidelcSubmitted: true });
        // disables the reveal if no graphql request is made in 15 seconds
        setTimeout(
          () => chrome.storage.local.set({ hidelcSubmitted: false }),
          1000 * 15,
        );
      } else if (url === 'https://leetcode.com/graphql') {
        chrome.storage.local.get(['hidelcSubmitted'], ({ hidelcSubmitted }) => {
          // disables the reveal if no problem/submit request has been made in the last 15 seconds
          if (!hidelcSubmitted) return;
          chrome.tabs.query({ active: true }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { hidelcRevealEvent: true });
          });
        });
      }
    });
  },
  {
    urls: [
      'https://leetcode.com/graphql',
      'https://leetcode.com/problems/*/submit/',
    ],
  },
);
