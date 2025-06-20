export function rollExpression(expr) {
    expr = expr.replace(/\s+/g, '');
    const tokens = expr.match(/[+-]?\d+d\d+|[+-]?\d+/g);
    if (!tokens) return { total: NaN, breakdown: '' };
    let total = 0;
    let breakdown = [];
    for (const token of tokens) {
        let sign = 1;
        let t = token;
        if (t[0] === '+' || t[0] === '-') {
            sign = t[0] === '-' ? -1 : 1;
            t = t.slice(1);
        }
        if (t.includes('d')) {
            const [num, sides] = t.split('d').map(Number);
            for (let i = 0; i < num; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                total += sign * roll;
                breakdown.push(`${sign === -1 ? '-' : ''}${roll}`);
            }
        } else {
            total += sign * parseInt(t, 10);
            breakdown.push(`${sign === -1 ? '-' : ''}${parseInt(t, 10)}`);
        }
    }
    return { total, breakdown: breakdown.join(' + ') };
}

export function setupDiceUI() {
    const historyDiv = document.getElementById('history');

    document.getElementById('roll').onclick = () => {
        const expr = document.getElementById('expression').value;
        const res = rollExpression(expr);
        if (isNaN(res.total)) {
            document.getElementById('result').textContent = 'Invalid expression.';
        } else {
            const text = `${expr} = ${res.total} (rolled: ${res.breakdown})`;
            document.getElementById('result').textContent = text;
            const entry = document.createElement('div');
            entry.textContent = text;
            historyDiv.prepend(entry);
        }
    };

    document.getElementById('clear-history').onclick = () => {
        historyDiv.innerHTML = '';
    };

    document.querySelectorAll('#dice-buttons button[data-dice]').forEach(btn => {
        btn.onclick = () => {
            const dice = btn.getAttribute('data-dice');
            const input = document.getElementById('expression');
            input.value += (input.value ? '+' : '') + '1d' + dice;
        };
    });

    document.getElementById('custom').onclick = () => {
        const sides = prompt('Number of sides?');
        if (!sides) return;
        const input = document.getElementById('expression');
        input.value += (input.value ? '+' : '') + '1d' + parseInt(sides, 10);
    };
}
