// Basic stats representation for characters and enemies
// Can be imported in browser scripts using a module loader or <script type="module">
export default class Stats {
    constructor({
        name = '',
        maxHp = 10,
        hp = maxHp,
        attack = 1,
        defense = 0,
        speed = 1
    } = {}) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
    }

    takeDamage(amount) {
        const actual = Math.max(0, amount - this.defense);
        this.hp = Math.max(0, this.hp - actual);
        return actual;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    isAlive() {
        return this.hp > 0;
    }
}
