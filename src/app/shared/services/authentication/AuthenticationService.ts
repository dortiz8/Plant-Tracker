import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'; 
import { AuthResponseBody } from 'src/app/shared/models/IAuthResponse';
import { UserForAuthentication, UserForAuthenticationEncrypt } from 'src/app/shared/models/UserForAuthentication';
import { Router } from '@angular/router';
import { Authorized } from '../../models/Authorized';
import { UserLoad } from '../../models/UserLoad';
import { LocalStorageService } from './LocalStorageService';
import { ERROR_MESSAGE, IS_AUTH, PUB_KEY, REFRESH_TOKEN, SSH_PUB_KEY, TOKEN, USER_ID } from '../../constants/auth';
import { ObjectMapper } from '../utils/objectMapper';
import * as forge from 'node-forge'; 
import { FileHandler } from '../utils/filesParser';
import { TOKEN_REFRESH_ROUTE } from '../../constants/routes';



@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {
    isLoggedIn = false; 
    
    constructor(private readonly httpClient: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private localStorageService: LocalStorageService) {

    }

    public isAuthenticated(): Observable<boolean>{
        // Check token expiration if expired try to renew. 
        if(!this.isTokenExpired()) return of(true)

        return this.tryRefeshTokenAsync(); 
    }

    public isTokenExpired(): boolean{
        var token = this.localStorageService.retrieveKey(TOKEN);
        if(token == null) return true; 
        return this.jwtHelper.isTokenExpired(token); 
    }
     
    public static encryptPwd = async (password: string)  =>{

        const { publicKey, privateKey }  = await window.crypto.subtle.generateKey({
            name: "RSA-OAEP",
            modulusLength: 2048, // can be 1024, 2048, or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        }, true, ["encrypt", "decrypt"]);
        
        console.log(publicKey, privateKey);
        
        var enc = new TextEncoder(); 

        var encodedText = enc.encode(password); 
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: "RSA-OAEP",
            },
            publicKey, // from generateKey or importKey above
            encodedText // ArrayBuffer of data you want to encrypt
        );
        console.log(encryptedData, ' encrypted data'); 

        return encryptedData; 
    }
            
    public postAuthenticationCredentials = (userLoad: UserLoad): Observable<any> => {
        const {user, route} = userLoad; 
        return this.httpClient.post<AuthResponseBody>(route, user); 
    }

    public  tryRefeshTokenAsync(): Observable<boolean>{
        const token = this.localStorageService.retrieveKey(TOKEN);
        const refreshToken = this.localStorageService.retrieveKey(REFRESH_TOKEN);
        var result: boolean; 
        return this.refreshToken(TOKEN_REFRESH_ROUTE, { token: token, refreshToken: refreshToken });  
    }

    public tryRefreshingTokens(token: string | null): Observable<boolean>{
        
        const refreshToken = this.localStorageService.retrieveKey(REFRESH_TOKEN); 

        if(!refreshToken || !token) return of(false); 

        let isRefeshSuccess: boolean = false;        

        // this.refreshToken('api/token/refresh', { token: token, refreshToken: refreshToken }).subscribe({
        //     next: (res: AuthResponseBody) => {
        //         this.localStorageService.storeKeys(ObjectMapper.mapUserToLocalStorageObject(res)); 
        //         isRefeshSuccess = res.isAuthSuccessful; 
        //         return of(isRefeshSuccess);
        //     },
        //     error: (err: HttpErrorResponse) => {
        //         isRefeshSuccess = false;
        //         console.log(err.message, 'from refresh token'); 
        //     }
        // }); 
        return of(isRefeshSuccess); 
        //return of(true); 
    }

    private refreshToken = (route: string, credentials: any): Observable<boolean> => {
        return this.httpClient.post<AuthResponseBody>(route, credentials).pipe(
            map(data =>{
                if(data.isAuthSuccessful){
                    console.log(data, ' from refresh token function')
                    this.localStorageService.storeKeys(ObjectMapper.mapUserToLocalStorageObject(data));
                    return data.isAuthSuccessful;
                }else{
                    return data.isAuthSuccessful

                }
            } )
        ); 
    }

    public expirationCheck(): void{
        var isAuth = this.isAuthenticated(); 
        isAuth.subscribe({
            next: (res: boolean) => {
                if(!res) this.cleanTokens(); 
            }, 
            error: (err: HttpErrorResponse)=>{
                console.log(err.message, ' from expiration check')
            }
        }).unsubscribe(); 
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