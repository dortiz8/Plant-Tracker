import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { USER_ID } from "src/app/shared/constants/auth";
import { Plant } from "src/app/shared/models/Plant";
import { PlantsStats } from "src/app/shared/models/PlantsStats";
import { LocalStorageService } from "src/app/shared/services/authentication/LocalStorageService";
import * as fromStore from '../../shared/store';
import { faDroplet, faPlantWilt, faSmile } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'plants-stats',
    templateUrl: './plantsStats.component.html',
    styleUrls: ['./plantsStats.component.css'],
    providers: []
})
export class PlantsStatsComponent {
    userId$: Observable<string>;
    plantsStats$: Observable<PlantsStats>;
    plantStats: PlantsStats; 
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>; 
    loadingFailed$: Observable<boolean>;
    errMessage$: Observable<string>;

    name: string = '';
    today: Date = new Date(); 

    //Icons 
    waterIcon = faDroplet;
    fertilizeIcon = faPlantWilt; 
    smileIcon = faSmile; 
    constructor(
        private store: Store<fromStore.ProductsState>,
        private localStorageService: LocalStorageService) {

    }
    ngOnInit(){
        this.userId$ = this.store.select(fromStore.getUserId); 
        this.plantsStats$ = this.store.select(fromStore.getPlantsStats); 
        this.loaded$ = this.store.select(fromStore.getPlantsStatsLoaded); 
        this.loading$ = this.store.select(fromStore.getPlantsStatsLoading); 
        this.loadPlatStats(); 
        this.mapPlantsStats(); 
    }

    loadPlatStats(){
        this.userId$.subscribe(x => {
            if (x == undefined) {
                this.store.dispatch(new fromStore.LoadPlantsStats(this.localStorageService.retrieveKey(USER_ID)));
                return;
            }
            this.store.dispatch(new fromStore.LoadPlantsStats(x))
        }); 
    }

    mapPlantsStats(){
        this.plantsStats$.subscribe(x =>{
            console.log(x); 
            this.plantStats = x
        } ); 
        
    }
 }