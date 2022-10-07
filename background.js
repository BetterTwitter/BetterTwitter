if (!browser) var browser = chrome;

const TWITTER_URLS = ['*://twitter.com/*', '*://mobile.twitter.com/*'];
const ITEMS_IDS = {
    BT_OPTIONS: 'BT_OPTIONS',
};

function onCreated() {
    if (browser.runtime.lastError) {
        console.error(browser.runtime.lastError.message);
    } else {
        console.log('Item created successfully');
    }
}

browser.contextMenus.create({
    id: ITEMS_IDS.BT_OPTIONS,
    title: 'Manage BetterTwitter options',
    contexts: ['all'],
    documentUrlPatterns: TWITTER_URLS
}, onCreated);

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case ITEMS_IDS.BT_OPTIONS:
            chrome.runtime.openOptionsPage();
            break;
    }
});

browser.runtime.onMessage.addListener(async (message, sender) => {
    const { action } = message;
    if (action === 'INJECT_CSS') {
        const css = (await browser.storage.sync.get()).custom_css || '';
        await chrome.scripting.insertCSS({
            origin: "USER", css,
            target: {
                tabId: sender.tab.id
            }
        });
    }
});
