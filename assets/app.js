// Makeup Class: Represents a Makeup
class Makeup {
    constructor(name, brand, code) {
        this.name = name;
        this.brand = brand;
        this.code = code;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayMakeups() {
        const StoredMakeups = [
            {
                name: 'Lipstick',
                brand: 'NYX',
                code: '001'
            },
            {
                name: 'Foundation',
                brand: 'Maybelline',
                code: '002'
            }
        ];

        const makeups = StoredMakeups;

        makeups.forEach((makeup) => UI.addMakeupToList(makeup));

    }

    static addMakeupToList(makeup){
        const list = document.querySelector('#makeup-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${makeup.name}</td>
            <td>${makeup.brand}</td>
            <td>${makeup.code}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
}
// Store Class: Handles Storage

// Event: Display Makeup
document.addEventListener('DOMContentLoaded', UI.displayMakeups)
// Event: Add a Makeup

// Event: Remove a Makeup