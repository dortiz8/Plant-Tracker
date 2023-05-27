// Helps with handling actions and changing state

import { Plant } from "../../models/Plant";
import * as fromPlants from "../actions/plants.action"; 
import * as fromPlantsStats from "../actions/plantsStats.action"; 
//import * as fromPlant from "../actions/plant.action"; 

export interface PlantsState {
    data: Plant[], 
    loaded: boolean, 
    loading: boolean, 
    errMessage: string, 
  
}
// const plant1: Plant = {
//     id: 1,
//     name: "sample Plant", 
//     genus: 1, 
//     dateAdded: new Date(), 
//     dateWatered: new Date(), 
//     dateFertilized: new Date(), 
//     waterInterval: 4, 
//     fertilizeInterval: 3, 
//     waterState: 0, 
//     fertilizeState: 1

// }
//var mockData: Plant [] = [plant1]

export const initialState: PlantsState ={
    data: [],
    loaded: false,
    loading: false,
    errMessage: ''
 
}; 

export function reducer(state: PlantsState = initialState, action: fromPlants.PlantsAction): PlantsState {
    switch(action.type){
        case fromPlants.LOAD_PLANTS:{
            return {
                ...state,
                loading: true
            }
        }
        case fromPlants.LOAD_PLANTS_FAIL:{
            const {status, statusText} = action.payload; 
            console.log(`${status}: ${statusText} from reducer`); 
            return {
                ...state,
                loading: false,
                loaded: false, 
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlants.LOAD_PLANTS_SUCCESS: {
           const data = action.payload; 
            return {
                ...state,
                loading: false, 
                loaded: true, 
                data,
            }
        }
        case fromPlants.DELETE_PLANT: {
            const data = action.payload;
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        }
        case fromPlants.DELETE_PLANT_FAIL: {
            const { status, statusText } = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlants.DELETE_PLANT_SUCCESS: {
            const payload = action.payload;

            const data = state.data.filter(plant => plant.id != payload.plantId)

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

export const getPlantsLoading = (state: PlantsState) => state.loading; 
export const getPlantsLoaded = (state: PlantsState) => state.loaded; 
export const getPlants = (state: PlantsState) => state.data;
export const getPlantsErrMessage = (state: PlantsState) => state.errMessage;
