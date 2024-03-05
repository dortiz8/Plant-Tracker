import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { act } from '@ngrx/effects';
import { Observable, observable, of } from 'rxjs';
import {  PatchListObject, PatchObject } from '../../models/PatchObject';
import { Plant } from '../../models/Plant';
import { PlantCreation } from '../../models/PlantCreation';
import { PlantDelete } from '../../models/PlantDelete';
import { PlantEdit } from '../../models/PlantEdit';
import { PlantLoad } from '../../models/PlantLoad';
import { PlantNoteCreation } from '../../models/PlantNoteCreation';
import { PlantNoteDelete } from '../../models/PlantNoteDelete';
import { PlantNoteLoad } from '../../models/PlantNoteLoad';
import { PlantDateService } from '../dates/PlantDateService';
import { IPlantService } from './IPlantService';
import { PlantImageEdit } from '../../models/PlantImageEdit';
import { BASE_PLANT_ROUTE } from '../../constants/routes';
import { LocalStorageService } from '../utils/LocalStorageService';
import { AuthenticationService } from '../authentication/AuthenticationService';
import { TOKEN } from '../../constants/auth';

@Injectable({
  providedIn: 'root',
})
export class PlantService implements IPlantService {
  private tokenVal: string  ; 
  headers_object: any; 
  constructor(private readonly http: HttpClient, private readonly dateService: PlantDateService, private localStorageService: LocalStorageService, 
    private readonly authService: AuthenticationService) {

    // var token = localStorageService.retrieveKey('token'); 
    // this.tokenVal =  token != null ? token : ''; 
      console.log(this.authService.getToken(TOKEN)); 
    this.headers_object = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken(TOKEN)}`)
    };
  
  }
  
  
  
  //headers_object = new HttpHeaders().set("Authorization", "Bearer " + );
  //headers_object = new HttpHeaders().set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRhbnRlIiwibmJmIjoxNzAzMTEyNjA4LCJleHAiOjE3MDMxMTYyMDgsImlhdCI6MTcwMzExMjYwOCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODA4MCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.IdkGLbgZkHRP_bnjDoCvhsOW2yWGn0cwh5iDOlCQT6M");

    
    deletePlantById(plant: PlantDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.plantId}`, this.authService.getRequestHeaders())
    }
    
    
    addPlantbyId(plant: PlantCreation): Observable<any> {


      var plantObject: PlantEdit = {
        Name: plant.name,
        GenusId: plant.genusId,
        DateWatered: plant.dateWatered,
        DateFertilized: plant.dateFertilized,
        WaterInterval: plant.waterInterval,
        FertilizeInterval: plant.fertilizeInterval,
      }

      return this.http.post(`${BASE_PLANT_ROUTE}${plant.userId}/plants`, plantObject, this.authService.getRequestHeaders());
    }

  addNewPlantImage(plant: PlantCreation, plantCreated: any): Observable<any>{
      if (plant == null && plantCreated == null) return of(null); 
      
      if(plant.userId != null && plant?.image != null){

        var plantId = plant.id != null ? plant.id : plantCreated.id

        this.addPlantImagebyId(plant.userId, plantId, plant.image); 
      }
      return of(plantCreated); 
    }

  addPlantImagebyId(userId: string, plantId: string, file: any): void{ // use new method 
    var headers = new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken(TOKEN)}`);
    headers.append('Content-Type', 'multipart/form-data'); 

    const formData = new FormData();
    formData.append('file', file); 

    var result =  this.http.post(`${BASE_PLANT_ROUTE}${userId}/plants/${plantId}/images`, formData, { headers })
    
    result.subscribe({
      next: (res: any) => {
        console.log(res); 
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message); // Include code to handle image addition failures.
      }
    })
  }

    getPlantById(plantLoad: PlantLoad): Observable<any>{
      const { plantId , info, userId} = plantLoad; 
    
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/${plantId}?info=${info}`, this.authService.getRequestHeaders());
    }; 
    
    putPlantById(plant: PlantCreation): Observable<any>{
      var body: PlantEdit = {
        Name: plant.name,
        GenusId: plant.genusId,
        DateWatered: plant.dateWatered,
        DateFertilized: plant.dateFertilized,
        FertilizeInterval: plant.fertilizeInterval,
        WaterInterval: plant.waterInterval,
        // image: plant.image,
        
      }
      
      return this.http.put(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.id}`, body, this.authService.getRequestHeaders());
    }
    
    
    getPlantList(userId: string | null): Observable<any> { 

      try {
        return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants`, this.authService.getRequestHeaders()); 
        
      } catch (error) {
        console.log(error, " error from console ")
        throw error; 
      }
    }
    
    patchWaterOrFertilizePlant(patchListObject: PatchListObject): Observable<any>{
      var body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}`, body, this.authService.getRequestHeaders())
    }
    
    getPlantNotesById(plantNoteLoad: PlantNoteLoad): Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${plantNoteLoad.userId}/plants/${plantNoteLoad.plantId}/notes`, this.authService.getRequestHeaders()); 
    }
    
    deletePlantNoteById(note: PlantNoteDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes/${note.Id}`)
    }
    addPlantNotebyId(note: PlantNoteCreation): Observable<any> {
      return this.http.post(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes`, note, this.authService.getRequestHeaders())
    }
    patchPlantNotebyId(patchListObject: PatchListObject): Observable<any> {
      const body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}/notes/${patchListObject.noteId}`, body, this.authService.getRequestHeaders())
    }
    getPlantsStatsById(userId: string | null):Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/stats`, this.authService.getRequestHeaders()); 
    };
    
  }
  