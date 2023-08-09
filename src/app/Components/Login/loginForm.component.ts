import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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


@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.css'],
    providers: []
})
export class LoginFormComponent implements OnInit {

    private returnUrl: string | undefined;

    loginForm: FormGroup;
    errorMessage$: Observable<string>;
    showError: boolean;
    user$: Observable<Auth>; 
    encrypedtUser: UserForAuthenticationEncrypt; 
    constructor(private store: Store<fromStore.UserState>, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl("username", [Validators.required]),
            password: new FormControl("password", [Validators.required])
        })
        this.returnUrl = HOME_ROUTE; 
        this.errorMessage$ = this.store.select(fromStore.getUserErrMessage); 
    }

    validateControl = (controlName: string) => {
        return this.loginForm?.get(controlName)?.invalid && this.loginForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) =>{
        return this.loginForm.get(controlName)?.hasError(errorName); 
    }

    loginUser = (loginFormValue: any) => {
        this.showError = false; 
        const login = {...loginFormValue}; 
        //this.encryptPwdAndLoadUser(loginFormValue); 
        // if(this.encrypedtUser != null){

        // }
        // this.loadUser(); 
        const userForAuthentication = ObjectMapper.mapUserLoad(login, "api/authentication/authenticate"); 
        console.log(userForAuthentication)
        this.store.dispatch(new fromStore.LoadUser(userForAuthentication)); 
    }; 

    // encryptPwdAndLoadUser = (loginFormValue: any) => {
    //     const login = { ...loginFormValue };
    //     const encryptedPwd = AuthenticationService.encryptPwd(login.password); 

    //     encryptedPwd.then((result) => {
    //         const encryptUser = new UserForAuthenticationEncrypt(login.username, result);
    //         this.encrypedtUser = encryptUser; 
    //         console.log(this.encrypedtUser, ' encrypted user'); 
    //         this.loadUser(); 
    //     }).catch((err) => {
    //         this.showError = true; 
    //         return err; 
    //     });

    // }
    // loadUser = () =>{
    //     const userForAuthentication = ObjectMapper.mapUserLoad(this.encrypedtUser, "api/authentication/authenticate");
    //     console.log(userForAuthentication)
    //     this.store.dispatch(new fromStore.LoadUser(userForAuthentication));
    // }
    
 }