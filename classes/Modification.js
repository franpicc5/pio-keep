let modificationId = 1;

class Modification{
    constructor(title, content, category, date, userId){
        this.modificationId=modificationId;
        modificationId++;
        this.title=title;
        this.content=content;
        this.category=category;
        this.date=date
        this.users=userId;
    }
}

export default Modification;