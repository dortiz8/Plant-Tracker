// Add sets of actions creators and constants
// Help with communication via events

import{Action} from '@ngrx/store'; 
import { PatchListObject } from '../../models/PatchObject';
import { Plant } from '../../models/Plant';
import { PlantDelete } from '../../models/PlantDelete';

// plants actions
export const LOAD_PLANTS = '[Products] Load Plants'; 
export const LOAD_PLANTS_FAIL = '[Products] Load Plants Fail'; 
export const LOAD_PLANTS_SUCCESS = '[Products] Load Plants Success'; 

export const DELETE_PLANT = '[Products] Delete Plant'
export const DELETE_PLANT_FAIL = '[Products] Delete Plant Fail'
export const DELETE_PLANT_SUCCESS = '[Products] Delete Plant Success'

export class LoadPlants implements Action {
    readonly type = LOAD_PLANTS; 
    constructor(public payload: any) { }
}
export class LoadPlantsFail implements Action {
    readonly type = LOAD_PLANTS_FAIL; 
    constructor( public payload: any) {}
}
export class LoadPlantsSuccess implements Action {
    readonly type = LOAD_PLANTS_SUCCESS; 
    constructor(public payload: Plant[]) {}
}

export class DeletePlant implements Action {
    readonly type = DELETE_PLANT;
    constructor(public payload: PlantDelete) { }
}
export class DeletePlantFail implements Action {
    readonly type = DELETE_PLANT_FAIL;
    constructor(public payload: any) { }
}
export class DeletePlantSuccess implements Action {
    readonly type = DELETE_PLANT_SUCCESS;
    constructor(public payload: PlantDelete) { }
} 

// Action types

export type PlantsAction = LoadPlants | LoadPlantsFail | LoadPlantsSuccess | 
    DeletePlant | DeletePlantFail | DeletePlantSuccess;
