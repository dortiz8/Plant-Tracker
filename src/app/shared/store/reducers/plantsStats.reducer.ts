import { PlantsStats } from "../../models/PlantsStats";
import * as fromPlantsStats from "../actions/plantsStats.action"; 

export interface PlantsStatsState{
    data: PlantsStats, 
    loaded: boolean,
    loading: boolean,
    errMessage: string,
}; 

export const initialState: PlantsStatsState ={
    data: new PlantsStats,
    loaded: false,
    loading: false,
    errMessage: ""
}

export function reducer(state: PlantsStatsState = initialState, action: fromPlantsStats.PlantsStatsAction){
    switch (action.type) {
        case fromPlantsStats.LOAD_PLANTS_STATS:
            return{
                ...state,
                loading: true, 
            };
        case fromPlantsStats.LOAD_PLANTS_STATS_FAIL:
            const { status, statusText } = action.payload;
            return{ 
                ...state,
                loading: false, 
                loaded: false, 
                errMessage: `${status}: ${statusText}`,
            }
        case fromPlantsStats.LOAD_PLANTS_STATS_SUCCESS:
            const data = action.payload; 
            return{
                ...state,
                loading: false,
                loaded: true,
                errMessage: "",
                data
            }
        default:
            return state;
    }
}

export const getPlantsStatsLoading = (state: PlantsStatsState)=>state.loading; 
export const getPlantsStatsLoaded = (state: PlantsStatsState)=>state.loaded; 
export const getPlantsStats = (state: PlantsStatsState)=>state.data; 
export const getPlantsStatsErrMessage = (state: PlantsStatsState)=>state.errMessage; 