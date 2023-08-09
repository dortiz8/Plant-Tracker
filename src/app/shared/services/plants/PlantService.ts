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

@Injectable({
  providedIn: 'root',
})
export class PlantService implements IPlantService {
  constructor(private readonly http: HttpClient, private readonly dateService: PlantDateService) {
  }
  
  
  // var headerDict ={
    //   'Content-Type': 'application/json', 
    //   'Accept': 'application/json', 
    //   'Access-Control-Allow-Headers': 'Content-Type', 
    // }; 
    headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    
    deletePlantById(plant: PlantDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.plantId}`, { headers: this.headers_object })
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
      return this.http.post(`${BASE_PLANT_ROUTE}${plant.userId}/plants`, body, { headers: this.headers_object });
    }
    getPlantById(plantLoad: PlantLoad): Observable<any>{
      const { plantId , info, userId} = plantLoad; 
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/${plantId}?info=${info}`, { headers: this.headers_object });
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
      
      return this.http.put(`${BASE_PLANT_ROUTE}${plant.userId}/plants/${plant.id}`, body, { headers: this.headers_object });
    }
    
    
    getPlantList(userId: string | null): Observable<any> { 
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants`, {headers: this.headers_object}); 
    }
    
    patchWaterOrFertilizePlant(patchListObject: PatchListObject): Observable<any>{
      var body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}`, body , { headers: this.headers_object} )
    }
    
    getPlantNotesById(plantNoteLoad: PlantNoteLoad): Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${plantNoteLoad.userId}/plants/${plantNoteLoad.plantId}/notes`, { headers: this.headers_object }); 
    }
    
    deletePlantNoteById(note: PlantNoteDelete): Observable<any> {
      return this.http.delete(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes/${note.Id}`)
    }
    addPlantNotebyId(note: PlantNoteCreation): Observable<any> {
      return this.http.post(`${BASE_PLANT_ROUTE}${note.userId}/plants/${note.plantId}/notes`, note, { headers: this.headers_object })
    }
    patchPlantNotebyId(patchListObject: PatchListObject): Observable<any> {
      const body = patchListObject.patchArray; 
      return this.http.patch(`${BASE_PLANT_ROUTE}${patchListObject.userId}/plants/${patchListObject.plantId}/notes/${patchListObject.noteId}`, body, { headers: this.headers_object })
    }
    getPlantsStatsById(userId: string | null):Observable<any> {
      return this.http.get(`${BASE_PLANT_ROUTE}${userId}/plants/stats`, { headers: this.headers_object }); 
    };
    
  }
  