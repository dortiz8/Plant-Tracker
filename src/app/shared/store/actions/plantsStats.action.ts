import { Action } from '@ngrx/store'; 
import { PlantsStats } from '../../models/PlantsStats';

export const LOAD_PLANTS_STATS = '[Products] Load Plants Stats';
export const LOAD_PLANTS_STATS_FAIL = '[Products] Load Plants Stats Fail';
export const LOAD_PLANTS_STATS_SUCCESS = '[Products] Load Plants Stats Success'; 

export class LoadPlantsStats implements Action {
    constructor(public payload: any) { }
    readonly type = LOAD_PLANTS_STATS;
}
export class LoadPlantsStatsFail implements Action {
    readonly type = LOAD_PLANTS_STATS_FAIL;
    constructor(public payload: any) { }
}
export class LoadPlantsStatsSuccess implements Action {
    readonly type = LOAD_PLANTS_STATS_SUCCESS;
    constructor(public payload: PlantsStats) { }
}

export type PlantsStatsAction = LoadPlantsStats | LoadPlantsStatsFail | LoadPlantsStatsSuccess; 
