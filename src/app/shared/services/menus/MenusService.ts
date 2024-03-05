import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import WaterState from '../../enums/plantStates';
import { IMenuService } from './IMenuService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { TOKEN } from '../../constants/auth';
import { MENU_GENUS_ROUTE } from '../../constants/routes';

@Injectable({
    providedIn: 'root',
})
export class GenusService implements IMenuService{    
    headers_object: any; 

    constructor(private readonly http: HttpClient, private readonly authService: AuthenticationService) {
        this.headers_object = {
            headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken(TOKEN)}`)
        };
    }
    
    getGenusList(): Observable<any>{
         return this.http.get(`${MENU_GENUS_ROUTE}`, this.authService.getRequestHeaders() ); 
    };
    getGenus(genusId: number | null | undefined): Observable<any> {
        var headers_object = this.authService.getRequestHeaders(); 
        return this.http.get(`${MENU_GENUS_ROUTE}${genusId?.toString()}`, { headers: headers_object.headers, responseType: 'text' });
    };

   

    
}

