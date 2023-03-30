import {PlantNote} from "../../models/PlantNote"; 
import * as fromPlant from "../actions/plantNotes.action"; 

export interface PlantNotesState{
    data: PlantNote[],
    loaded: boolean,
    loading: boolean,
    errMessage: string,
    isEditing: boolean // checks if child plant in array is on edit mode
}; 

export const initialState: PlantNotesState ={
    data: [],
    loaded: false,
    loading: false,
    errMessage: '', 
    isEditing: false 
}; 

export function reducer(state: PlantNotesState = initialState, action: fromPlant.PlantNotesAction): PlantNotesState {
    switch (action.type) {
        case fromPlant.LOAD_PLANT_NOTES:
            return {
                ...state,
                loading: true, 
                isEditing: false
            }
            break;
        case fromPlant.LOAD_PLANT_NOTES_FAIL: {
            const { status, statusText } = action.payload;
            
            return {
                ...state,
                loading: false,
                loaded: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.LOAD_PLANT_NOTES_SUCCESS: {
            const data = action.payload;
            
            return {
                ...state,
                loading: false,
                loaded: true,
                data,
            }
        }
        case fromPlant.PRE_ADD_PLANT_NOTE: {
            const data = [...state.data, new PlantNote()] ; 
            
            return {
                ...state,
                loading: false,
                loaded: true,
                isEditing: true,
                data
            }
        }
        case fromPlant.ADD_PLANT_NOTE: {
            const data = action.payload ; 
            console.log(data, ' from reducer plantnotes')
            return {
                ...state,
                loading: false,
                loaded: true,
                isEditing: false,
            }
        }
        case fromPlant.ADD_PLANT_NOTE_FAIL: {
            const { status, statusText } = action.payload;
            
            return {
                ...state,
                loading: false,
                loaded: false,
                isEditing: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.ADD_PLANT_NOTE_SUCCESS: {
            const data = action.payload; 
            
            return {
                ...state,
                loading: false,
                loaded: true,
                isEditing: false,
            }
        }

        default:
            return state;
    }
}

export const getPlantNotesLoading = (state: PlantNotesState) => state.loading;
export const getPlantNotesLoaded = (state: PlantNotesState) => state.loaded;
export const getPlantNotes = (state: PlantNotesState) => state.data;
export const getPlantNotesErrMessage = (state: PlantNotesState) => state.errMessage;
export const getPlantNotesIsOnEditMode = (state: PlantNotesState) => state.isEditing;
