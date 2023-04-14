import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromStore from '../../shared/store';
import { AuthResponseBody } from "src/app/shared/models/IAuthResponse";
import { UserForAuthentication } from "src/app/shared/models/UserForAuthentication";
import { AuthenticationService } from "src/app/shared/services/authentication/AuthenticationService";
import { ObjectMapper } from "src/app/shared/services/utils/objectMapper";
import { Observable } from "rxjs";
import { Auth } from "src/app/shared/models/Auth";


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
    //@Output() isAuthenticated = new EventEmitter<boolean>();

    constructor(private store: Store<fromStore.UserState>, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl("username", [Validators.required]),
            password: new FormControl("password", [Validators.required])
        })
        this.returnUrl = '/home'; 
        this.errorMessage$ = this.store.select(fromStore.getUserErrMessage); 
       //this.authService.expirationCheck(); 
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
        const userForAuthentication = ObjectMapper.mapUserLoad(login, "api/authentication/authenticate"); 
        console.log(userForAuthentication)
        this.store.dispatch(new fromStore.LoadUser(userForAuthentication)); 

        //var authorized = this.authService.authenticateUser("api/authentication/authenticate", userForAuthentication); 
        // console.log(authorized); 
        // if (authorized.isAuthSuccessful){
        //     this.router.navigate([this.returnUrl]).then(() => window.location.reload());
        // }else{
        //     this.errorMessage = authorized.errorMessage; 
        //     this.showError = true;
        // }
    }

    
 }