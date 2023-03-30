import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, delay, tap } from 'rxjs/operators';
import { PlantInfo } from '../../models/PlantInfo';
import { PlantDateService } from '../../services/dates/PlantDateService';
import { PlantService } from '../../services/plants/PlantService';
import * as plantActions from '../actions/plant.action';

@Injectable()
export class PlantEffects {
    /**
     *
     */
    constructor(private readonly plantService: PlantService,
        private readonly dateService: PlantDateService, 
        private actions$: Actions, private readonly store: Store, 
        private readonly router: Router,) {
    }

    userId = localStorage.getItem('userId');
    userIdNum = this.userId != null ? parseInt(this.userId) : 0;

    loadPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.LOAD_PLANT), delay(2000),
        mergeMap(({payload}) => this.plantService.getPlantById(this.userId, payload)
            .pipe(
                map(plant => {
                    //console.log(plant, ' from effects')
                    console.log(typeof plant)
                    if (plant instanceof PlantInfo) { return new plantActions.LoadPlantInfoSuccess(plant) }
                    return new plantActions.LoadPlantSuccess(plant)
                }),
                catchError((err) => of(new plantActions.LoadPlantFail(err)))
            ))));
    editPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.EDIT_PLANT), delay(2000),
        mergeMap(({payload}) => this.plantService.putPlantById(payload)
            .pipe(
                map(data => {
                    console.log(data, ' from effects after put request')
                    return new plantActions.EditPlantSuccess()
                }),
                catchError((err) => of(new plantActions.EditPlantFail(err)))
            ))));
    addPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.ADD_PLANT), delay(2000),
        mergeMap(({ payload }) => this.plantService.addPlantbyId(payload)
            .pipe(
                map(data => {
                    console.log(data, ' from effects after put request')
                    return new plantActions.AddPlantSuccess()
                }),
                catchError((err) => of(new plantActions.EditPlantFail(err)))
            ))));
    // This action constitutes a side effect after changing the store with. 
    addSamePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.ADD_SAME_PLANT),
        tap(() => this.router.navigate(['/addPlant']))),
         { dispatch: false });
   
    
}