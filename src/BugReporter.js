export function setupBugReportUI() {
    const button = document.getElementById('submit-bug');
    const input = document.getElementById('bug-description');
    if (!button || !input) return;
    button.addEventListener('click', () => {
        const body = encodeURIComponent(input.value.trim());
        const title = encodeURIComponent('Bug Report');
        const url = `https://github.com/elixexorcist/roguelike-toolbox/issues/new?title=${title}&body=${body}`;
        window.open(url, '_blank');
    });
}
