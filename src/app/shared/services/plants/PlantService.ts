import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { act } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import { PlantDateService } from '../dates/PlantDateService';
import { IPlantService } from './IPlantService';

@Injectable({
  providedIn: 'root',
})
export class PlantService implements IPlantService {
  constructor(private readonly http: HttpClient, private readonly dateService: PlantDateService) {
   
  }
  getPlantById(userId: string | null, plantId: string | null): Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get(`api/users/${userId}/plants/${plantId}`, { headers: headers_object });
  }; 

  // var headerDict ={
  //   'Content-Type': 'application/json', 
  //   'Accept': 'application/json', 
  //   'Access-Control-Allow-Headers': 'Content-Type', 
    
  // }; 

  getPlantList(userId: string | null): Observable<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token')); 
    return this.http.get(`api/users/${userId}/plants`, {headers: headers_object}); 
  }

  patchWaterOrFertilizePlant(userId: any, plantId: any, actionName: string): Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    var formattedDate = this.dateService.getNewFormattedDate();
    var path = actionName == 'water' ? '/dateWatered' : '/dateFertilized'; 

    var body = [{
      op: "replace", 
      path: path,
      value: formattedDate

    }]; 
 
    return this.http.patch(`api/users/${userId}/plants/${plantId}`, body , { headers: headers_object} )
  }
}
