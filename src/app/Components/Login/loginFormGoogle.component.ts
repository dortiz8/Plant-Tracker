import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { HOME_ROUTE } from "src/app/shared/constants/routes";

@Component({
    selector: 'login-form-google',
    templateUrl: './loginFormGoogle.component.html',
    styleUrls: ['./loginForm.component.css']
})
export class LoginFormGoogleComponent {
    googleIcon = faGoogle;
    
    constructor(private router: Router,
        private socialAuthService: SocialAuthService) {
    }

    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((user) =>{
                console.log(user); 
                this.router.navigate([HOME_ROUTE])
            } );
    }
}