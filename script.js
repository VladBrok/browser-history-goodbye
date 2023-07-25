chrome.runtime.onStartup.addListener(deleteHistory);

chrome.windows.onRemoved.addListener(deleteHistory);

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
