chrome.runtime.onStartup.addListener(deleteData);

chrome.windows.onCreated.addListener(async () => {
  const windows = await chrome.windows.getAll();
  if (windows.length <= 1) {
    await deleteData();
  }
});

let deleting = false;

async function deleteData() {
  if (deleting) {
    return;
  }

  deleting = true;

  try {
    await chrome.browsingData.remove(
      {
        since: 0,
      },
      {
        appcache: true,
        cache: true,
        cacheStorage: true,
        // cookies: true,
        downloads: true,
        fileSystems: true,
        formData: true,
        history: true,
        // indexedDB: true,
        // localStorage: true,
        passwords: true,
        webSQL: true,
      }
    );
  } catch (e) {
    console.error(e);
    chrome.windows.create({
      url: "error.html",
      type: "popup",
    });
  } finally {
    deleting = false;
  }
}
