import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { Location } from '@angular/common';
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Genus } from "src/app/shared/models/Genus";
import { Plant } from "src/app/shared/models/Plant";
import { GenusService } from "src/app/shared/services/menus/MenusService";
import { FormValidators } from "src/app/shared/services/utils/formValidators";
import * as fromStore from '../../shared/store';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { PlantCreation } from "src/app/shared/models/PlantCreation";
import { FileHandler } from "src/app/shared/services/utils/filesParser";
import { PlantImage } from "src/app/shared/models/PlantImage";
import { PlantInfo } from "src/app/shared/models/PlantInfo";
import { ADDING_SIMILAR_PLANT_MESSAGE, EDITING_PLANT_MESSAGE, NEW_PLANT_MESSAGE } from "src/app/shared/constants/plant";
import { EDIT_EXISTING_PLANT } from "../../shared/store";

@Component({
  selector: 'plant-form',
  templateUrl: './plantForm.component.html',
  styleUrls: ['./plantForm.component.css'],
  providers: []
})
export class PlantFormComponent { 

    plant: PlantInfo; 
    editForm: FormGroup; 
    dateFertilized: FormControl;
    dateWatered: FormControl; 
    genusList: Genus[];  
    showError: boolean;
    userId: string | undefined; 
    selectedImage: PlantImage; 

    loading$: Observable<boolean>; 
    loaded$: Observable<boolean>; 
    errMessage$: Observable<string>;
    errMessage: string; 
    addPlantSuccess$: Observable<boolean>;
    addSamePlant$: Observable<boolean>; 
    editExistingPlant$: Observable<boolean>; 
    plant$: Observable<any>; 
    addingMessage: string; 
    isAddSamePlant: boolean; 
    isEditExistingPlant: boolean; 

  editPlantSuccess$: Observable<boolean>;
  formSubscription: Subscription; 
  
  //Icons
  cameraIcon = faCamera; 
  
  constructor(private store: Store<fromStore.ProductsState>,
    private readonly route: ActivatedRoute,
    private readonly genusService: GenusService,
    private readonly router: Router,
    private readonly formValidator: FormValidators,
    private location: Location) {
    }
    
    ngOnInit(){
      this.formSubscription = new Subscription(); 
      this.addSamePlant$ = this.store.select(fromStore.getAddSamePlant); 
      this.editExistingPlant$ = this.store.select(fromStore.getEditExistingPlant); 
      this.editPlantSuccess$ = this.store.select(fromStore.getEditPlantSuccess);
      this.userId =  localStorage.getItem('userId')?.toString(); 
      this.loading$ = this.store.select(fromStore.getPlantLoading);
      this.loaded$ = this.store.select(fromStore.getPlantLoaded);
      this.errMessage$ = this.store.select(fromStore.getPlantErrMessage);
      this.addPlantSuccess$ = this.store.select(fromStore.getAddPlantSuccess); 
      this.plant$ = this.store.select(fromStore.getPlant); 
      this.mapPlant(); 
    }

    ngOnDestroy(){
      this.formSubscription.unsubscribe(); 
    }

    persistPlantData(persist: boolean){
      console.log(' calling cleanup')
      if (!persist) localStorage.removeItem('plantState')
      else localStorage.setItem('plantState', JSON.stringify(this.plant)); 
    }

    mapPlant(){
       var addSamePlantSubscription = this.addSamePlant$.subscribe(x =>{
          this.isAddSamePlant = x
       }); 
       var editExistingPlantSubscription = this.editExistingPlant$.subscribe(x => {
         this.isEditExistingPlant = x
       }); 
      console.log(this.isAddSamePlant, this.isEditExistingPlant, ' issame or edit')
      if (this.isAddSamePlant || this.isEditExistingPlant){
        this.plant$.subscribe(plant => {
          this.plant = plant;
          
          this.persistPlantData(true);
          this.addingMessage = this.isAddSamePlant ? ADDING_SIMILAR_PLANT_MESSAGE : EDITING_PLANT_MESSAGE;
        })
      }else{
        var localStorageSavedPlant = localStorage.getItem('plantState');

        if (localStorageSavedPlant != null) {
          this.plant = JSON.parse(localStorageSavedPlant)
        } else {
          this.plant = new PlantInfo();
        }
        this.addingMessage = NEW_PLANT_MESSAGE;
      }
      this.mapPlantEditFormGroup();
      this.getGenusMenu();

      this.formSubscription.add(addSamePlantSubscription); 
      this.formSubscription.add(editExistingPlantSubscription); 
    }

    mapPlantEditFormGroup() {
      this.editForm = new FormGroup({
        image: new FormControl(''), 
        name: new FormControl(this.plant.name, [Validators.required, Validators.minLength(2)]),
        genusId: new FormControl(this.plant.genusId, [Validators.required]),
        dateFertilized: new FormControl(this.plant.dateFertilized, [Validators.required]),
        dateWatered: new FormControl(this.plant.dateWatered, [Validators.required]),
        waterInterval: new FormControl(this.plant.waterInterval,
          [Validators.required, Validators.min(1)]),
        fertilizeInterval: new FormControl(this.plant.fertilizeInterval, [Validators.required, Validators.min(1)]),
        // Implement image mapping ***************************
      })
      this.editForm.controls['genusId'].setValue(this.plant.genusId, { onlySelf: true }); 
      this.selectedImage = this.plant.image; 
    }

    getGenusMenu() {
      var genusServiceSubscription = this.genusService.getGenusList().subscribe({
        next: (res: any) => {
          this.genusList = res;
        },
        error: (err: HttpErrorResponse) => {
          this.showError = true;
        }
      }); 
      this.formSubscription.add(genusServiceSubscription); 
    };

    validateControl = (controlName: string) => {
      return this.editForm?.get(controlName)?.invalid && this.editForm?.get(controlName)?.touched
    }

    hasError = (controlName: string, errorName: string) => {
      return this.editForm.get(controlName)?.hasError(errorName);
    }
    cancelEdit(){
      this.persistPlantData(false); 
      this.store.dispatch(new fromStore.ResetPlant());
      this.location.back(); 
    }
    clearForm(){
      localStorage.removeItem('plantState'); 
      this.store.dispatch(new fromStore.ResetPlant());
      window.location.reload(); 
    }
    submitEdit(editFormValue: any) {
      this.isEditExistingPlant = false;
      
      var editExistingPlantSubscription = this.editExistingPlant$.subscribe(x => {
        this.isEditExistingPlant = x
      }); 
     
      if(!this.isEditExistingPlant){
        var image: PlantImage = {...this.selectedImage, id: undefined}; 
        var plant: PlantCreation = { ...editFormValue, userId: this.userId, id: undefined, image: image}; 
        console.log(plant, " is new");
        this.store.dispatch(new fromStore.AddPlant(plant));
      }
      else{
        var plant: PlantCreation = { ...editFormValue, userId: this.userId, id: this.plant.id, image: this.selectedImage }
        console.log(plant, " is edit");
        this.store.dispatch(new fromStore.EditPlant(plant));
      }

      this.formSubscription.add(editExistingPlantSubscription); 
    }

  handleFileChange(event: any){
    var targetFile = event.target.files[0]; 
    var fileObj = FileHandler.setFileSelection(targetFile, this.plant.userId, this.plant.id); 
    
    fileObj.then((res)=>{
      this.selectedImage = res; 
    }); 
    fileObj.catch((err)=>{
      // Implement
      console.log(err)
    })
  }

  
}
