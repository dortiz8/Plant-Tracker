// Helps with handling actions and changing state

import { USER_ID } from "../../constants/auth";
import { Plant } from "../../models/Plant";
import { PlantDelete } from "../../models/PlantDelete";
import * as fromPlants from "../actions/plants.action"; 
import { DeletePlant } from "../actions/plants.action";
import * as fromPlantsStats from "../actions/plantsStats.action"; 
//import * as fromPlant from "../actions/plant.action"; 

export interface PlantsState {
    data: Plant[], 
    loaded: boolean, 
    loading: boolean, 
    errMessage: string, 
    deletingStarted: boolean, 
    plantToDelete: any
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
    errMessage: '', 
    deletingStarted: false,
    plantToDelete: {}
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
        case fromPlants.BEGIN_DELETE_PLANT_PROCESS: {
            const data = action.payload;
            const plantToDelete: PlantDelete = {userId: data.userId, plantId: data.plantId, plantName: data.plantName}
            return {
                ...state,
                loading: false,
                loaded: true,
                deletingStarted: true,
                plantToDelete: plantToDelete
            }
        }
        case fromPlants.CANCEL_DELETE_PLANT_PROCESS: {
           
            return {
                ...state,
                loading: false,
                loaded: true,
                deletingStarted: false,
                plantToDelete: {}
            }
        }
        case fromPlants.DELETE_PLANT: {
            const data = action.payload;
            return {
                ...state,
                loading: true,
                loaded: false,
                deletingStarted: false, 
                plantToDelete: {}
            }
        }
        case fromPlants.DELETE_PLANT_FAIL: {
            const { status, statusText } = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                deletingStarted: false,
                plantToDelete: {},
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
                deletingStarted: false,
                plantToDelete: {},
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
export const getPlantsDeletingStarted= (state: PlantsState) => state.deletingStarted;
export const getPlantsPlantToDelete= (state: PlantsState) => state.plantToDelete;

