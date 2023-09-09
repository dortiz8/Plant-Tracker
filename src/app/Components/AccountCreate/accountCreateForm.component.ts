import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from '../../shared/store';
import { AuthResponseBody } from "src/app/shared/models/IAuthResponse";
import { UserForAuthentication, UserForAuthenticationEncrypt } from "src/app/shared/models/UserForAuthentication";
import { AuthenticationService } from "src/app/shared/services/authentication/AuthenticationService";
import { ObjectMapper } from "src/app/shared/services/utils/objectMapper";
import { Observable } from "rxjs";
import { Auth } from "src/app/shared/models/Auth";
import { HOME_ROUTE } from "src/app/shared/constants/routes";
import { UserCreate } from "src/app/shared/models/UserCreate";


@Component({
    selector: 'account-create-form',
    templateUrl: './accountCreateForm.component.html',
    styleUrls: ['./accountCreateForm.component.css'],
    providers: []
})
export class AccountCreateFormComponent implements OnInit {

    private returnUrl: string | undefined;
    userCreate: UserCreate; 
    createUserForm: FormGroup;
    errorMessage$: Observable<string>;
    showError: boolean;
    user$: Observable<Auth>; 
    encrypedtUser: UserForAuthenticationEncrypt; 
    requiredEmailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    requiredUserNamePattern: string = "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"; 
    requiredPasswordPattern: string = "^(?=[a-zA-Z0-9._@]{9,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
    constructor(private store: Store<fromStore.UserState>, private location: Location, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.mapCreateForm(); 
       
        this.returnUrl = HOME_ROUTE; 
        this.errorMessage$ = this.store.select(fromStore.getCreateUserErrMessage); 
    }

    validateControl = (controlName: string) => {
       
        return this.createUserForm?.get(controlName)?.invalid && this.createUserForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) =>{
        return this.createUserForm.get(controlName)?.hasError(errorName); 
    }

    loginUser = (loginFormValue: any) => {
        this.showError = false; 
        const login = {...loginFormValue}; 
        
        //this.encryptPwdAndLoadUser(loginFormValue); 
        // if(this.encrypedtUser != null){

        // }
        // this.loadUser(); 
        const userForAuthentication = ObjectMapper.mapUserCreateToUserCreateLoad(login);
        console.log(userForAuthentication)
        this.store.dispatch(new fromStore.CreateUser(userForAuthentication)); 
    }; 

    cancelCreate(){
        this.location.back(); 
    }

    mapCreateForm(){
        this.userCreate = new UserCreate();
        this.createUserForm = new FormGroup({
            name: new FormControl(this.userCreate.name, [Validators.required]),
            lname: new FormControl(this.userCreate.lname, [Validators.required]),
            userName: new FormControl(this.userCreate.userName, [Validators.required]),
            email: new FormControl(this.userCreate.email, [Validators.required]),
            password: new FormControl(this.userCreate.password, [Validators.required]),
            repeatPassword: new FormControl(this.userCreate.repeatPassword, [Validators.required])
        })

        console.log(this.createUserForm)
    }

    passwordMatch(controlName: string, secondControlName: string ){
        return this.createUserForm.get(controlName)?.value === this.createUserForm.get(secondControlName)?.value; 
    }

    emailFormat(controlName: string){
        let regex = new RegExp(this.requiredEmailPattern);
        let value = this.createUserForm.get(controlName)?.value; 
        let match = regex.test(value)
        if (this.createUserForm?.get(controlName)?.touched) {
            return match;
        }
        return true
    }
    userNameFormat(controlName: string){
        let regex = new RegExp(this.requiredUserNamePattern);
        let value = this.createUserForm.get(controlName)?.value;
        let match = regex.test(value)
        if (this.createUserForm?.get(controlName)?.touched){
            return match; 
        }
        return true; 
    }

    passwordFormat(controlName: string){
        let regex = new RegExp(this.requiredPasswordPattern);
        let value = this.createUserForm.get(controlName)?.value;
        let match = regex.test(value)
        if (this.createUserForm?.get(controlName)?.touched) {
            return match;
        }
        return true;
    }

 }