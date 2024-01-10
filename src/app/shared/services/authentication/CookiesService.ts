import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { ICookiesService } from "./Interfaces/ICookiesService";


@Injectable({
    providedIn: 'root'
})
export class CookiesService implements ICookiesService  {
    constructor(private cookieService: CookieService) {

    }
    
    private tokenKey = 'jwtToken';
    private refreshTokenKey = 'jwtRefreshToken';
    
    
    GetToken(): string | null{
        return this.cookieService.get(this.tokenKey) || null; 
    };
    
    SetToken(token: string): void {
        this.cookieService.set(this.tokenKey, token);;
    }
    
    DeleteToken(): void {
        this.cookieService.delete(this.tokenKey)
    }
    
    SetRefreshToken(token: string): void{
        this.cookieService.set(this.refreshTokenKey, token);
    }
    GetRefreshToken(): string | null{
        return this.cookieService.get(this.refreshTokenKey) || null; 
    };
}