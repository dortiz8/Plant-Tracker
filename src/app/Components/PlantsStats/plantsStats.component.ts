import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { USER_ID } from "src/app/shared/constants/auth";
import { Plant } from "src/app/shared/models/Plant";
import { PlantsStats } from "src/app/shared/models/PlantsStats";
import { LocalStorageService } from "src/app/shared/services/utils/LocalStorageService";
import * as fromStore from '../../shared/store';
import { faCaretDown, faCaretUp, faDroplet, faPlantWilt, faSmile } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";

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
    plantSubscription: Subscription;

    collapseMenu: boolean = true; 
    
    name: string = '';
    today: Date = new Date(); 
    
    //Icons 
    waterIcon = faDroplet;
    fertilizeIcon = faPlantWilt; 
    smileIcon = faSmile; 
    unCollapseIcon = faCaretDown; 
    collapseIcon = faCaretUp; 
    constructor(
        private store: Store<fromStore.ProductsState>,
        private localStorageService: LocalStorageService) {
            
        }
    ngOnInit(){
        this.plantSubscription = new Subscription();
        this.userId$ = this.store.select(fromStore.getUserId); 
        this.plantsStats$ = this.store.select(fromStore.getPlantsStats); 
        this.loaded$ = this.store.select(fromStore.getPlantsStatsLoaded); 
        this.loading$ = this.store.select(fromStore.getPlantsStatsLoading); 
        this.loadPlatStats(); 
        this.mapPlantsStats(); 
    }
    
    loadPlatStats(){
        var userIdSubscription = this.userId$.subscribe(x => {
            if (x == undefined) {
                this.store.dispatch(new fromStore.LoadPlantsStats(this.localStorageService.retrieveKey(USER_ID)));
                return;
            }
            this.store.dispatch(new fromStore.LoadPlantsStats(x))
        }); 
        this.plantSubscription.add(userIdSubscription)
    }

    mapPlantsStats(){
        this.plantsStats$.subscribe(x =>{
            console.log(x); 
            this.plantStats = x
        } ); 
        
    }
 }