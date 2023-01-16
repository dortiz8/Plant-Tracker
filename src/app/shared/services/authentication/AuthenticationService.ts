import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'; 
import { AuthResponseBody } from 'src/app/shared/models/IAuthResponse';
import { UserForAuthentication } from 'src/app/shared/models/IUser';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    isLoggedIn = false; 
    constructor(private readonly http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {

    }
    public isAuthenticated(): boolean{
       // var logedIn = localStorage.getItem("isAuth"); 
       // if(logedIn) this.isLoggedIn = true; 
       var isRefreshSuccessful = false; 
        var token = localStorage.getItem("token"); 
        if (token && !this.jwtHelper.isTokenExpired(token)){
            //console.log(isRefreshSuccessful);
            return true; 
        }

        const isRefreshSuccess = this.tryRefreshingTokens(token).subscribe({
            next: (res: boolean) => { isRefreshSuccessful = res; console.log(res, ' from service ')},
            error: (err: HttpErrorResponse) => { isRefreshSuccessful = false; }
        }); 

        if (!isRefreshSuccessful) this.router.navigate(['/login']);
        //console.log(isRefreshSuccessful, ' last line'); 
        return isRefreshSuccessful; 
    }


    public loginUser = (route: string, body: UserForAuthentication): Observable<any> => {
        return this.http.post<AuthResponseBody>(route, body); 
    }

    public tryRefreshingTokens(token: string | null): Observable<boolean>{
        const refreshToken = localStorage.getItem('refreshToken'); 

        if(!refreshToken || !token) return of(false); 

        var credentials = JSON.stringify({token: token, refreshToken: refreshToken}); 
        console.log(credentials); 
        let isRefeshSuccess: boolean = false;        

        const refreshRes = this.refreshToken('api/token/refresh', { token: token, refreshToken: refreshToken }).subscribe({
            next: (res: AuthResponseBody) => {
                localStorage.setItem("token", res.token);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("isAuth", res.isAuthSuccessful.toString());
                localStorage.setItem("userId", res.userId.toString())
                isRefeshSuccess = true; 
            },
            error: (err: HttpErrorResponse) => {

                isRefeshSuccess = false;
                console.log(err.message); 
            }
        }); 
        return of(isRefeshSuccess); 
    }

    private refreshToken = (route: string, credentials: any): Observable<any> => {
        return this.http.post<AuthResponseBody>(route, credentials); 
    }

    public expirationCheck(): void{
        var isAuth = this.isAuthenticated(); 
        if(!isAuth) this.cleanTokens(); 

    }

    public cleanTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.setItem('isAuth', "false");
    }

    public getUserId(): number{
        return 0; 
       
    }
}