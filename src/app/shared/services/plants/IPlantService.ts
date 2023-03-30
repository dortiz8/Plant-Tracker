import { Observable } from "rxjs";
import { PatchArray } from "../../models/PatchObject";
import { Plant } from "../../models/Plant";
import { PlantDelete } from "../../models/PlantDelete";
import { PlantLoad } from "../../models/PlantLoad";
import { PlantNote } from "../../models/PlantNote";
import { PlantNoteCreation } from "../../models/PlantNoteCreation";
import { PlantNoteDelete } from "../../models/PlantNoteDelete";

export interface IPlantService{
    getPlantList: (userId: string | null) => Observable<any>; 
    patchWaterOrFertilizePlant: (userId: any, plantId: any, actionName: string) => Observable<any>;
    getPlantById: (userId: string | null, plantLoad: PlantLoad) => Observable<any>; 
    putPlantById(body: Plant): Observable<any>; 
    addPlantbyId(body: Plant): Observable<any>; 
    deletePlantById(plant: PlantDelete): Observable<any>; 
    getPlantNotesById(userId: string | null, plantId: string | null): Observable<any>; 
    deletePlantNoteById(plant: PlantNoteDelete): Observable<any>; 
    addPlantNotebyId(body: PlantNoteCreation): Observable<any>;
    patchPlantNotebyId(patchObjectArr: PatchArray): Observable<any>
}