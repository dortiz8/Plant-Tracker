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
import { ObjectMapper } from 'src/app/shared/services/utils/objectMapper';
import { PlantDateService } from 'src/app/shared/services/dates/PlantDateService';
import {faAdd, faTrash, faPen, faDroplet, faPlantWilt, faTriangleExclamation, faCircleInfo} from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'plant-card',
    templateUrl: './plantCard.component.html',
    styleUrls: ['./plantCard.component.css'],
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
    //Icons
    addIcon = faAdd; 
    deleteIcon = faTrash; 
    editIcon = faPen; 
    waterIcon = faDroplet; 
    fertilizeIcon = faPlantWilt; 
    triangleExclamationIcon = faTriangleExclamation; 
    infoIcon = faCircleInfo; 

    constructor(private store: Store<fromStore.ProductsState>, private readonly plantService: PlantService, private readonly router: Router, 
        private readonly dateService: PlantDateService) {
        
        
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
        var formattedDate = this.dateService.getNewFormattedDate();
        var patchInfo = ObjectMapper.mapPatchObject("replace", actionName == 'water' ? '/dateWatered' : '/dateFertilized', formattedDate);
        var patchListObject = ObjectMapper.mapPatchListObject([patchInfo], null, this.plant.id?.toString(), localStorage.getItem('userId')?.toString())
        actionName == 'water' ? this.store.dispatch(new fromStore.WaterPlant(patchListObject)) : this.store.dispatch(new fromStore.FertilizePlant(patchListObject));  
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
