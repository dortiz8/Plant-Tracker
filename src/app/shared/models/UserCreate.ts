export class UserCreate{
    name: string | undefined;
    lname: string | undefined; 
    userName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    repeatPassword: string | undefined;
}

export class UserCreateLoad{
    user: UserCreate; 
}