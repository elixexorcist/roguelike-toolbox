export default class Party {
    constructor(container, slots = 4) {
        this.container = container;
        this.slots = slots;
        this.members = new Array(slots).fill(null);
        this.render();
    }

    addMember(member, index = this.members.indexOf(null)) {
        if (index < 0 || index >= this.slots) return false;
        this.members[index] = member;
        this.render();
        return true;
    }

    render() {
        this.container.innerHTML = '';
        const title = document.createElement('h2');
        title.textContent = 'Party';
        this.container.appendChild(title);

        for (let i = 0; i < this.slots; i++) {
            const slot = document.createElement('div');
            slot.className = 'party-member';
            const member = this.members[i];
            if (member) {
                const name = document.createElement('div');
                name.className = 'member-name';
                name.textContent = member.name;

                const stats = document.createElement('div');
                stats.className = 'member-stats';
                stats.textContent = `HP: ${member.hp}/${member.maxHp}  ATK: ${member.attack}  DEF: ${member.defense}`;
                slot.appendChild(name);
                slot.appendChild(stats);
            } else {
                slot.classList.add('empty');
                slot.textContent = 'Empty Slot';
            }
            this.container.appendChild(slot);
        }
    }
}
