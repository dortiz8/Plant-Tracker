import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PlantDelete } from 'src/app/shared/models/PlantDelete';
import * as fromStore from '../../shared/store';

@Component({
    selector: 'plant-details',
    templateUrl: './plantDetails.component.html',
    styleUrls: ['./plantDetails.component.css'],
    providers: []
})
export class PlantDetailsComponent {
    /**
     *
     */
    plantId: string | null | undefined = ''
    deletingStarted$: Observable<boolean>; 
    plantToDelete$: Observable<PlantDelete>; 
    plantLoading$: Observable<boolean>;
    plantLoaded$: Observable<boolean>;
    plantSubscription: Subscription; 
    constructor(private readonly route: ActivatedRoute, private router: Router, private store: Store<fromStore.ProductsState>,) {
    }
    
    
    ngOnInit() {
        this.plantSubscription = new Subscription(); 
        this.plantLoading$ = this.store.select(fromStore.getPlantLoading);
        this.plantLoaded$ = this.store.select(fromStore.getPlantLoaded);
        this.plantId = this.route.snapshot.paramMap.get('plantId'); 
        this.deletingStarted$ = this.store.select(fromStore.getPlantsDeletingStarted); 
        this.plantToDelete$ = this.store.select(fromStore.getPlantsPlantToDelete); 
    };
    ngOnDestroy(){
        this.plantSubscription.unsubscribe(); 
    }

    navigateToFragment(fragment: string): void{
        
        this.router.navigateByUrl('/plantDetails/' + this.plantId + '#' + fragment); 
    }

    cancelDelete() {
        this.store.dispatch(new fromStore.CancelDeletePlantProcess()); 
    }

    deletePlant() {
        var plantToDelete = new PlantDelete(); 
        var plantToDeleteSubscription = this.plantToDelete$.subscribe(x =>{
            if (Object.keys(x).length){
                plantToDelete.userId = x.userId;
                plantToDelete.plantId = x.plantId;
                plantToDelete.plantName = x.plantName;
            }
        })

        this.plantSubscription.add(plantToDeleteSubscription)
        
        this.store.dispatch(new fromStore.DeletePlant(plantToDelete));
    }
}; 