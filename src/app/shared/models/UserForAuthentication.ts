export interface UserForAuthentication{
    username: string, 
    password: any
}

export class UserForAuthenticationEncrypt{
    /**
     *
     */
    constructor(userName: string, password: ArrayBuffer) {
       this.username = userName;
       this.password = password; 

    }
   username: string;  
   password: ArrayBuffer
}