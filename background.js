chrome.storage.sync.get({ blockedDomains: [] }, (data) => {
    chrome.storage.sync.set({ blockedDomains: data.blockedDomains });
});

function parseBlockedDomains(rawDomains) {
    return rawDomains
        .map(domain => domain.replace(/"/g, '').trim())
        .flatMap(domain => domain.split(','))
        .map(domain => domain.trim())
        .filter(domain => domain.length > 0);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
    if (changeInfo.url) {
        chrome.storage.sync.get("blockedDomains", (data) => {
            let blockedDomains = parseBlockedDomains(data.blockedDomains || []);
            if (blockedDomains.some(domain => changeInfo.url.includes(domain))) {
                console.log(`Blocked: ${changeInfo.url}`);
                chrome.tabs.remove(tabId);
            }
        });
    }
});