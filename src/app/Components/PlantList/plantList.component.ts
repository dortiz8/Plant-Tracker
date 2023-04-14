import { Component } from '@angular/core';
import { Plant } from '../../shared/models/Plant';

// Route information
import { from, Observable } from 'rxjs';
import { Store, createAction } from '@ngrx/store';
import * as fromStore from '../../shared/store'; 
import { LocalStorageService } from 'src/app/shared/services/authentication/LocalStorageService';
import { USER_ID } from 'src/app/shared/constants/auth';
@Component({
  selector: 'plant-list',
  templateUrl: './plantList.component.html',
  styleUrls: ['./plantList.component.css'],
  providers: []
})
export class PlantListComponent {
  // The $ sign means that this will be an observable variable
  // Purely conventional but not necessary
  userId$: Observable<string>; 
  plants$: Observable<Plant[]>;
  loading$: Observable<boolean>; 
  loadingFailed$: Observable<boolean>; 
  errMessage$: Observable<string>; 
  
  name: string = ''; 
  today: String = new Date().toDateString(); 
  // Move this to a service...  
  constructor(
     private store: Store<fromStore.ProductsState>,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    
    this.plants$ = this.store.select(fromStore.getAllPlants);  
    this.loading$ = this.store.select(fromStore.getPlantsLoading); 
    this.loadingFailed$ = this.store.select(fromStore.getPlantsLoaded); 
    this.errMessage$ = this.store.select(fromStore.getPlantsErrMessage); 
    this.userId$ = this.store.select(fromStore.getUserId); 
    // We are going to load all plants by dispatching an action 
   this.loadPlants(); 
    
  }

  loadPlants(){
    this.userId$.subscribe(x =>{
      if(x == undefined){
        this.store.dispatch(new fromStore.LoadPlants(this.localStorageService.retrieveKey(USER_ID))); 
        return; 
      }
      this.store.dispatch(new fromStore.LoadPlants(x))
    }); 
  }


}


