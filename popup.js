document.addEventListener("DOMContentLoaded", function () {
    const blockListTextArea = document.getElementById("blockList");
    const saveButton = document.getElementById("save");

    chrome.storage.sync.get({ blockedDomains: [] }, (data) => {
        blockListTextArea.value = data.blockedDomains.join("\n");
    });

    saveButton.addEventListener("click", () => {
        const newBlockList = blockListTextArea.value.split("\n").map(domain => domain.trim()).filter(domain => domain);
        chrome.storage.sync.set({ blockedDomains: newBlockList }, () => {
            alert("Block list updated!");
        });
    });
});