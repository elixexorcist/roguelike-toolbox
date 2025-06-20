import Stats from './Stats.js';
import Party from './Party.js';
import { setupDiceUI } from './DiceRoller.js';

setupDiceUI();

const partyContainer = document.getElementById('party-section');
const party = new Party(partyContainer);
party.addMember(new Stats({ name: 'Player', maxHp: 20, attack: 5, defense: 2 }));
