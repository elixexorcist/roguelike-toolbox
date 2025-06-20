export function setupBugReportUI() {
    const openButton = document.getElementById('bug-report-button');
    const dialog = document.getElementById('bug-dialog');
    const submit = document.getElementById('submit-bug');
    const cancel = document.getElementById('cancel-bug');
    const desc = document.getElementById('bug-description');
    const moduleSelect = document.getElementById('bug-module');

    if (!openButton || !dialog || !submit || !cancel || !desc || !moduleSelect) return;

    const sendReport = (text, module) => {
        const mod = module || 'site';
        const labelSlug = mod.replace(/\s+/g, '').toLowerCase();
        const labels = encodeURIComponent(`bug,${labelSlug}`);
        const body = encodeURIComponent(`Module: ${mod}\n\n${text.trim()}`);
        const title = encodeURIComponent('Bug Report');
        const url =
            `https://github.com/elixexorcist/roguelike-toolbox/issues/new?title=${title}&body=${body}&labels=${labels}`;
        window.open(url, '_blank');
    };

    openButton.addEventListener('click', () => {
        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            const text = prompt('Describe the bug');
            if (text) {
                const module = prompt('Affected module?', 'site');
                sendReport(text, module);
            }
        }
    });

    cancel.addEventListener('click', () => {
        dialog.close();
    });

    submit.addEventListener('click', () => {
        sendReport(desc.value, moduleSelect.value);
        dialog.close();
        desc.value = '';
    });
}
