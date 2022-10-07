if (!browser) var browser = chrome;

(async () => await browser.runtime.sendMessage({ action: 'INJECT_CSS' }))();
const BT = {
    Plugin: class {
        /**
         *
         * @param {{
         *     name: string,
         *     description: string
         * }} plugin
         */
        constructor(plugin) {
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
    }
};
