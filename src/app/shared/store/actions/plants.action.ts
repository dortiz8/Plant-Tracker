// Add sets of actions creators and constants
// Help with communication via events

import{Action} from '@ngrx/store'; 
import { Plant } from '../../models/Plant';

// plants actions
export const LOAD_PLANTS = '[Products] Load Plants'; 
export const LOAD_PLANTS_FAIL = '[Products] Load Plants Fail'; 
export const LOAD_PLANTS_SUCCESS = '[Products] Load Plants Success'; 

export class LoadPlants implements Action {
    readonly type = LOAD_PLANTS; 
}
export class LoadPlantsFail implements Action {
    readonly type = LOAD_PLANTS_FAIL; 
    constructor( public payload: any) {}
}
export class LoadPlantsSuccess implements Action {
    readonly type = LOAD_PLANTS_SUCCESS; 
    constructor(public payload: Plant[]) {}
}

// Water actions 
export const WATER_PLANT = '[Products] Water Plant';
export const WATER_PLANT_FAIL = '[Products] Water Plant Fail';
export const WATER_PLANT_SUCCESS = '[Products] Water Plant Success';

export class WaterPlant implements Action {
    readonly type = WATER_PLANT;
    // Will hold error 
    constructor(public payload: any = null) { }
}
export class WaterPlantFail implements Action {
    readonly type = WATER_PLANT_FAIL;
    // Will hold error 
    constructor(public payload: any) { }
}
export class WaterPlantSuccess implements Action {
    readonly type = WATER_PLANT_SUCCESS;
    // return same plant we watered
    constructor(public payload: Plant) { }
}

export const FERTILIZE_PLANT = '[Products] Fertilize Plant';
export const FERTILIZE_PLANT_FAIL = '[Products] Fertilize Plant Fail';
export const FERTILIZE_PLANT_SUCCESS = '[Products] Fertilize Plant Success';

export class FertilizePlant implements Action {
    readonly type = FERTILIZE_PLANT;
    // Will hold error 
    constructor(public payload: any = null) { }
}
export class FertilizePlantFail implements Action {
    readonly type = FERTILIZE_PLANT_FAIL;
    // Will hold error 
    constructor(public payload: any) { }
}
export class FertilizePlantSuccess implements Action {
    readonly type = FERTILIZE_PLANT_SUCCESS;
    // return same plant we watered
    constructor(public payload: Plant) { }
}

// Action types

export type PlantsAction = LoadPlants | LoadPlantsFail | LoadPlantsSuccess | 
                            WaterPlant | WaterPlantFail | WaterPlantSuccess |
                            FertilizePlant | FertilizePlantFail | FertilizePlantSuccess; 
