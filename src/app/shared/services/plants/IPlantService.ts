import { Observable } from "rxjs";
import { PatchListObject, PatchObject } from "../../models/PatchObject";
import { Plant } from "../../models/Plant";
import { PlantDelete } from "../../models/PlantDelete";
import { PlantLoad } from "../../models/PlantLoad";
import { PlantNote } from "../../models/PlantNote";
import { PlantNoteCreation } from "../../models/PlantNoteCreation";
import { PlantNoteDelete } from "../../models/PlantNoteDelete";
import { PlantNoteLoad } from "../../models/PlantNoteLoad";
import { PlantCreation } from "../../models/PlantCreation";

export interface IPlantService{
    getPlantList: (userId: string | null) => Observable<any>; 
    patchWaterOrFertilizePlant: (patchObjectArr: PatchListObject) => Observable<any>;
    getPlantById: (plantLoad: PlantLoad) => Observable<any>; 
    putPlantById(body: PlantCreation): Observable<any>; 
    addPlantbyId(body: PlantCreation): Observable<any>; 
    deletePlantById(plant: PlantDelete): Observable<any>; 
    getPlantNotesById(plantNoteLoad: PlantNoteLoad): Observable<any>; 
    deletePlantNoteById(plant: PlantNoteDelete): Observable<any>; 
    addPlantNotebyId(body: PlantNoteCreation): Observable<any>;
    patchPlantNotebyId(patchObjectArr: PatchListObject): Observable<any>; 
    getPlantsStatsById: (userId: string | null) => Observable<any>; 
}