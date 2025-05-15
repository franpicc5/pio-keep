let noteId = 1;

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
    update(title, content, category) {
        this.title=title;
        this.content=content;
        this.category=category;
    }
}

export default Note;