import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from 'rxjs/operators';
import { PlantService } from "../../services/plants/PlantService";
import * as plantNotesActions from '../actions/plantNotes.action';
@Injectable()
export class PlantNotesEffects{
    /**
     *
     */
    constructor(private readonly plantService: PlantService, private actions$: Actions, 
        private readonly store: Store) {
    }

    loadPlantNotes$ = createEffect(() => this.actions$.pipe(ofType(plantNotesActions.LOAD_PLANT_NOTES),
        mergeMap(({ payload }) => this.plantService.getPlantNotesById(payload)
            .pipe(
                map(notes => {
                    return new plantNotesActions.LoadPlantNotesSuccess(notes)
                }),
                catchError((err) => of(new plantNotesActions.LoadPlantNotesFail(err)))
            )))); 
    addPlantNote$ = createEffect(() => this.actions$.pipe(ofType(plantNotesActions.ADD_PLANT_NOTE),
        mergeMap(({ payload }) => this.plantService.addPlantNotebyId(payload)
            .pipe(
                map(note => {
                    return new plantNotesActions.AddPlantNoteSuccess(note)
                }),
                catchError((err) => of(new plantNotesActions.AddPlantNoteFail(err)))
            )))); 
    deletePlantNote$ = createEffect(() => this.actions$.pipe(ofType(plantNotesActions.DELETE_PLANT_NOTE),
        mergeMap(({ payload }) => this.plantService.deletePlantNoteById(payload)
            .pipe(
                map(note => {
                    
                    return new plantNotesActions.DeletePlantNoteSuccess(payload)
                }),
                catchError((err) => of(new plantNotesActions.DeletePlantNoteFail(err)))
            )))); 
    editPlantNote$ = createEffect(() => this.actions$.pipe(ofType(plantNotesActions.EDIT_PLANT_NOTE),
        mergeMap(({ payload }) => this.plantService.patchPlantNotebyId(payload)
            .pipe(
                map(note => {
                    return new plantNotesActions.EditPlantNoteSuccess(note)
                }),
                catchError((err) => of(new plantNotesActions.EditPlantNoteFail(err)))
            )))); 

}