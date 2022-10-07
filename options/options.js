if (!browser) var browser = chrome;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
}

document.querySelector('.toggle-theme')?.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }
});

(async () => {
    document.querySelector('.custom-css .list-content textarea').value = (await browser.storage.sync.get()).custom_css;
})();

const openDialog = (title, content) => {
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

const plugins = [
    {
        name: 'Hello',
        url: 'https://github.com/',
        enabled: true,
        plugin: `const plugin = new BT.Plugin({
    name: 'plugin',
    description: 'this is my plugin',
});

BT.openDialog('idk', 'idk');`,
        description: 'idk'
    }
];
const themes = [
    {
        name: 'Hello',
        url: 'https://github.com/',
        enabled: true,
        description: 'idk'
    }
];
let pluginsListHtml = '';
let themesListHtml = '';

pluginsListHtml += plugins.map(plugin => {
    let id = plugin.name.toLowerCase().replaceAll(' ', '-') + '-plugin';
    return `
<label for="${id}" style="display: flex; justify-content: space-between; align-items: center">
    <div style="display: flex; gap: 8px;">
        <input type="checkbox" id="${id}" checked="${plugin.enabled}" />
        <div style="display: flex; flex-direction: column">
            <span style="font-size: 1.1rem">${plugin.name}</span>
            <span>${plugin.description}</span>
        </div>
    </div>
    <div class="links">
        <a href="#">a</a>
    </div>
</label>`;
});
themesListHtml += themes.map(theme => {
    let id = theme.name.toLowerCase().replaceAll(' ', '-') + '-theme';
    return `
<label for="${id}" style="display: flex; justify-content: space-between; align-items: center">
    <div style="display: flex; gap: 8px;">
        <input type="checkbox" id="${id}" checked="${theme.enabled}" />
        <div style="display: flex; flex-direction: column">
            <span style="font-size: 1.1rem">${theme.name}</span>
            <span>${theme.description}</span>
        </div>
    </div>
    <div class="links">
        <a href="#">a</a>
    </div>
</label>`;
});

document.querySelector('.plugins-list .list-content').innerHTML = pluginsListHtml;
document.querySelector('.themes-list .list-content').innerHTML = themesListHtml;

document.querySelector('.plugins-list button').addEventListener('click', () => {
    openDialog(
        'Add a plugin',
        `<div class="dialog-content" style="display: flex; flex-direction: column; gap: 10px;">
                <input type="url" placeholder="Plugin URL" name="url" autofocus style="width: 400px;" />
                <button>Add plugin</button>
            </div>`
    );
});
document.querySelector('.themes-list button').addEventListener('click', () => {
    openDialog(
        'Add a theme',
        `<div class="dialog-content" style="display: flex; flex-direction: column; gap: 10px;">
                <input type="url" placeholder="Theme URL" name="url" autofocus style="width: 400px;" />
                <button>Add theme</button>
            </div>`
    );
});
document.querySelector('.custom-css button').addEventListener('click', async () => {
    document.querySelector('.custom-css button').setAttribute('disabled', '');
    document.querySelector('.custom-css .list-content textarea').setAttribute('disabled', '');
    await browser.storage.sync.set({
        custom_css: document.querySelector('.custom-css .list-content textarea').value
    }).then(() => {
        document.querySelector('.custom-css button').removeAttribute('disabled');
        document.querySelector('.custom-css .list-content textarea').removeAttribute('disabled');
    });
});
