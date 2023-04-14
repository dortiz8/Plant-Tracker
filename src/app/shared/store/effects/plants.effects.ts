import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, delay } from 'rxjs/operators';
import { PlantDateService } from '../../services/dates/PlantDateService';
import { PlantService } from '../../services/plants/PlantService';

import * as plantActions from '../actions/plants.action'; 
import * as fromStore from '..';
@Injectable()
export class PlantsEffects {
    /**
     *
     */
    constructor(private readonly plantService: PlantService,
        private readonly dateService: PlantDateService, private actions$: Actions, private readonly store: Store) {
    }
   
    loadPlants$ = createEffect(() => this.actions$.pipe(ofType(plantActions.LOAD_PLANTS),
        mergeMap(({ payload })=> this.plantService.getPlantList(payload)
            .pipe(
                map(plants => {
                    // We may need to move this logic moved at db level, but it is mainly used to change the state of 
                    const updatedPlants = this.dateService.changePlantStateBasedOnDate(plants)
                    return new plantActions.LoadPlantsSuccess(updatedPlants)
                }),
                catchError((err) => of(new plantActions.LoadPlantsFail(err)))
            )))); 

    waterPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.WATER_PLANT),
        mergeMap(({payload})=> this.plantService.patchWaterOrFertilizePlant(payload)
            .pipe(
                map(plant => {
                    // We may need to move this logic moved at db level, but it is mainly used to change the state of 
                    const updatedPlant = this.dateService.changeSinglePlantStateBasedOnDateAndReturn(plant); 
                    console.log(updatedPlant); 
                    return new plantActions.WaterPlantSuccess(updatedPlant)
                }),
                catchError((err) => of(new plantActions.WaterPlantFail(err)))
            )))); 
    fertilizePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.FERTILIZE_PLANT),
        mergeMap(({payload})=> this.plantService.patchWaterOrFertilizePlant(payload)
            .pipe(
                map(plant => {
                    const updatedPlant = this.dateService.changeSinglePlantStateBasedOnDateAndReturn(plant);
                    return new plantActions.FertilizePlantSuccess(updatedPlant)
                }),
                catchError((err) => of(new plantActions.FertilizePlantFail(err)))
            )))); 
    deletePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.DELETE_PLANT), delay(2000),
        mergeMap(({ payload }) => this.plantService.deletePlantById(payload)
            .pipe(
                map(data => {
                    console.log(data, ' from effects after put request')
                    return new plantActions.DeletePlantSuccess(payload)
                }),
                catchError((err) => of(new plantActions.DeletePlantFail(err)))
            ))));
}