// Helps with handling actions and changing state

import { Plant } from "../../models/Plant";
import * as fromPlant from "../actions/plant.action"; 

export interface PlantState {
    data: Plant, 
    loaded: boolean, 
    loading: boolean, 
    errMessage: string
}

//var mockData: Plant [] = [plant1]

export const initialState: PlantState ={
    data: new Plant(),
    loaded: false,
    loading: false,
    errMessage: '',
}; 

export function reducer(state: PlantState = initialState, action: fromPlant.PlantAction): PlantState {
    switch(action.type){
        case fromPlant.LOAD_PLANT: {
            return {
                ...state,
                loading: true
            }
        }
        case fromPlant.LOAD_PLANT_FAIL: {
            const {status, statusText} = action.payload; 
            return {
                ...state,
                loading: false,
                loaded: false, 
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.LOAD_PLANT_SUCCESS: {
           const data = action.payload; 
           console.log(data, ' from reducer')
            return {
                ...state,
                loading: false, 
                loaded: true, 
                data
            }
        }
    }
    return state; 
}

export const getPlantLoading = (state: PlantState) => state.loading; 
export const getPlantLoaded = (state: PlantState) => state.loaded; 
export const getPlant = (state: PlantState) => state.data;
export const getPlantErrMessage = (state: PlantState) => state.errMessage;