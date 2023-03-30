import { Action } from '@ngrx/store';

import { PlantCreation } from '../../models/PlantCreation';
import { Plant } from '../../models/Plant';
import { PlantInfo } from '../../models/PlantInfo';
import { PlantLoad } from '../../models/PlantLoad';

// plants actions
export const LOAD_PLANT = '[Products] Load Plant';
export const LOAD_PLANT_FAIL = '[Products] Load Plant Fail';
export const LOAD_PLANT_SUCCESS = '[Products] Load Plant Success';
export const LOAD_PLANT_INFO_SUCCESS = '[Products] Load Plant Info Success';
export const EDIT_PLANT = '[Products] Edit Plant'; 
export const EDIT_PLANT_FAIL = '[Products] Edit Plant Fail'; 
export const EDIT_PLANT_SUCCESS = '[Products] Edit Plant Success'; 
export const RESET_PLANT = '[Products] Reset Plant'
export const ADD_PLANT = '[Products] Add Plant'
export const ADD_PLANT_FAIL = '[Products] Add Plant Fail'
export const ADD_PLANT_SUCCESS = '[Products] Add Plant Success'
export const ADD_SAME_PLANT = '[Products] Add Same Plant'


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
    constructor(public payload: Plant) { } 
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
    constructor(public payload: Plant) { }
} 
export class AddPlantFail implements Action {
    readonly type = ADD_PLANT_FAIL;
    constructor(public payload: any) { }
}
export class AddPlantSuccess implements Action {
    readonly type = ADD_PLANT_SUCCESS;
} 
export class AddSamePlant implements Action {
    readonly type = ADD_SAME_PLANT;
    constructor(public payload: Plant) { }
} 



// Action Types
export type PlantAction = LoadPlant | LoadPlantFail | 
    LoadPlantSuccess | LoadPlantInfoSuccess |EditPlant | EditPlantFail | EditPlantSuccess | 
ResetPlant | AddPlant | AddPlantFail | AddPlantSuccess | AddSamePlant 