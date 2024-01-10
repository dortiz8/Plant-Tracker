export interface ICookiesService {
    GetToken: ()=> string | null;
    SetToken(tokenString: string): void; 
    DeleteToken(): void; 
    SetRefreshToken(token: string): void; 
    GetRefreshToken: ()=> string | null; 
}