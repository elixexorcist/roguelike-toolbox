export function setupBugReportUI() {
    const openButton = document.getElementById('bug-report-button');
    const dialog = document.getElementById('bug-dialog');
    const submit = document.getElementById('submit-bug');
    const cancel = document.getElementById('cancel-bug');
    const desc = document.getElementById('bug-description');
    const moduleSelect = document.getElementById('bug-module');

    if (!openButton || !dialog || !submit || !cancel || !desc || !moduleSelect) return;

    openButton.addEventListener('click', () => {
        dialog.showModal();
    });

    cancel.addEventListener('click', () => {
        dialog.close();
    });

    submit.addEventListener('click', () => {
        const module = moduleSelect.value || 'site';
        const labelSlug = module.replace(/\s+/g, '').toLowerCase();
        const labels = encodeURIComponent(`bug,${labelSlug}`);
        const body = encodeURIComponent(`Module: ${module}\n\n${desc.value.trim()}`);
        const title = encodeURIComponent('Bug Report');
        const url = `https://github.com/elixexorcist/roguelike-toolbox/issues/new?title=${title}&body=${body}&labels=${labels}`;
        window.open(url, '_blank');
        dialog.close();
        desc.value = '';
    });
}
