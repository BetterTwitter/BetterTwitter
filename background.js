const TWITTER_URLS = ['*://twitter.com/*', '*://mobile.twitter.com/*'];
const ITEMS_IDS = {
    MANAGE_PLUGINS_THEMES: 'MANAGE_PLUGINS_THEMES',
};

function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log('Item created successfully');
    }
}

browser.contextMenus.create({
    id: ITEMS_IDS.MANAGE_PLUGINS_THEMES,
    title: 'Manage plugins and themes',
    contexts: ['all'],
    documentUrlPatterns: TWITTER_URLS
}, onCreated);

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'log-selection':
            console.log(info.selectionText);
            break;
        // …
    }
});
function onError(error) {
    console.log(`Error: ${error}`);
}
const css = browser.tabs.insertCSS({
    code: `body {
  font-size: 2rem;
}`
});
css.then(null, onError);

browser.runtime.onMessage.addListener((message) => {
    console.log(message);
});
