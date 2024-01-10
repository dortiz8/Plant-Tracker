import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { act } from '@ngrx/effects';
import { Observable } from 'rxjs';
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

    this.headers_object = {
      headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken(TOKEN)}`)
    };
  
  }
  
  
  
  //headers_object = new HttpHeaders().set("Authorization", "Bearer " + );
  //headers_object = new HttpHeaders().set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkRhbnRlIiwibmJmIjoxNzAzMTEyNjA4LCJleHAiOjE3MDMxMTYyMDgsImlhdCI6MTcwMzExMjYwOCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6ODA4MCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.IdkGLbgZkHRP_bnjDoCvhsOW2yWGn0cwh5iDOlCQT6M");

    
    deletePlantById(plant: PlantDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.plantId}`, this.headers_object)
    }
    
    
    addPlantbyId(plant: PlantCreation): Observable<any> {

      var image: PlantImageEdit = {
        userId: plant.image.userId,
        plantId: plant.image.plantId,
        name: plant.image.name,
        type: plant.image.type,
        size: plant.image.size,
        base64: plant.image.base64
      }
      var body: PlantEdit = {
        name: plant.name,
        genusId: plant.genusId,
        dateWatered: plant.dateWatered,
        dateFertilized: plant.dateFertilized,
        fertilizeInterval: plant.fertilizeInterval,
        waterInterval: plant.waterInterval,
        image: image,
      }
      console.log(body)
      return this.http.post(`${BASE_PLANT_ROUTE}${plant.userId}/plants`, body, this.headers_object);
    }
    getPlantById(plantLoad: PlantLoad): Observable<any>{
      const { plantId , info, userId} = plantLoad; 
    
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/${plantId}?info=${info}`, this.headers_object);
    }; 
    
    putPlantById(plant: PlantCreation): Observable<any>{
      var body: PlantEdit = {
        name: plant.name,
        genusId: plant.genusId,
        dateWatered: plant.dateWatered,
        dateFertilized: plant.dateFertilized,
        fertilizeInterval: plant.fertilizeInterval,
        waterInterval: plant.waterInterval,
        image: plant.image,
        
      }
      
      return this.http.put(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.id}`, body, this.headers_object);
    }
    
    
    getPlantList(userId: string | null): Observable<any> { 

      try {
        
        return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants`, this.headers_object); 
        
      } catch (error) {
        console.log(error, " error from console ")
        throw error; 
      }
    }
    
    patchWaterOrFertilizePlant(patchListObject: PatchListObject): Observable<any>{
      var body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}`, body, this.headers_object)
    }
    
    getPlantNotesById(plantNoteLoad: PlantNoteLoad): Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${plantNoteLoad.userId}/plants/${plantNoteLoad.plantId}/notes`, this.headers_object); 
    }
    
    deletePlantNoteById(note: PlantNoteDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes/${note.Id}`)
    }
    addPlantNotebyId(note: PlantNoteCreation): Observable<any> {
      return this.http.post(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes`, note, this.headers_object)
    }
    patchPlantNotebyId(patchListObject: PatchListObject): Observable<any> {
      const body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}/notes/${patchListObject.noteId}`, body, this.headers_object)
    }
    getPlantsStatsById(userId: string | null):Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/stats`, this.headers_object); 
    };
    
  }
  