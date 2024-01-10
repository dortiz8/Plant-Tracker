import { Observable } from "rxjs";

export interface IAuthenticationService{
     isAuthenticated(): Observable<boolean>
     postAuthenticationCredentials(userLoad: any): Observable<any>
     logOut(): void
     saveTokens(token: string, refreshToken: string): void
     getToken(tokenName: string): string 

    }