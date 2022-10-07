if (!browser) var browser = chrome;

browser.runtime.onMessage.addListener(async (message, sender) => {
    const { action } = message;
    switch (action) {
        case 'INJECT_CSS':
            const css = (await browser.storage.sync.get()).custom_css || '';
            await chrome.scripting.insertCSS({
                origin: 'USER', css,
                target: {
                    tabId: sender.tab.id
                }
            });
            break;
        case 'OPEN_OPTIONS_PAGE':
            chrome.runtime.openOptionsPage();
            break;
        default:
            break;
    }
});
