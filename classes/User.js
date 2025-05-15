let usersId = 1;

class User{
    constructor(userName, password, email){
        this.userName=userName;
        this.password=password;
        this.email=email;
        this.userId=usersId;
        usersId++;
    }
}

export default User;