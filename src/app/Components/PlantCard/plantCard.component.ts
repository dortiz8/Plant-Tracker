import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plant } from 'src/app/shared/models/Plant';
import { PlantService } from 'src/app/shared/services/plants/PlantService';
import { StyleMethods } from '../../shared/services/utils/styleMethods';
import { Store } from '@ngrx/store';
import * as fromStore from '../../shared/store';
import { AddSamePlant } from '../../shared/store';
import { from, Observable } from 'rxjs';
import { PlantDelete } from 'src/app/shared/models/PlantDelete';

@Component({
    selector: 'plant-card',
    templateUrl: './plantCard.component.html',
     
    providers: []
})
export class PlantCardComponent {
    styleMethods = StyleMethods;
    @Input() plant: Plant; 
    errorMessage: string = '';
    showError: boolean; loading$: Observable<boolean>;
    userIdFromStorage: string | null; 
    userId: number; 
    releasedAt: FormGroup; 
    plantToDelete: PlantDelete; 
    deletePanelIsOn: boolean; 
    
    constructor(private store: Store<fromStore.ProductsState>, private readonly plantService: PlantService, private readonly router: Router) {
        
        
    }
    ngOnInit(){
        this.loading$ = this.store.select(fromStore.getPlantLoading);
        this.releasedAt = new FormGroup({
            dateInput: new FormControl("username", [Validators.required]),
        }); 
        this.userIdFromStorage = localStorage.getItem('userId'); 
        if (this.userIdFromStorage != null) this.userId = parseInt(this.userIdFromStorage); 
    }

    waterFertilizePlantPatch(actionName: string){
       actionName == 'water' ? this.store.dispatch(new fromStore.WaterPlant(this.plant.id)) : 
                                this.store.dispatch(new fromStore.FertilizePlant(this.plant.id)); 
    }
    navigateToPlantEditPage(){
        this.router.navigate(['/editPlant', this.plant.id]);
    }
    navigateToAddPlantPage(){
        this.store.dispatch(new fromStore.AddSamePlant(this.plant))
    }

    deletePlant(){
        this.plantToDelete = {userId: this.userId, plantId: this.plant.id}; 

        this.store.dispatch(new fromStore.DeletePlant(this.plantToDelete))
    }
    startDeleteProcess(){
        this.deletePanelIsOn = true; 
    }
    cancelDelete(){
        this.deletePanelIsOn = false; 
    }

    
}; 
