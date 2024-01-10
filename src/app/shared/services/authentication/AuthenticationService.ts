import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, empty, map, Observable, of, tap, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'; 
import { AuthResponseBody } from 'src/app/shared/models/IAuthResponse';
import { UserForAuthentication, UserForAuthenticationEncrypt } from 'src/app/shared/models/UserForAuthentication';
import { Router } from '@angular/router';
import { Authorized } from '../../models/Authorized';
import { UserLoad } from '../../models/UserLoad';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ERROR_MESSAGE, IS_AUTH, PUB_KEY, REFRESH_TOKEN, SSH_PUB_KEY, TOKEN, USER_ID } from '../../constants/auth';
import { ObjectMapper } from '../utils/objectMapper';
import * as forge from 'node-forge'; 
import { FileHandler } from '../utils/filesParser';
import { TOKEN_REFRESH_ROUTE } from '../../constants/routes';
import { UserCreate, UserCreateLoad } from '../../models/UserCreate';
import { GoogleAuthLoad } from '../../models/GoogleAuthLoad';
import { CookiesService } from './CookiesService'
import { IAuthenticationService } from './Interfaces/IAuthenticationService';



@Injectable({
    providedIn: 'root',
})

export class AuthenticationService implements IAuthenticationService {
    isLoggedIn = false; 
    
    constructor(private readonly httpClient: HttpClient, private jwtHelper: JwtHelperService, 
        private router: Router, private localStorageService: LocalStorageService, private cookiesService: CookiesService) {

    }

    //#region Private Methods 

    private refreshToken = (route: string, credentials: any): Observable<boolean> => {
        return this.httpClient.post<AuthResponseBody>(route, credentials).pipe(
            map(data => {
                if (data.isAuthSuccessful) {
                    console.log(data, ' from refresh token function')
                    this.saveTokens(data.token, data.refreshToken);
                    this.localStorageService.storeKeys(ObjectMapper.mapUserToLocalStorageObject(data));
                    return data.isAuthSuccessful;
                } else {
                    return data.isAuthSuccessful

                }
            })
        );
    }

    private isTokenExpired(): boolean {
        var token = this.getToken(TOKEN);
        console.log(token, ' from is expired')
        if (token == null) return true;
        return this.jwtHelper.isTokenExpired(token);
    }


    private tryRefeshTokenAsync(): Observable<boolean> {
        const token = this.getToken(TOKEN);
        const refreshToken = this.getToken(REFRESH_TOKEN);
        var result: boolean;
        return this.refreshToken(TOKEN_REFRESH_ROUTE, { token: token, refreshToken: refreshToken });
    }


    private cleanTokens() {
        this.localStorageService.deleteKeys([USER_ID, ERROR_MESSAGE])
    }

    private resetAuthentication() {
        this.localStorageService.storeKeys([[IS_AUTH, false]])
    }

    //#endregion

    //#region Public Methods 
    
    public isAuthenticated(): Observable<boolean>{
        // Check token expiration if expired try to renew. 
        if(!this.isTokenExpired()) return of(true)

        return this.tryRefeshTokenAsync(); 
    }

 
    public postAuthenticationCredentials = (userLoad: any): Observable<any> => {
        //var route = this.GetRouteForLoginProvider(userLoad); 
        var requestBody = {idToken: userLoad?.idToken, email: userLoad?.email, firstName: userLoad?.firstName, lastName: userLoad?.lastName, provider: userLoad?.provider}; 
        console.log(requestBody, ' request body')
        var route = 'https://localhost:36322/api/authentication/googleAuthenticate'; 
        return this.httpClient.post<AuthResponseBody>(route, requestBody);
    }

    public logOut(){
        //this.cleanTokens(); 
        this.cookiesService.DeleteToken(); 
        this.resetAuthentication(); 
    }

    public saveTokens(token: string, refreshToken: string){
        this.cookiesService.SetToken(token); 
        this.cookiesService.SetRefreshToken(refreshToken); 
    }

    public getToken(tokenName: string): string {
        if (tokenName == REFRESH_TOKEN){
            var token = this.cookiesService.GetRefreshToken(); 
            return token ? token : ""; 
        } 
        if (tokenName == TOKEN){
            var token = this.cookiesService.GetToken();
            return token ? token : ""; 
        }  
        else return '' 
    }

    //#endregion


}