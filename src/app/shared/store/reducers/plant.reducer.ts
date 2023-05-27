// Helps with handling actions and changing state

import { Plant } from "../../models/Plant";
import { PlantInfo } from "../../models/PlantInfo";
import * as fromPlant from "../actions/plant.action"; 

export interface PlantState {
    data: Plant | PlantInfo, 
    loaded: boolean, 
    loading: boolean, 
    errMessage: string, 
    editSuccess: boolean, 
    addSuccess: boolean, 
    addSame: boolean, 
    editExisting: boolean
}

//var mockData: Plant [] = [plant1]

export const initialState: PlantState ={
    data: new Plant(),
    loaded: false,
    loading: false,
    errMessage: '',
    editSuccess: false, 
    addSuccess: false, 
    addSame: false, 
    editExisting: false,
}; 

export function reducer(state: PlantState = initialState, 
    action: fromPlant.PlantAction): PlantState {
    switch(action.type){
        case fromPlant.LOAD_PLANT:
        case fromPlant.WATER_PLANT: {
            return {
                ...state,
                loading: true, 
                loaded: false, 
                
            }
        }
        case fromPlant.LOAD_PLANT_FAIL:
        case fromPlant.WATER_PLANT_FAIL: {
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
        case fromPlant.LOAD_PLANT_INFO_SUCCESS: {
           const data = action.payload; 
           console.log(data, ' from reducer')
            return {
                ...state,
                loading: false, 
                loaded: true, 
                data
            }
        }
        // Edit 
        case fromPlant.EDIT_PLANT: {
           const data = action.payload; 
           //console.log(data, ' from reducer')
            return {
                ...state,
                loading: false, 
                loaded: true, 
                editSuccess: false
            }
        }
        case fromPlant.EDIT_PLANT_FAIL: {
            const { status, statusText } = action.payload;
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                loaded: false,
                editSuccess: false, 
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.EDIT_PLANT_SUCCESS: {
            return {
                ...state,
                loading: false, 
                loaded: true, 
                editSuccess: true,
            }
        }
        // Reset 
        case fromPlant.RESET_PLANT: {
            return {
                ...state,
                loading: false, 
                loaded: false, 
                editSuccess: false,
                addSuccess: false, 
                addSame: false, 
                editExisting: false
            }
        }
        // Add 
        case fromPlant.ADD_PLANT: {
            const data = action.payload;
            //console.log(data, ' from reducer')
            return {
                ...state,
                loading: false,
                loaded: true,
                addSuccess: false
            }
        }
        case fromPlant.ADD_PLANT_FAIL: {
            const { status, statusText } = action.payload;
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                loaded: false,
                addSuccess: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.ADD_PLANT_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                addSuccess: true,
                errMessage: ''
            }
        }
        case fromPlant.ADD_SAME_PLANT: {
            const data = action.payload;
            console.log(data, ' from effects')
            return {
                ...state,
                loading: false,
                loaded: true,
                addSame: true, 
                data
            }
        }
        case fromPlant.EDIT_EXISTING_PLANT: {
            const data = action.payload;
            console.log(data, ' from effects')
            return {
                ...state,
                loading: false,
                loaded: true,
                editExisting: true,
                data
            }
        }

        case fromPlant.WATER_PLANT_SUCCESS:
        case fromPlant.FERTILIZE_PLANT_SUCCESS: {
            const data = action.payload;
            // const arrToSort = [...state.data];
            // var indexToReplace = state.data.findIndex(p => p.id == updatedPlant.id);
            // arrToSort[indexToReplace] = updatedPlant;
            // var data = arrToSort;
            // console.log(arrToSort, indexToReplace, ' from reducer');
            // var data = arrToSort.splice(0, indexToReplace).concat(updatedPlant).concat(arrToSort.splice(indexToReplace, arrToSort.length - 1)); 

            return {
                ...state,
                loading: false,
                loaded: true,
                data,
            }
        }
       
    }
    return state; 
}

export const getPlantLoading = (state: PlantState) => state.loading; 
export const getPlantLoaded = (state: PlantState) => state.loaded; 
export const getPlant = (state: PlantState) => state.data;
export const getPlantErrMessage = (state: PlantState) => state.errMessage;
export const getEditPlantSuccess = (state: PlantState) => state.editSuccess; 
export const getAddPlantSuccess = (state: PlantState) => state.addSuccess; 
export const getAddSamePlant = (state: PlantState) => state.addSame; 
export const getEditExistingPlant = (state: PlantState) => state.editExisting; 