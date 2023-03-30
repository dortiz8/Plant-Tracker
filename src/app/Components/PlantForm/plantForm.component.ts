import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Genus } from "src/app/shared/models/Genus";
import { Plant } from "src/app/shared/models/Plant";
import { GenusService } from "src/app/shared/services/menus/MenusService";
import { FormValidators } from "src/app/shared/services/utils/formValidators";
import * as fromStore from '../../shared/store';

@Component({
  selector: 'plant-form',
  templateUrl: './plantForm.component.html',
  styleUrls: ['./plantForm.component.css'],
  providers: []
})
export class PlantFormComponent { 

    plant: Plant; 
    editForm: FormGroup; 
    dateFertilized: FormControl;
    dateWatered: FormControl; 
    genusList: Genus[];  
    showError: boolean;
    userId: string | undefined; 

    loading$: Observable<boolean>;
    loaded$: Observable<boolean>; 
    errMessage$: Observable<string>;
    errMessage: string; 
    addPlantSuccess$: Observable<boolean>;
    addSamePlant$: Observable<boolean>; 
    plant$: Observable<Plant>; 

    constructor(private store: Store<fromStore.ProductsState>,
      private readonly route: ActivatedRoute,
      private readonly genusService: GenusService,
      private readonly router: Router,
      private readonly formValidator: FormValidators) {

    }
    
    ngOnInit(){
      this.addSamePlant$ = this.store.select(fromStore.getAddSamePlant); 
      this.userId =  localStorage.getItem('userId')?.toString(); 
      this.loading$ = this.store.select(fromStore.getPlantLoading);
      this.loaded$ = this.store.select(fromStore.getPlantLoaded);
      this.errMessage$ = this.store.select(fromStore.getPlantErrMessage);
      this.addPlantSuccess$ = this.store.select(fromStore.getAddPlantSuccess); 
      this.plant$ = this.store.select(fromStore.getPlant); 
      this.mapPlant(); 
    }

    persistPlantData(persist: boolean){
      if (!persist) localStorage.removeItem('plantState')
      else localStorage.setItem('plantState', JSON.stringify(this.plant)); 
    }

    mapPlant(){
      var samePlantAction = this.addSamePlant$.subscribe({ 
        next:(res: boolean)=>{
          if(res){
            this.plant$.subscribe(plant => {
              this.plant = plant;
              this.persistPlantData(true);
            })
          }else{
            var localStorageSavedPlant = localStorage.getItem('plantState');

            if (localStorageSavedPlant != null) {
              this.plant = JSON.parse(localStorageSavedPlant)
            }else{
              this.plant = new Plant(); 
            }
          }
          this.mapPlantEditFormGroup();
          this.getGenusMenu();
        },
        error:(err: HttpErrorResponse)=>{
          this.showError = true; 
        }
      }); 
    }

    mapPlantEditFormGroup() {
      this.editForm = new FormGroup({
        name: new FormControl(this.plant.name, [Validators.required, Validators.minLength(2)]),
        genusId: new FormControl(this.plant.genusId, [Validators.required]),
        dateFertilized: new FormControl(this.plant.dateFertilized, [Validators.required]),
        dateWatered: new FormControl(this.plant.dateWatered, [Validators.required]),
        waterInterval: new FormControl(this.plant.waterInterval,
          [Validators.required, Validators.min(1)]),
        fertilizeInterval: new FormControl(this.plant.fertilizeInterval, [Validators.required, Validators.min(1)])
      })
      this.editForm.controls['genusId'].setValue(this.plant.genusId, { onlySelf: true }); 
    }

    getGenusMenu() {
      this.genusService.getGenusList().subscribe({
        next: (res: any) => {
          this.genusList = res;
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
        }
      })
    };

    validateControl = (controlName: string) => {
      return this.editForm?.get(controlName)?.invalid && this.editForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) => {
      return this.editForm.get(controlName)?.hasError(errorName);
    }
    cancelEdit(){
      this.showError = false; 
      this.store.dispatch(new fromStore.ResetPlant());
      this.persistPlantData(false); 
      this.router.navigate(['/home']); 
    }
    clearForm(){
      localStorage.removeItem('plantState'); 
      this.store.dispatch(new fromStore.ResetPlant());
      window.location.reload(); 
      
    }
    submitEdit(editFormValue: any) {
      var plant: Plant = { ...editFormValue, userId: this.userId }
      this.store.dispatch(new fromStore.AddPlant(plant));
    }
}
