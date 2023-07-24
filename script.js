let tabCount = 0;

chrome.tabs.onCreated.addListener((tab) => {
  tabCount++;
  console.log("Tab created event caught. Open tabs #: " + tabCount);
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  tabCount = Math.max(0, tabCount - 1);
  console.log("Tab removed event caught. Open tabs #: " + tabCount);

  if (tabCount == 0) {
    await deleteHistory();
  }
});

async function deleteHistory() {
  try {
    await chrome.history.deleteAll();
  } catch (e) {
    console.error(e);
    chrome.windows.create({
      url: "error.html",
      type: "popup",
    });
  }
}
