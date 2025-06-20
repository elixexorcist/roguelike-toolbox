# Stats Module

`Stats.js` exports a small class used to track basic RPG statistics. The same structure can be used for the player, party members or enemies.

## Fields
- `name` – a label for the entity.
- `maxHp` – maximum hit points.
- `hp` – current hit points. Defaults to `maxHp` when a new object is created.
- `attack` – base attack value.
- `defense` – value subtracted from incoming damage.
- `speed` – order or movement rating.

## Methods
- `takeDamage(amount)` – applies damage after defense and lowers `hp` but never below zero. Returns the actual damage taken.
- `heal(amount)` – restores hit points up to `maxHp`.
- `isAlive()` – returns `true` if `hp` is above zero.

```javascript
import Stats from './Stats.js';

const hero = new Stats({ name: 'Hero', maxHp: 20, attack: 5 });
const goblin = new Stats({ name: 'Goblin', maxHp: 8, attack: 3, defense: 1 });

const dmg = hero.attack;
goblin.takeDamage(dmg);
```
