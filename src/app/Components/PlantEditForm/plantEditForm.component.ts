import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { from, Observable } from "rxjs";
import { Plant } from "src/app/shared/models/Plant";
import { PlantService } from "src/app/shared/services/plants/PlantService";
import { Store, createAction } from '@ngrx/store';
import * as fromStore from '../../shared/store';
import { ThisReceiver } from "@angular/compiler";
import { GenusService } from "src/app/shared/services/menus/MenusService";
import { Genus } from "src/app/shared/models/Genus";
import { FormValidators } from "src/app/shared/services/utils/formValidators"; 
import { PlantLoad } from "src/app/shared/models/PlantLoad";
import { PlantCreation } from "src/app/shared/models/PlantCreation";
import { Subscription } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/authentication/LocalStorageService";
import { HOME_ROUTE } from "src/app/shared/constants/routes";

@Component({
    selector: 'plant-editForm',
    templateUrl: './plantEditForm.component.html',
    styleUrls: [],
    providers: []
})
export class PlantEditFormComponent { 
    plant$: Observable<Plant>;
    genusList: Genus[];  
    plant: Plant; 
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>; 
    loadingFailed$: Observable<boolean>;
    errMessage$: Observable<string>;
    editPlantSuccess$: Observable<boolean>;
    loadUserId$: Observable<string>; 

    showError: boolean;
    userIdFromStorage: string | null;
    userId: string;
    editForm: FormGroup; 
    dateFertilized: FormControl;
    dateWatered: FormControl; 
    
    localStorageId: string | null; 
    plantId: string | null; 
    genusOptions: string []=  ['option1', 'option2', 'option3']

    plantSubscription: Subscription;
    userIdSubscription: Subscription; 
    /**
     *
     */
    constructor(private store: Store<fromStore.ProductsState>, 
        private readonly route: ActivatedRoute, 
        private readonly genusService: GenusService, 
        private readonly router: Router, 
        private localStorageService: LocalStorageService,) {
        
    }
    ngOnInit() {
        this.loadUserId$ = this.store.select(fromStore.getUserId); 
        this.plantId = this.route.snapshot.paramMap.get('plantId');
        this.loading$ = this.store.select(fromStore.getPlantLoading);
        this.loaded$ = this.store.select(fromStore.getPlantLoaded); 
        this.plant$ = this.store.select(fromStore.getPlant);
        this.loadingFailed$ = this.store.select(fromStore.getPlantLoaded);
        this.errMessage$ = this.store.select(fromStore.getPlantErrMessage);
        this.editPlantSuccess$ = this.store.select(fromStore.getEditPlantSuccess); 

        
       //We are going to load all plants by dispatching an action 
       this.loadUserId(); 
        this.loadPlant(); 
        this.mapPlant(); 
        this.getGenusMenu(); 

        
    };

    ngOnDestroy(){
        this.plantSubscription.unsubscribe(); 
        this.userIdSubscription.unsubscribe(); 
    }


    loadUserId() {
        this.userIdSubscription = this.loadUserId$.subscribe(userId => {
            if (userId != null) {
                this.userId = userId
            } else {
                var retrievedUserId = this.localStorageService.retrieveKey('userId');
                if (retrievedUserId != null) {
                    this.userId = retrievedUserId
                }
            }
        });
    }

    cancelEdit(){
        this.store.dispatch(new fromStore.ResetPlant()); 
        this.router.navigate([HOME_ROUTE]); 
    }

    loadPlant(){
        var plantLoad: PlantLoad = {
            plantId: this.plantId,
            info: false,
            userId: this.userId
        }

        this.store.dispatch(new fromStore.LoadPlant(plantLoad));
    }

    mapPlant(){
        this.plantSubscription = this.plant$.subscribe({
            next: (res: any) => {
                this.plant = res;
                this.mapPlantEditFormGroup();
            },
            error: (err: HttpErrorResponse) => {
                this.showError = true;
            }
        })
    }

    mapPlantEditFormGroup(){
        this.editForm = new FormGroup({
            name: new FormControl(this.plant.name, [Validators.required, Validators.minLength(2)]),
            genusId: new FormControl(this.plant.genusId, [Validators.required]),
            dateFertilized: new FormControl(this.plant.dateFertilized, [Validators.required]),
            dateWatered: new FormControl(this.plant.dateWatered, [Validators.required]),
            waterInterval: new FormControl(this.plant.waterInterval, 
                [Validators.required, Validators.min(1)]),
            fertilizeInterval: new FormControl(this.plant.fertilizeInterval, [Validators.required, Validators.min(1)])
            
        })
        this.editForm.controls['genusId'].setValue(this.plant.genusId, {onlySelf: true})
    }
    
    getGenusMenu() {
      this.genusService.getGenusList().subscribe({
            next: (res: any) => {
                this.genusList = res; 
            },
            error: (err: HttpErrorResponse) => {
                console.log(err)
                this.showError = true; 
            }
        })
    };

    validateSubmit(editFormValue: any){
        
    }
    submitEdit(editFormValue: any){
        var plant: PlantCreation = {...editFormValue, userId: this.plant.userId, id: this.plantId}
        this.store.dispatch(new fromStore.EditPlant(plant)); 
    }
    validateControl = (controlName: string) => {
        return this.editForm?.get(controlName)?.invalid && this.editForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) => {
        // console.log(this.editForm.get(controlName))
        return this.editForm.get(controlName)?.hasError(errorName);
    }
 
}
