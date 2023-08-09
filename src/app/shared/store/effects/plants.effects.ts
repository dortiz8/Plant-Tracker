import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, delay, tap } from 'rxjs/operators';
import { PlantDateService } from '../../services/dates/PlantDateService';
import { PlantService } from '../../services/plants/PlantService';

import * as plantActions from '../actions/plants.action'; 
import * as fromStore from '..';
import { Router } from '@angular/router';
import { HOME_ROUTE } from '../../constants/routes';
@Injectable()
export class PlantsEffects {
    /**
     *
     */
    constructor(private readonly plantService: PlantService,
        private readonly dateService: PlantDateService, 
        private actions$: Actions, 
        private readonly store: Store, 
        private readonly router: Router) {
    }
   
    loadPlants$ = createEffect(() => this.actions$.pipe(ofType(plantActions.LOAD_PLANTS), delay(1000),
        mergeMap(({ payload })=> this.plantService.getPlantList(payload)
            .pipe(
                map(plants => {
                    // We may need to move this logic moved at db level, but it is mainly used to change the state of 
                    const updatedPlants = this.dateService.changePlantStateBasedOnDate(plants)
                    return new plantActions.LoadPlantsSuccess(updatedPlants)
                }),
                catchError((err) => of(new plantActions.LoadPlantsFail(err)))
            )))); 

    deletePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.DELETE_PLANT), delay(1000),
        mergeMap(({ payload }) => this.plantService.deletePlantById(payload)
            .pipe(
                map(data => {
                    return new plantActions.DeletePlantSuccess(payload)
                }),
                catchError((err) => of(new plantActions.DeletePlantFail(err)))
            ))));
    deletePlantSuccess$ = createEffect(() => this.actions$.pipe(ofType(plantActions.DELETE_PLANT_SUCCESS),
        tap(() => this.router.navigate([HOME_ROUTE]))),
        { dispatch: false });
}