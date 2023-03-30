import { Action } from '@ngrx/store';
import { PlantNote } from '../../models/PlantNote';
import { PlantNoteCreation } from '../../models/PlantNoteCreation';
import { PlantNoteDelete } from '../../models/PlantNoteDelete';
import {PatchArray} from '../../models/PatchObject'; 

export const LOAD_PLANT_NOTES = '[Products] Load Plant Notes';
export const LOAD_PLANT_NOTES_FAIL = '[Products] Load Plant Notes Fail';
export const LOAD_PLANT_NOTES_SUCCESS = '[Products] Load Plant Notes Success';
export const PRE_ADD_PLANT_NOTE = '[Products] Pre Add Plant Note';
export const ADD_PLANT_NOTE = '[Products] Add Plant Note';
export const ADD_PLANT_NOTE_FAIL = '[Products] Add Plant Note Fail';
export const ADD_PLANT_NOTE_SUCCESS = '[Products] Add Plant Note Success';
export const EDIT_PLANT_NOTE = '[Products] Edit Plant Note';
export const EDIT_PLANT_NOTE_FAIL = '[Products] Edit Plant Note Fail';
export const EDIT_PLANT_NOTE_SUCCESS = '[Products] Edit Plant Note Success';
export const DELETE_PLANT_NOTE = '[Products] Delete Plant Note';
export const DELETE_PLANT_NOTE_FAIL = '[Products] Delete Plant Note Fail';
export const DELETE_PLANT_NOTE_SUCCESS = '[Products] Delete Plant Note Success';

//#region Loading Plant Notes
export class LoadPlantNotes implements Action {
    readonly type = LOAD_PLANT_NOTES;
    constructor(public payload: any) { }
}
export class LoadPlantNotesFail implements Action {
    readonly type = LOAD_PLANT_NOTES_FAIL;
    constructor(public payload: any) { }
}
export class LoadPlantNotesSuccess implements Action {
    readonly type = LOAD_PLANT_NOTES_SUCCESS;
    constructor(public payload: PlantNote[]) { }
}
//#endregion

//#region Adding Plant Notes
export class PreAddPlantNote implements Action {
    readonly type = PRE_ADD_PLANT_NOTE;
}
export class AddPlantNote implements Action {
    readonly type = ADD_PLANT_NOTE;
    constructor(public payload: PlantNoteCreation) { }
}
export class AddPlantNoteFail implements Action {
    readonly type = ADD_PLANT_NOTE_FAIL;
    constructor(public payload: any) { }
}
export class AddPlantNoteSuccess implements Action {
    readonly type = ADD_PLANT_NOTE_SUCCESS;
    constructor(public payload: PlantNote) { }
}
//#endregion

//#region Editing Plant Notes
export class EditPlantNote implements Action {
    readonly type = EDIT_PLANT_NOTE;
    constructor(public payload: PatchArray) { }
}
export class EditPlantNoteFail implements Action {
    readonly type = EDIT_PLANT_NOTE_FAIL;
    constructor(public payload: any) { }
}
export class EditPlantNoteSuccess implements Action {
    readonly type = EDIT_PLANT_NOTE_SUCCESS;
    constructor(public payload: PlantNote[]) { }
}
//#endregion

//#region Editing Plant Notes
export class DeletePlantNote implements Action {
    readonly type = DELETE_PLANT_NOTE;
    constructor(public payload: PlantNoteDelete) { }
}
export class DeletePlantNoteFail implements Action {
    readonly type = DELETE_PLANT_NOTE_FAIL;
    constructor(public payload: any) { }
}
export class DeletePlantNoteSuccess implements Action {
    readonly type = DELETE_PLANT_NOTE_SUCCESS;
    constructor(public payload: any) { }
}
//#endregion
export type PlantNotesAction = LoadPlantNotes | LoadPlantNotesFail | LoadPlantNotesSuccess |
    PreAddPlantNote | AddPlantNote | AddPlantNoteFail | AddPlantNoteSuccess |
    EditPlantNote | EditPlantNoteFail | EditPlantNoteSuccess | 
    DeletePlantNote | DeletePlantNoteFail | DeletePlantNoteSuccess; 