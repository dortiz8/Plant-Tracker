import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import { PlantDateService } from '../dates/PlantDateService';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private readonly http: HttpClient, private readonly dateService: PlantDateService) {
   
  }
  // var headerDict ={
  //   'Content-Type': 'application/json', 
  //   'Accept': 'application/json', 
  //   'Access-Control-Allow-Headers': 'Content-Type', 
    
  // }; 

  getPlantList(userId: number): Observable<any> {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token')); 
    return this.http.get(`api/users/${userId}/plants`, {headers: headers_object}); 
  }

  patchWaterPlant(userId: number | null, plantId: number | undefined, actionName: string): Observable<any>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    var formattedDate = this.dateService.getNewFormattedDate();
    var path = actionName == 'water' ? '/dateWatered' : '/dateFertilized'
    var body = [{
      op: "replace", 
      path: path,
      value: formattedDate

    }]; 
 
    return this.http.patch(`api/users/${userId}/plants/${plantId}`, body , { headers: headers_object} )
  }
}
