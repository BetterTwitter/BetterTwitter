if (!browser) var browser = chrome;

(async () => await browser.runtime.sendMessage({ action: 'INJECT_CSS' }))();
const BT = {
    Plugin: class {
        /**
         *
         * @param {{
         *     name: string,
         *     description: string,
         *     plugin: Function
         * }} plugin
         */
        constructor(plugin) {
            plugin.plugin();
        }
    },
    /**
     * Opens a dialog
     * @param {string} title
     * @param {string} content
     */
    openDialog: (title, content) => {
        const dialog = document.createElement('div');
        dialog.classList.add('dialog');
        dialog.setAttribute('aria-modal', true);
        dialog.setAttribute('role', 'dialog');
        dialog.innerHTML = `
<div class="bg-color"></div>
<div class="dialog-container">
    <div class="dialog-header">
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
                <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z" />
            </g>
        </svg>
        <span>${title}</span>
    </div>
    ${content}
</div>
`;
        document.body.appendChild(dialog);
        dialog.querySelector('.dialog-header svg').addEventListener('click', (e) => {
            return (e.target.tagName === 'path' ?
                    e.target.parentElement.parentElement.parentElement.parentElement.parentElement :
                    e.target.parentElement.parentElement.parentElement
            ).remove();
        });
    },
    LeftSidebar: {
        /**
         * @param {{
         *     label: string,
         *     link?: string,
         *     action?: Function
         * }} item
         */
        addItem: (item) => {
            if (!item.link && !item.action) {
                throw new Error('You must specify either the link or the action');
            }
            const sidebarItem = document.createElement(item.link ? 'a' : 'div');
            sidebarItem.setAttribute('aria-label', item.label);
            sidebarItem.setAttribute('role', item.link ? 'link' : 'button');
            sidebarItem.className = item.link ?
                'css-4rbku5 css-18t94o4 css-1dbjc4n r-1habvwh r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-oyd9sg r-13qz1uu' :
                'css-18t94o4 css-1dbjc4n r-1habvwh r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-oyd9sg r-13qz1uu';
            if (item.link) {
                sidebarItem.setAttribute('href', item.link);
            } else {
                sidebarItem.addEventListener('click', item.action);
            }
            const sidebarItemContainer = document.createElement('div');
            sidebarItemContainer.className = 'css-1dbjc4n r-1awozwy r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-xyw6el r-o7ynqc r-6416eg';
            sidebarItem.addEventListener('mouseenter', () => sidebarItemContainer.className = 'css-1dbjc4n r-1awozwy r-1hdo0pc r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-xyw6el r-o7ynqc r-6416eg');
            sidebarItem.addEventListener('mouseleave', () => sidebarItemContainer.className = 'css-1dbjc4n r-1awozwy r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-xyw6el r-o7ynqc r-6416eg');
            sidebarItemContainer.innerHTML = `
                <div class="css-1dbjc4n">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                        <g>
                            <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z" />
                        </g>
                    </svg>
                </div>
                <div dir="auto" class="css-901oao css-1hf3ou5 r-1nao33i r-37j5jr r-adyw6z r-16dba41 r-135wba7 r-1joea0r r-88pszg r-bcqeeo r-qvutc0">
                    <span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">${item.label}</span>
                </div>
            `;
            const sidebar = document.querySelector('nav.css-1dbjc4n.r-eqz5dr');
            //if (!sidebar) setTimeout(() => sidebar.appendChild(sidebarItem), 1000);
            sidebarItem.appendChild(sidebarItemContainer);
            sidebar.appendChild(sidebarItem);
        }

    }
};

setTimeout(() => {
    BT.LeftSidebar.addItem({
        label: 'BetterTwitter',
        action: async () => {
            await browser.runtime.sendMessage({ action: 'OPEN_OPTIONS_PAGE' });
        }
    });
}, 1000);
