import Stats from './Stats.js';
import Party from './Party.js';
import { setupDiceUI } from './DiceRoller.js';

// Wait for the DOM to load before initializing any UI modules. Some browsers
// execute module scripts before the page is fully parsed which can lead to
// missing elements like the party section.
document.addEventListener('DOMContentLoaded', () => {
    setupDiceUI();

    const partyContainer = document.getElementById('party-section');
    if (!partyContainer) return;
    const party = new Party(partyContainer);
    party.addMember(
        new Stats({ name: 'Player', maxHp: 20, attack: 5, defense: 2 })
    );
});
