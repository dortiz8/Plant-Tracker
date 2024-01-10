import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import WaterState from '../../enums/plantStates';
import { IMenuService } from './IMenuService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { TOKEN } from '../../constants/auth';

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
        //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken());
         return this.http.get(`api/menus/genus`, this.headers_object ); 
    };
    getGenus(genusId: number | null | undefined): Observable<any> {
        console.log(genusId)
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getToken(TOKEN));
        return this.http.get(`api/menus/genus/${genusId?.toString()}`, { headers: headers_object, responseType: 'text' });
    };

   

    
}

