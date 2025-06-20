export function setupBugReportUI() {
    const openButton = document.getElementById('bug-report-button');
    const dialog = document.getElementById('bug-dialog');
    const submit = document.getElementById('submit-bug');
    const cancel = document.getElementById('cancel-bug');
    const desc = document.getElementById('bug-description');
    const moduleSelect = document.getElementById('bug-module');

    if (!openButton || !dialog || !submit || !cancel || !desc || !moduleSelect) return;

    const sendReport = async (text, module) => {
        const mod = module || 'site';
        const labelSlug = mod.replace(/\s+/g, '').toLowerCase();
        const labels = ['bug', labelSlug];
        const body = `Module: ${mod}\nBrowser: ${navigator.userAgent}\n\n${text.trim()}`;
        const title = 'Bug Report';
        const token = window.BUG_REPORT_TOKEN;

        if (token) {
            try {
                const res = await fetch(
                    'https://api.github.com/repos/elixexorcist/roguelike-toolbox/issues',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `token ${token}`
                        },
                        body: JSON.stringify({ title, body, labels })
                    }
                );

                if (res.ok) {
                    alert('Thank you! Your bug report has been submitted.');
                    return;
                } else {
                    console.error('GitHub API error', await res.text());
                }
            } catch (err) {
                console.error('Failed to create issue via API', err);
            }
        }

        const encodedLabels = encodeURIComponent(labels.join(','));
        const encodedBody = encodeURIComponent(body);
        const encodedTitle = encodeURIComponent(title);
        const url =
            `https://github.com/elixexorcist/roguelike-toolbox/issues/new?title=${encodedTitle}&body=${encodedBody}&labels=${encodedLabels}`;
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
