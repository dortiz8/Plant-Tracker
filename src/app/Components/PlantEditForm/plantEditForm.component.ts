import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Plant } from "src/app/shared/models/Plant";
import { PlantService } from "src/app/shared/services/plants/PlantService";
import { Store, createAction } from '@ngrx/store';
import * as fromStore from '../../shared/store';
import { ThisReceiver } from "@angular/compiler";

@Component({
    selector: 'plant-editForm',
    templateUrl: './plantEditForm.component.html',
    styleUrls: [],
    providers: []
})
export class PlantEditFormComponent { 
    plant$: Observable<Plant>;
    plant: Plant; 
    loading$: Observable<boolean>;
    loadingFailed$: Observable<boolean>;
    errMessage$: Observable<string>;

    showError: boolean;
    userIdFromStorage: string | null;
    userId: string;
    editForm: FormGroup; 
    fertilizedDate: FormControl;
    wateredDate: FormControl; 
    
    localStorageId: string | null; 
    plantId: string | null; 
    genusOptions: string []=  ['option1', 'option2', 'option3']
    /**
     *
     */
    constructor(private store: Store<fromStore.ProductsState>, private readonly route: ActivatedRoute, private readonly plantService: PlantService, private readonly router: Router) {
        
    }
    ngOnInit() {
        this.plantId = this.route.snapshot.paramMap.get('plantId');
        this.plant$ = this.store.select(fromStore.getPlant);
        this.loading$ = this.store.select(fromStore.getPlantLoading);
        this.loadingFailed$ = this.store.select(fromStore.getPlantLoaded);
        this.errMessage$ = this.store.select(fromStore.getPlantErrMessage);
       //We are going to load all plants by dispatching an action 
        this.plant$.subscribe({
            next: (res: any) =>{
                this.plant = res; 
                console.log(res, ' from plant form'); 
                this.mapPlantEditFormGroup(); 
            }, 
            error: (err: HttpErrorResponse)=>{
                console.log(err)
                this.showError = true; 
            } 
        })
        this.store.dispatch(new fromStore.LoadPlant(this.plantId));
        
        
        
    };

    cancelEdit(){
        this.router.navigate(['/home']); 
    }

    mapPlantEditFormGroup(){
        this.editForm = new FormGroup({
            name: new FormControl(this.plant.name, [Validators.required]),
            genus: new FormControl(this.plant.genus?.id, [Validators.required]),
            fertilizedDate: new FormControl(this.plant.dateFertilized, [Validators.required]),
            wateredDate: new FormControl(this.plant.dateWatered, [Validators.required]),
            fertilizedInterval: new FormControl(this.plant.fertilizeInterval, [Validators.required]),
            wateredInterval: new FormControl(this.plant.waterInterval, [Validators.required])
            
        })
        this.editForm.controls['genus'].setValue(this.plant.genus?.id, {onlySelf: true})
        
    }
    submitEdit(editFormValue: any){
        //console.log(editFormValue)
    }
    validateControl = (controlName: string) => {
        return this.editForm?.get(controlName)?.invalid && this.editForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) => {
        return this.editForm.get(controlName)?.hasError(errorName);
    }
 
}
