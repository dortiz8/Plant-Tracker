import { Action } from '@ngrx/store';

import { Plant } from '../../models/Plant';

// plants actions
export const LOAD_PLANT = '[Products] Load Plant';
export const LOAD_PLANT_FAIL = '[Products] Load Plant Fail';
export const LOAD_PLANT_SUCCESS = '[Products] Load Plant Success';

export class LoadPlant implements Action {
    readonly type = LOAD_PLANT;
    constructor(public payload: any) { }
}
export class LoadPlantFail implements Action {
    readonly type = LOAD_PLANT_FAIL;
    constructor(public payload: any) { }
}
export class LoadPlantSuccess implements Action {
    readonly type = LOAD_PLANT_SUCCESS;
    constructor(public payload: Plant) { }
}

// Action Types
export type PlantAction = LoadPlant | LoadPlantFail | LoadPlantSuccess