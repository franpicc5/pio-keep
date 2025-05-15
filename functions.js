import User from './classes/User.js';
import Note from './classes/Note.js';
import Modification from './classes/Modification.js';
import ui from './dom.js';

let activeId = 0

let users = [];
users.push(new User("Emmanel Ganso", "2", "1"));
users.push(new User("Francisco Pizza", "uiop", "fpicca@pioix.edu.ar"));
users.push(new User("John Pork", "asdf", "jpork@pioix.edu.ar"));
users.push(new User("Don Satur", "bocaelmasgrande", "dsatur@pioix.edu.ar"));

function mostrarUsuarios() {
    for (let user of users) {
        console.log(user);
    }
}

window.mostrarUsuarios = mostrarUsuarios;

let notes = [];
notes.push(new Note("Tipos de barinrot", "Tralalero Tralala, Bombardiro Crocodilo, Tung Tung Tung Sahur", "Humor", [1]));
notes.push(new Note("Acordes menores", "La menor (Am), Re menor (Dm), Sol menor (Gm), Do menor (Cm)", "Música", [2]));
notes.push(new Note("Dirección Tropitango", "Gral. Pacheco 29131, B1618 El Talar, Provincia de Buenos Aires", "Direcciones", [3]));
notes.push(new Note("Sabores Don Satur", "Dulce, Salado, Negrito", "Comida", [4]));
notes.push(new Note("Jugadores de Boca", "Chiquito Romero, Carlos Tevez, Equi Fernández, Advíncula", "Deporte", [3, 4]));
notes.push(new Note("Jugadas piedra, papel o tijera", "Piedra, Papel, Tijera", "Entretenimiento", [1, 2]));
notes.push(new Note("Aeropuertos internacionales argentinos", "Ezeiza, Aeroparque, Córdoba, Rosario", "Lugares", [3]));
notes.push(new Note("Peliculas de Shrek", "Shrek, Shrek 2, Shrek 3, Shrek 4, El Gato con Botas, El Gato con Botas 2", "Entretenimiento", [1, 2, 3, 4]));
notes.push(new Note("Quesos Cremosos", "Cremigal, Cremac, El Emperador, Los Alisos, Melincué, Morando, Primer Premio, Sobrero y Cagnolo, Cuartirolo, La Paulina", "Comida", [1]));
notes.push(new Note("Pelados", "Indio Solari, La Roca, Vin Diesel, Luca Prodan, Omar Scarso, Charles Darwin, Hernán Carrafiello, Nicolás Facón", "Personas", [2]));

function mostrarNotas() {
    for (let note of notes) {
        console.log(note);
    }
}

window.mostrarNotas = mostrarNotas;

notes[0].update("Plantillas de momos :v", "Patricio, ¿estás loco?, ¡Abduzkhan!, Ella no te ama :,v, ¡Oh, mi lente de contacto :,,,V", "Humor", [1]);
notes[1].update("Acordes menores", "Do menor (Cm), Re menor (Dm), Mi menor (Em), Fa menor (Fm), Sol menor (Gm), La menor (Am), Si menor (Bm)", "Música", [2]);
notes[2].update("Dirección de La Jungla", "Güemes 4744,C1425BNT, C1425BNT Cdad. Autónoma de Buenos Aires", "Direcciones", [3]);

function loadNotes(userId) {
    for (let note of notes) {
        for (let user of note.users) {
            if (user == userId) {
                ui.createNote(note.noteId, note.title, note.content, note.category)
            }
        }
    }
}

function userExists(email, password) {
    let exists = -1;
    for (let user of users) {
        if ((user.email == email) && (user.password == password)) {
            exists = user.userId
            return exists;
        } else if (user.email == email) {
            exists = 0;
            ui.setUser(user.userName);
        }
    }
    return exists;
}

window.userExists = userExists;

function login() {
    let userId = userExists(ui.getEmail(), ui.getPassword());
    if (userId == -1) {
        alert("Error: \n No se encontró ningún usuario con ese email.");
    } else if (userId == 0) {
        alert("Error: \n Contraseña incorrecta.");
    } else {
        activeId = userId
        loadNotes(userId);
        ui.changeScreen();
        ui.clearLoginInputs();
        for (let user of users) {
            if (user.userId == userId) {
                ui.setUser(user.userName)
            }
        }
    }
}

window.login = login;

function emailExists(email, password, userName) {
    for (let user of users) {
        if (user.email == email) {
            return -1;
        }
        else if ((email == "") || (password == "") || (userName == "")) {
            return 0;
        }
    }
    users.push(new User(userName, password, email));
    return users[users.length - 1].userId
}

window.emailExists = emailExists;

function signIn() {
    let userId = emailExists(ui.getEmail(), ui.getPassword(), ui.getUser())
    if (userId == -1) {
        alert("Error: \n Email en uso.");
    } else if (userId == 0) {
        alert("Error: \n Contraseña, usuario y/o email incorrecto(s)");
    } else {
        activeId = userId
        ui.changeScreen();
        ui.clearLoginInputs();
        for (let user of users) {
            if (user.userId == userId) {
                ui.setUser(user.userName)
            }
        }
    }
}

window.signIn = signIn;

function confirmLogout() {
    ui.showModal("Cerrar Sesión", "¿Seguro que deseas cerrar sesión?")
    document.querySelector(".modal-footer").innerHTML = `
    <button type="button" class="btn btn-danger" id="confirmYes">Confirmar</button>
`;
    document.getElementById("confirmYes").onclick = function () {
        activeId = 0
        ui.clearLoginInputs();
        ui.changeScreen();
        let modalInstance = bootstrap.Modal.getInstance(document.getElementById('modal'));
        modalInstance.hide();
    };
}

window.confirmLogout = confirmLogout


function createNote(title, content, category, userId) {
    notes.push(new Note(title, content, category, userId));
    return notes[notes.length - 1].noteId
}

window.createNote = createNote

function newNote() {
    let title = ui.getNoteTitle();
    let content = ui.getNoteContent();
    let category = ui.getNoteCategory();
    if ((ui.getNoteTitle()=="") || (ui.getNoteContent() == "") || (ui.getNoteCategory() == "")) {
        alert("Error:\nCampo vacío, por favor rellenar todos");
    }
    else {
        let editorsId = [];
        editorsId.push(activeId);
        ui.createNote(createNote(title, content, category, editorsId), title, content, category);
        alert("La nota fue generada correctamente");
        console.log(notes)
    }
}

window.newNote = newNote

function modificationNote(title, content, category) {
    notes[0].update("Plantillas de momos :v", "Patricio, ¿estás loco?, ¡Abduzkhan!, Ella no te ama :,v, ¡Oh, mi lente de contacto :,,,V", "Humor", [1]);
    return notes[notes.length - 1].noteId
}