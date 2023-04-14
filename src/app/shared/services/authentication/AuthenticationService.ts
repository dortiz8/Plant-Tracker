import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'; 
import { AuthResponseBody } from 'src/app/shared/models/IAuthResponse';
import { UserForAuthentication } from 'src/app/shared/models/UserForAuthentication';
import { Router } from '@angular/router';
import { Authorized } from '../../models/Authorized';
import { UserLoad } from '../../models/UserLoad';
import { LocalStorageService } from './LocalStorageService';
import { ERROR_MESSAGE, IS_AUTH, REFRESH_TOKEN, TOKEN, USER_ID } from '../../constants/auth';
import { ObjectMapper } from '../utils/objectMapper';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    isLoggedIn = false; 
    constructor(private readonly http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private localStorageService: LocalStorageService) {

    }
    public isAuthenticated(): boolean{
       var isRefreshSuccessful = false; 
        var token = this.localStorageService.retrieveKey(TOKEN); 
        // Check for saved token
        if(token != null){
            if (!this.jwtHelper.isTokenExpired(token)){
                return true; 
            }

        }

        this.tryRefreshingTokens(token).subscribe({
            next: (res: boolean) => { isRefreshSuccessful = res; },
            error: (err: HttpErrorResponse) => { isRefreshSuccessful = false; }
        }); 

        if (!isRefreshSuccessful) this.router.navigate(['/login']);
        console.log(isRefreshSuccessful, ' from is authenticated refresh token'); 
        return isRefreshSuccessful; 
        //return true; 
    }


    public postAuthenticationCredentials = (userLoad: UserLoad): Observable<any> => {
        const {user, route} = userLoad; 
        return this.http.post<AuthResponseBody>(route, user); 
    }

    public tryRefreshingTokens(token: string | null): Observable<boolean>{
        const refreshToken = this.localStorageService.retrieveKey(REFRESH_TOKEN); 

        if(!refreshToken || !token) return of(false); 

        var credentials = JSON.stringify({token: token, refreshToken: refreshToken}); 
       
        let isRefeshSuccess: boolean = false;        

        this.refreshToken('api/token/refresh', { token: token, refreshToken: refreshToken }).subscribe({
            next: (res: AuthResponseBody) => {
                this.localStorageService.storeKeys(ObjectMapper.mapUserToLocalStorageObject(res)); 
                isRefeshSuccess = true; 
            },
            error: (err: HttpErrorResponse) => {
                isRefeshSuccess = false;
                console.log(err.message, 'from refresh token'); 
            }
        }); 
        return of(isRefeshSuccess); 
        //return of(true); 
    }

    private refreshToken = (route: string, credentials: any): Observable<any> => {
        return this.http.post<AuthResponseBody>(route, credentials); 
    }

    public expirationCheck(): void{
        var isAuth = this.isAuthenticated(); 
        if(!isAuth){
            this.cleanTokens(); 
        }
    }

    private cleanTokens() {
        this.localStorageService.deleteKeys([TOKEN, REFRESH_TOKEN, USER_ID, ERROR_MESSAGE])
    }
    
    private resetAuthentication(){
        this.localStorageService.storeKeys([[IS_AUTH, false]])
    }

    public logOut(){
        this.cleanTokens(); 
        this.resetAuthentication(); 
    }
}