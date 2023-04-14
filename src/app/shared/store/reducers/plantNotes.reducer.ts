import { INITIAL_REDUCERS } from "@ngrx/store";
import {PlantNote} from "../../models/PlantNote"; 
import * as fromPlant from "../actions/plantNotes.action"; 

export interface PlantNotesState{
    data: PlantNote[],
    loaded: boolean,
    loading: boolean,
    errMessage: string,
    addingChildToData: boolean // checks if adding action is being performed
}; 

export const initialState: PlantNotesState ={
    data: [],
    loaded: false,
    loading: false,
    errMessage: '', 
    addingChildToData: false 
}; 

export function reducer(state: PlantNotesState = initialState, action: fromPlant.PlantNotesAction): PlantNotesState {
    switch (action.type) {
        case fromPlant.LOAD_PLANT_NOTES:
            return {
                ...state,
                loading: true, 
                addingChildToData: false
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
        case fromPlant.CANCEL_PRE_ADD_PLANT_NOTE: {
            
            const data = state.data.filter(x => x.id != undefined); 
            
            return {
                ...state,
                loading: false,
                loaded: true,
                addingChildToData: false,
                data
            }
        }
        case fromPlant.PRE_ADD_PLANT_NOTE: {
            const data = [...state.data, new PlantNote()] ; 
            
            return {
                ...state,
                loading: false,
                loaded: true,
                addingChildToData: true,
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
                addingChildToData: false,
            }
        }
        case fromPlant.ADD_PLANT_NOTE_FAIL: {
            const { status, statusText } = action.payload;
            
            return {
                ...state,
                loading: false,
                loaded: false,
                addingChildToData: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.ADD_PLANT_NOTE_SUCCESS: {
            const returnedData = action.payload; 
            let filteredData = state.data.filter(x => x.id != undefined); 
            const data = [...filteredData, returnedData]; 
            console.log(data)
            return {
                ...state,
                loading: false,
                loaded: true,
                addingChildToData: false,
                data
            }
        }
        case fromPlant.EDIT_PLANT_NOTE: {
            const data = action.payload

            return {
                ...state,
                loading: true,
                loaded: false,
                addingChildToData: false,
            }
        }
        case fromPlant.EDIT_PLANT_NOTE_FAIL: {
            const { status, statusText } = action.payload;

            return {
                ...state,
                loading: false,
                loaded: false,
                addingChildToData: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.EDIT_PLANT_NOTE_SUCCESS: {
            const returnedData = action.payload; 
            const indexToReplace = state.data.findIndex(x=> x.id == returnedData.id); 
            const arrToSort = [...state.data]; 
            arrToSort[indexToReplace] = returnedData; 
            const data = arrToSort; 

            return {
                ...state,
                loading: false,
                loaded: true,
                addingChildToData: false,
                data
            }
        }
        case fromPlant.DELETE_PLANT_NOTE: {
            const data = action.payload

            return {
                ...state,
                loading: true,
                loaded: false,
                addingChildToData: false,
            }
        }
        case fromPlant.DELETE_PLANT_NOTE_FAIL: {
            const { status, statusText } = action.payload;

            return {
                ...state,
                loading: false,
                loaded: false,
                addingChildToData: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromPlant.DELETE_PLANT_NOTE_SUCCESS: {
            const payload = action.payload;

            const data = state.data.filter(note => note.id != action.payload.Id)

            return {
                ...state,
                loading: false,
                loaded: true,
                addingChildToData: false,
                data
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
export const getPlantNotesAddingChildNote = (state: PlantNotesState) => state.addingChildToData;
