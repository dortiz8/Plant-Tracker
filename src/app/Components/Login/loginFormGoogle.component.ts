import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleLoginProvider, SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import * as fromStore from '../../shared/store';
import { Subject } from "rxjs";
import { HOME_ROUTE } from "src/app/shared/constants/routes";
import { Store } from "@ngrx/store";


@Component({
    selector: 'login-form-google',
    templateUrl: './loginFormGoogle.component.html',
    styleUrls: ['./loginForm.component.css']
})
export class LoginFormGoogleComponent {
    googleIcon = faGoogle;
    
    user: SocialUser | null; 
    public showError = false; 
    // private clientID = '683573935998-g2aveu6e7n98au5umaqvq8nbap9j4v7k.apps.googleusercontent.com'; 
    // private authRoute = 'https://localhost:7235/api/authentication/googleAuthenticate'; 
    private googleLoginOptions = {
        scope: 'profile email'
    };
    
    constructor(private router: Router, private socialAuthService: SocialAuthService, private store: Store<fromStore.UserState>)
    {
    }

    ngOnInit(){
        this.socialAuthService.authState.subscribe((user)=>{
            this.user = user; 
            this.store.dispatch(new fromStore.LoadUser(user))
        })
    }
}