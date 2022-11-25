import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private readonly http: HttpClient) {
   
  }

  getPlantList(userId: number): Observable<any> {
    return this.http.get(`api/users/${userId}/plants`); 
  }
}
