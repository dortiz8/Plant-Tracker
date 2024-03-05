import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of } from 'rxjs';
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

    loadPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.LOAD_PLANT), delay(1000),
        mergeMap(({payload}) => this.plantService.getPlantById(payload)
            .pipe(
                map(plant => {
                    const updatedPlant = this.dateService.changePlantStateBasedOnDate([plant])
                    if (plant instanceof PlantInfo) { return new plantActions.LoadPlantInfoSuccess(updatedPlant[0]) }
                    return new plantActions.LoadPlantSuccess(updatedPlant[0])
                }),
                catchError((err) => of(new plantActions.LoadPlantFail(err)))
            ))));
    // editPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.EDIT_PLANT),
    //     mergeMap(({payload}) => this.plantService.putPlantById(payload)
    //         .pipe(
    //             map(data => {
    //                 console.log(data, ' from effects after put request')
    //                 return new plantActions.EditPlantSuccess()
    //             }),
    //             catchError((err) => of(new plantActions.EditPlantFail(err)))
    //         ))));
    editPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.EDIT_PLANT), delay(1000),
        mergeMap(({ payload }) => this.plantService.putPlantById(payload)
            .pipe(
                map(data => ({ payload, data }))
            )),
        mergeMap(({ payload, data }) => this.plantService.addNewPlantImage(payload, data)
            .pipe(
                map(data => {
                    return new plantActions.EditPlantSuccess(payload) // Add an effect to return to previous page
                }), catchError((err) => of(new plantActions.EditPlantFail(err)))
            ))));

    editPlantSuccess$ = createEffect(() => this.actions$.pipe(ofType(plantActions.EDIT_PLANT_SUCCESS),
        tap((prop: plantActions.EditPlantSuccess) => this.router.navigate([`/plantDetails/${prop.payload.id}`]))),
        { dispatch: false });
    
    addPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.ADD_PLANT), delay(1000),
        mergeMap(({ payload }) => this.plantService.addPlantbyId(payload)
            .pipe(
                map(data => ({ payload, data }))
            )), 
        mergeMap(({ payload, data }) => this.plantService.addNewPlantImage(payload, data)
            .pipe(
                map(data => {
                    return new plantActions.AddPlantSuccess(data.id)
                }), catchError((err) => of(new plantActions.AddPlantFail(err)))
            ))));

    addPlantSuccess$ = createEffect(() => this.actions$.pipe(ofType(plantActions.ADD_PLANT_SUCCESS),
        tap((prop: plantActions.AddPlantSuccess) => this.router.navigate([`/plantDetails/${prop.payload}`]))),
        { dispatch: false });

    // This action constitutes a side effect after changing the store with. 
    editExistingPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.EDIT_EXISTING_PLANT),
        tap(() => this.router.navigate(['/addPlant']))),
        { dispatch: false });
    addSamePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.ADD_SAME_PLANT),
        tap(() => this.router.navigate(['/addPlant']))),
         { dispatch: false });
   
    waterPlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.WATER_PLANT),
        mergeMap(({ payload }) => this.plantService.patchWaterOrFertilizePlant(payload)
            .pipe(
                map(plant => {
                    // We may need to move this logic moved at db level, but it is mainly used to change the state of 
                    const updatedPlant = this.dateService.changeSinglePlantStateBasedOnDateAndReturn(plant);
                    return new plantActions.WaterPlantSuccess(updatedPlant)
                }),
                catchError((err) => of(new plantActions.WaterPlantFail(err)))
            ))));
    fertilizePlant$ = createEffect(() => this.actions$.pipe(ofType(plantActions.FERTILIZE_PLANT),
        mergeMap(({ payload }) => this.plantService.patchWaterOrFertilizePlant(payload)
            .pipe(
                map(plant => {
                    const updatedPlant = this.dateService.changeSinglePlantStateBasedOnDateAndReturn(plant);
                    return new plantActions.FertilizePlantSuccess(updatedPlant)
                }),
                catchError((err) => of(new plantActions.FertilizePlantFail(err)))
            ))));
}