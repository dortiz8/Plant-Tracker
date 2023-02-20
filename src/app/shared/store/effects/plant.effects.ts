import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { PlantDateService } from '../../services/dates/PlantDateService';
import { PlantService } from '../../services/plants/PlantService';
import * as plantActions from '../actions/plant.action';

@Injectable()
export class PlantEffects {
    /**
     *
     */
    constructor(private readonly plantService: PlantService,
        private readonly dateService: PlantDateService, private actions$: Actions, private readonly store: Store) {
    }

    userId = localStorage.getItem('userId');
    userIdNum = this.userId != null ? parseInt(this.userId) : 0;

    loadPlants$ = createEffect(() => this.actions$.pipe(ofType(plantActions.LOAD_PLANT),
        mergeMap(({payload}) => this.plantService.getPlantById(this.userId, payload)
            .pipe(
                map(plant => {
                    console.log(plant, ' from effects')
                    return new plantActions.LoadPlantSuccess(plant)
                }),
                catchError((err) => of(new plantActions.LoadPlantFail(err)))
            ))));
}