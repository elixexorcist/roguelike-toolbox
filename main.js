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

    let startRects = new Map();
    let dragging = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragRect = null;

    container.querySelectorAll('.tool').forEach(mod => {
        mod.style.touchAction = 'none';

        mod.addEventListener('pointerdown', e => {
            e.preventDefault();
            dragging = mod;
            dragRect = mod.getBoundingClientRect();
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            dragging = mod;
            mod.classList.add('dragging');
            startRects.clear();
            container.querySelectorAll('.tool').forEach(el => {
                startRects.set(el, el.getBoundingClientRect());
            });
            mod.setPointerCapture(e.pointerId);
        });

        mod.addEventListener('pointermove', e => {
            if (dragging !== mod) return;
            e.preventDefault();
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            mod.style.transform = `translate(${dx}px, ${dy}px)`;

            const afterEl = getDragAfterElement(container, e.clientY);
            const needMove =
                (afterEl === null && container.lastElementChild !== mod) ||
                (afterEl !== null && afterEl.previousElementSibling !== mod);

            if (needMove) {
                startRects.clear();
                container.querySelectorAll('.tool').forEach(el => {
                    startRects.set(el, el.getBoundingClientRect());
                });

                if (afterEl == null) {
                    container.appendChild(mod);
                } else {
                    container.insertBefore(mod, afterEl);
                }
                animateReorder(startRects, container);
            }
        });

        const finishDrag = e => {
        });

        mod.addEventListener('pointerup', e => {
            if (dragging !== mod) return;
            dragging = null;
            mod.classList.remove('dragging');
            mod.style.transform = '';
            mod.releasePointerCapture(e.pointerId);
            startRects.clear();
            container.querySelectorAll('.tool').forEach(el => {
                startRects.set(el, el.getBoundingClientRect());
            });

            const afterEl = getDragAfterElement(container, e.clientY);
            if (afterEl == null) {
                container.appendChild(mod);
            } else {
                container.insertBefore(mod, afterEl);
            }

            animateReorder(startRects, container);
        };

        mod.addEventListener('pointerup', finishDrag);
        mod.addEventListener('pointercancel', finishDrag);
            animateReorder(startRects, container);
        });
            animateReorder(startRects, container);
        });
            mod.releasePointerCapture(e.pointerId);
            animateReorder(startRects, container);
        });

        mod.addEventListener('pointermove', e => {
            if (dragging !== mod) return;
            e.preventDefault();
            const afterEl = getDragAfterElement(container, e.clientY);
            if (afterEl == null) {
                container.appendChild(mod);
            } else {
                container.insertBefore(mod, afterEl);
            }
        });
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

function animateReorder(startRects, container) {
    container.querySelectorAll('.tool').forEach(el => {
        const start = startRects.get(el);
        if (!start) return;
        const end = el.getBoundingClientRect();
        const dx = start.left - end.left;
        const dy = start.top - end.top;
        if (dx || dy) {
            el.animate(
                [
                    { transform: `translate(${dx}px, ${dy}px)` },
                    { transform: 'translate(0, 0)' }
                ],
                {
                    duration: 200,
                    easing: 'ease'
                }
            );
        }
    });
}
