import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthResponseBody } from "src/app/shared/models/IAuthResponse";
import { UserForAuthentication } from "src/app/shared/models/IUser";
import { AuthenticationService } from "src/app/shared/services/authentication/AuthenticationService";


@Component({
    selector: 'login-form',
    templateUrl: './loginForm.component.html',
    styleUrls: ['./loginForm.component.css'],
    providers: []
})
export class LoginFormComponent implements OnInit {

    private returnUrl: string | undefined;

    loginForm: FormGroup;
    errorMessage: string = '';
    showError: boolean;
    //@Output() isAuthenticated = new EventEmitter<boolean>();

    constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl("username", [Validators.required]),
            password: new FormControl("password", [Validators.required])
        })
        this.returnUrl = '/home'; 
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

        const userForAuthentication: UserForAuthentication = {
            username: login.username, 
            password: login.password
        }

        this.authService.loginUser("api/authentication/authenticate", userForAuthentication).subscribe({
            next: (res: AuthResponseBody)=>{
                localStorage.setItem("token", res.token);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("isAuth", res.isAuthSuccessful.toString());
                localStorage.setItem("userId", res.userId.toString()); 
                //this.isAuthenticated.emit(true); 

                this.router.navigate([this.returnUrl]).then(()=> window.location.reload());
            }, 
            error: (err: HttpErrorResponse)=>{
                this.errorMessage = err.message; 
                this.showError = true; 
            }
        })
    }

    
 }