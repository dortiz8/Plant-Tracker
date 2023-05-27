import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import {of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom, delay } from 'rxjs/operators';
import { PlantService } from "../../services/plants/PlantService";
import * as plantsStatsActions from '../actions/plantsStats.action'; 


@Injectable()
export class PlantsStatsEffects{
    /**
     *
     */
    constructor(private actions$: Actions, private readonly store: Store, 
        private readonly plantService: PlantService) {
        
    }
        loadPlatsStats$ = createEffect(() => this.actions$.pipe(ofType(plantsStatsActions.LOAD_PLANTS_STATS),
            mergeMap(({ payload }) => this.plantService.getPlantsStatsById(payload)
                .pipe(
                    map(stats => {
                        console.log('from effects')
                        return new plantsStatsActions.LoadPlantsStatsSuccess(stats)
                    }),
                    catchError((err) => of(new plantsStatsActions.LoadPlantsStatsFail(err)))
                )))); 
}