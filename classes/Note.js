let noteId = 1;
import Modification from './Modification.js';

class Note{
    constructor(title, content, category, usersId){
        this.noteId=noteId;
        noteId++;
        this.title=title;
        this.content=content;
        this.category=category;
        this.users=usersId;
        this.modifications = [];
    }
    update(newTitle, newContent, newCategory, userId) {
        let date = new Date().toISOString().slice(0, 10);
        let nuevaModificacion = new Modification(this.title, this.content, this.category, date, userId);
        this.modifications.push(nuevaModificacion);
        this.title = newTitle;
        this.content = newContent;
        this.category = newCategory;
    }
}

export default Note;