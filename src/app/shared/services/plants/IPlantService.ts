import { Observable } from "rxjs";

export interface IPlantService{
    getPlantList: (userId: string | null) => Observable<any>; 
    patchWaterOrFertilizePlant: (userId: any, plantId: any, actionName: string) => Observable<any>;
    getPlantById: (userId: string | null, plantId: string | null) => Observable<any>; 

}