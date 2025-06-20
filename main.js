import Stats from './Stats.js';
import Party from './Party.js';
import { setupDiceUI } from './DiceRoller.js';

// Wait for the DOM to load before initializing any UI modules. Some browsers
// execute module scripts before the page is fully parsed which can lead to
// missing elements like the party section.
function init() {
    setupDiceUI();

    const partyContainer = document.getElementById('party-section');
    if (!partyContainer) return;
    const party = new Party(partyContainer);
    party.addMember(
        new Stats({ name: 'Player', maxHp: 20, attack: 5, defense: 2 })
    );

    enableModuleDragging();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function enableModuleDragging() {
    const container = document.querySelector('.container');
    if (!container) return;

    container.querySelectorAll('.tool').forEach(mod => {
        mod.addEventListener('dragstart', () => {
            mod.classList.add('dragging');
        });
        mod.addEventListener('dragend', () => {
            mod.classList.remove('dragging');
        });
    });

    container.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = container.querySelector('.dragging');
        if (!dragging) return;
        const afterEl = getDragAfterElement(container, e.clientY);
        if (afterEl == null) {
            container.appendChild(dragging);
        } else {
            container.insertBefore(dragging, afterEl);
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.tool:not(.dragging)')];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}
