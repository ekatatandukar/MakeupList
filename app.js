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
        const makeups = Store.getMakeups();

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

    static deleteMakeup(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-$(className)`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.makeup-container');
        const form = document.querySelector('#makeup-form');
        container.insertBefore(div, form);
        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#brand').value = '';
        document.querySelector('#code').value = '';

    }
}
// Store Class: Handles Storage
class Store {
    static getMakeups() {
        let makeups;
        if(localStorage.getItem('makeups') === null) {
            makeups = [];
        } else {
            makeups = JSON.parse(localStorage.getItem('makeups'));
        }

        return makeups;
    }

    static  addMakeup(makeup) {
        const makeups = Store.getMakeups();
        makeups.push(makeup);
        localStorage.setItem('makeups', JSON.stringify(makeups));
    }

    static removeMakeup(code) {
        const makeups = Store.getMakeups();
        
        makeups.forEach((makeup, index) => {
            if(makeup.code === code) {
                makeups.splice(index,1);
            }
        });
        
        localStorage.setItem('makeups', JSON.stringify(makeups));
    }

}


// Event: Display Makeup
document.addEventListener('DOMContentLoaded', UI.displayMakeups)

// Event: Add a Makeup
document.querySelector('#makeup-form').addEventListener('submit', (e) => { 
    // Prevent actual submit
    e.preventDefault();

    //Get form values
    const name = document.querySelector('#name').value;
    const brand = document.querySelector('#brand').value;
    const code = document.querySelector('#code').value;

    //Validate
    if(name === '' || brand === '' || code === '') {
        UI.showAlert('Please fill in all the fields', 'success');
    } else {
            //Instatiate book
        const makeup = new Makeup(name, brand, code);

        // Add Makeup to UI
        UI.addMakeupToList(makeup);

        // Add makeup to store
        Store.addMakeup(makeup);

        // Show success message 
        UI.showAlert('Makeup Added', 'success');
        

        //Clear fields
        UI.clearFields();
    }
}
);

// Event: Remove a Makeup
document.querySelector('#makeup-list').addEventListener('click', (e) => {
    
    // Remove makeup from UI
    UI.deleteMakeup(e.target);

    // Remove makeuo from store
    Store.removeMakeup(e.target.parentElement.previousElementSibling.textContent);

    // Show deleted makeup success message 
    UI.showAlert('Makeup deleted', 'success');
});