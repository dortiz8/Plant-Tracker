import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import WaterState from '../../enums/plantStates';
import { IMenuService } from './IMenuService';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class GenusService implements IMenuService{    
    constructor(private readonly http: HttpClient) {
       
    }
    
    getGenusList(): Observable<any>{
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
         return this.http.get(`api/menus/genus`, { headers: headers_object }); 
    };
    getGenus(genusId: number | null | undefined): Observable<any> {
        console.log(genusId)
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
        return this.http.get(`api/menus/genus/${genusId?.toString()}`, { headers: headers_object, responseType: 'text' });
    };

   

    
}

