import { Action } from '@ngrx/store';

import { PlantCreation } from '../../models/PlantCreation';
import { Plant } from '../../models/Plant';
import { PlantInfo } from '../../models/PlantInfo';
import { PlantLoad } from '../../models/PlantLoad';
import { PatchListObject } from '../../models/PatchObject';

// plants actions
export const LOAD_PLANT = '[Products] Load Plant';
export const LOAD_PLANT_FAIL = '[Products] Load Plant Fail';
export const LOAD_PLANT_SUCCESS = '[Products] Load Plant Success';
export const LOAD_PLANT_INFO_SUCCESS = '[Products] Load Plant Info Success';
export const EDIT_PLANT = '[Products] Edit Plant'; 
export const EDIT_EXISTING_PLANT = '[Products] Edit Existing Plant';
export const EDIT_PLANT_FAIL = '[Products] Edit Plant Fail'; 
export const EDIT_PLANT_SUCCESS = '[Products] Edit Plant Success'; 
export const RESET_PLANT = '[Products] Reset Plant'
export const ADD_PLANT = '[Products] Add Plant'
export const ADD_PLANT_FAIL = '[Products] Add Plant Fail'
export const ADD_PLANT_SUCCESS = '[Products] Add Plant Success'
export const ADD_SAME_PLANT = '[Products] Add Same Plant'
// Water actions 
export const WATER_PLANT = '[Products] Water Plant';
export const WATER_PLANT_FAIL = '[Products] Water Plant Fail';
export const WATER_PLANT_SUCCESS = '[Products] Water Plant Success';

export const FERTILIZE_PLANT = '[Products] Fertilize Plant';
export const FERTILIZE_PLANT_FAIL = '[Products] Fertilize Plant Fail';
export const FERTILIZE_PLANT_SUCCESS = '[Products] Fertilize Plant Success';

export class LoadPlant implements Action {
    readonly type = LOAD_PLANT;
    constructor(public payload: PlantLoad) { }
}
export class LoadPlantFail implements Action {
    readonly type = LOAD_PLANT_FAIL;
    constructor(public payload: any) { }
}
export class LoadPlantSuccess implements Action {
    readonly type = LOAD_PLANT_SUCCESS;
    constructor(public payload: Plant) { }
}
export class LoadPlantInfoSuccess implements Action {
    readonly type = LOAD_PLANT_INFO_SUCCESS;
    constructor(public payload: PlantInfo) { }
}


export class EditPlant implements Action {
    readonly type = EDIT_PLANT; 
    constructor(public payload: PlantCreation) { } 
} 

export class EditExistingPlant implements Action{
    readonly type = EDIT_EXISTING_PLANT;
    constructor(public payload: Plant){}
}

export class EditPlantFail implements Action {
    readonly type = EDIT_PLANT_FAIL; 
    constructor(public payload: any) { } 
} 
export class EditPlantSuccess implements Action {
    readonly type = EDIT_PLANT_SUCCESS; 
} 
export class ResetPlant implements Action {
    readonly type = RESET_PLANT; 
} 

export class AddPlant implements Action {
    readonly type = ADD_PLANT;
    constructor(public payload: PlantCreation) { }
} 
export class AddPlantFail implements Action {
    readonly type = ADD_PLANT_FAIL;
    constructor(public payload: any) { }
}
export class AddPlantSuccess implements Action {
    readonly type = ADD_PLANT_SUCCESS;
    constructor(public payload: string){}
} 
export class AddSamePlant implements Action {
    readonly type = ADD_SAME_PLANT;
    constructor(public payload: Plant) { }
} 


export class WaterPlant implements Action {
    readonly type = WATER_PLANT;
    // Will hold error 
    constructor(public payload: PatchListObject) { }
}
export class WaterPlantFail implements Action {
    readonly type = WATER_PLANT_FAIL;
    // Will hold error 
    constructor(public payload: any) { }
}
export class WaterPlantSuccess implements Action {
    readonly type = WATER_PLANT_SUCCESS;
    // return same plant we watered
    constructor(public payload: PlantInfo) { }
}


export class FertilizePlant implements Action {
    readonly type = FERTILIZE_PLANT;
    // Will hold error 
    constructor(public payload: PatchListObject) { }
}
export class FertilizePlantFail implements Action {
    readonly type = FERTILIZE_PLANT_FAIL;
    // Will hold error 
    constructor(public payload: any) { }
}
export class FertilizePlantSuccess implements Action {
    readonly type = FERTILIZE_PLANT_SUCCESS;
    // return same plant we watered
    constructor(public payload: PlantInfo) { }
}



// Action Types
export type PlantAction = LoadPlant | LoadPlantFail | 
    LoadPlantSuccess | LoadPlantInfoSuccess |EditPlant | EditExistingPlant | EditPlantFail | EditPlantSuccess | 
ResetPlant | AddPlant | AddPlantFail | AddPlantSuccess | AddSamePlant | WaterPlant |
WaterPlantFail | WaterPlantSuccess | FertilizePlant | FertilizePlantFail | FertilizePlantSuccess; 