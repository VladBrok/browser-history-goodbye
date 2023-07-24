chrome.history.onVisited.addListener(deleteHistory);

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
