import { Component } from '@angular/core';
import { Plant } from '../../shared/models/Plant';

// Route information
import { from, Observable } from 'rxjs';
import { Store, createAction } from '@ngrx/store';
import * as fromStore from '../../shared/store'; 
import { LocalStorageService } from 'src/app/shared/services/utils/LocalStorageService';
import { USER_ID } from 'src/app/shared/constants/auth';
import { PlantsStats } from 'src/app/shared/models/PlantsStats';
import { Subscription } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'plant-list',
  templateUrl: './plantList.component.html',
  styleUrls: ['./plantList.component.css'],
})
export class PlantListComponent {
  // The $ sign means that this will be an observable variable
  // Purely conventional but not necessary
  userId$: Observable<string>; 
  plants$: Observable<Plant[]>;
  plants: Plant[]; 
  loading$: Observable<boolean>; 
  loadingFailed$: Observable<boolean>; 
  errMessage$: Observable<string>; 
  plantSubscription: Subscription;

  userId: string | undefined;
  searchIcon = faMagnifyingGlass;
  
  name: string = ''; 
  today: String = new Date().toDateString(); 
  searchValue: string; 
  // Move this to a service...  
  constructor(
     private store: Store<fromStore.ProductsState>,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.plantSubscription = new Subscription(); 
    this.plants$ = this.store.select(fromStore.getAllPlants);  
    this.loading$ = this.store.select(fromStore.getPlantsLoading); 
    this.loadingFailed$ = this.store.select(fromStore.getPlantsLoaded); 
    this.errMessage$ = this.store.select(fromStore.getPlantsErrMessage); 
    this.userId$ = this.store.select(fromStore.getUserId); 
    // We are going to load all plants by dispatching an action 
    this.loadUserId(); 
    this.loadPlants(); 
    this.mapPlants(); 
  }

  ngOnDestroy() {
    this.plantSubscription.unsubscribe(); 
  }

  loadUserId() {
    var userIdSubscription = this.userId$.subscribe(userId => {
      if (userId != null) {
        this.userId = userId
      } else {
        var retrievedUserId = this.localStorageService.retrieveKey('userId');
        if (retrievedUserId != null) {
          this.userId = retrievedUserId
        }
      }
    });

    this.plantSubscription.add(userIdSubscription);
  }

  loadPlants(){
    this.store.dispatch(new fromStore.LoadPlants(this.userId)); 
  }

  mapPlants(){
    var plantsSubscription = this.plants$.subscribe(plants => {
      this.plants = plants; 
    }); 

    this.plantSubscription.add(plantsSubscription); 
  }

  search() {
    console.log(this.searchValue)
  }

}


