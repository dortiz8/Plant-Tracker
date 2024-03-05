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
import { ADDING_SIMILAR_PLANT_MESSAGE, EDITING_PLANT_MESSAGE, NEW_PLANT_MESSAGE, PLANT_STATE } from "src/app/shared/constants/plant";
import { EDIT_EXISTING_PLANT } from "../../shared/store";
import { GENERIC_ERROR_MESSAGE } from "src/app/shared/constants/common";

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
    selectedFile: any; 
    selectedImage: PlantImage | undefined; 
    plantImage: string | undefined; 

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
      this.setObservables(); 
      this.determinePlantAction();
      this.setHeaderMessage(); 
      this.stagePlant(); 
    }

    setObservables(){
      this.addSamePlant$ = this.store.select(fromStore.getAddSamePlant);
      this.editExistingPlant$ = this.store.select(fromStore.getEditExistingPlant);
      this.editPlantSuccess$ = this.store.select(fromStore.getEditPlantSuccess);
      this.userId = localStorage.getItem('userId')?.toString();
      this.loading$ = this.store.select(fromStore.getPlantLoading);
      this.loaded$ = this.store.select(fromStore.getPlantLoaded);
      this.errMessage$ = this.store.select(fromStore.getPlantErrMessage);
      this.addPlantSuccess$ = this.store.select(fromStore.getAddPlantSuccess);
      this.plant$ = this.store.select(fromStore.getPlant); 
    }

    ngOnDestroy(){
      this.persistPlantData(false); 
     // this.showError = false;
      this.formSubscription.unsubscribe(); 
    }

    persistPlantData(persist: boolean, plant: PlantInfo | null = null){
      if (!persist){
        localStorage.removeItem(PLANT_STATE)
        localStorage.removeItem('isEditing'); 
      }
      else localStorage.setItem(PLANT_STATE, JSON.stringify(plant)); 
    }

    stagePlant(){
      if (this.isAddSamePlant || this.isEditExistingPlant) {
        if (this.isEditExistingPlant && localStorage.getItem(PLANT_STATE) != null){
          this.getPlantFromLocalStorage(true); 
        }else{
          this.setPlant(); 
        }
      }else{
        this.getPlantFromLocalStorage(); 
      }

      this.mapPlant(); 
    }

    determinePlantAction(){
      var addSamePlantSubscription = this.addSamePlant$.subscribe(x => {
        this.isAddSamePlant = x
      });

      var editExistingPlantSubscription 

      var isEdit = localStorage.getItem('isEditing');
      if(isEdit != null){
        this.isEditExistingPlant =  isEdit == 'true' ? true : false; 
      }else {
        editExistingPlantSubscription = this.editExistingPlant$.subscribe(x => {
          this.isEditExistingPlant = x
          localStorage.setItem('isEditing', this.isEditExistingPlant.toString());
        });
      }
   
      this.formSubscription.add(addSamePlantSubscription);
      this.formSubscription.add(editExistingPlantSubscription); 
    }

    setHeaderMessage(){
      if (this.isAddSamePlant || this.isEditExistingPlant) {
        this.addingMessage = this.isAddSamePlant ? ADDING_SIMILAR_PLANT_MESSAGE : EDITING_PLANT_MESSAGE;
        return; 
      } 
      this.addingMessage = NEW_PLANT_MESSAGE;
    }

    mapPlant(){
      this.mapPlantEditFormGroup();
      this.getGenusMenu();
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
      this.plantImage = this.plant?.image?.url
    }

    getGenusMenu() {
      var genusServiceSubscription = this.genusService.getGenusList().subscribe({
        next: (res: any) => {
          this.genusList = res;
        },
        error: (err: HttpErrorResponse) => {
          this.showGenericError(GENERIC_ERROR_MESSAGE)
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
      localStorage.removeItem(PLANT_STATE); 
      this.store.dispatch(new fromStore.ResetPlant());
      window.location.reload(); 
    }
    submitEdit(editFormValue: any) {
      this.isEditExistingPlant = false;
      
      var editExistingPlantSubscription = this.editExistingPlant$.subscribe({
        next: (x)=>{
          this.isEditExistingPlant = x
        }, 
        error: (err: HttpErrorResponse)=>{
          this.showGenericError(GENERIC_ERROR_MESSAGE);
        }
      })
      if(!this.isEditExistingPlant){
        //var image: PlantImage = {...this.selectedImage, id: undefined}; 
        var plant: PlantCreation = { ...editFormValue, userId: this.userId, id: undefined, image: this.selectedFile != null ? this.selectedFile : this.plant.image}; 
       
        this.store.dispatch(new fromStore.AddPlant(plant));
      }
      else{
        var plant: PlantCreation = { ...editFormValue, userId: this.userId, id: this.plant.id, image: this.selectedFile != null ? this.selectedFile : this.plant.image }
        this.store.dispatch(new fromStore.EditPlant(plant));
      }

      this.formSubscription.add(editExistingPlantSubscription); 
    }

  handleFileChange(event: any){
    var targetFile = event.target.files[0]; 
    var fileObj = FileHandler.setFileSelection(targetFile, this.plant.userId, this.plant.id); 
    
    fileObj.then((res)=>{
      this.selectedImage = res; 
      this.plantImage = this.selectedImage.base64
    }); 
    fileObj.catch((err)=>{
      // Implement
      this.showGenericError(GENERIC_ERROR_MESSAGE)
    })
  }

  setFileChange(event: any){
    this.selectedFile = event.target.files[0];
    var fileObj = FileHandler.setFileSelection(this.selectedFile, this.plant.userId, this.plant.id); 
    
    fileObj.then((res) => {
      this.selectedImage = res; 
      this.plantImage = this.selectedImage.base64
    });
    fileObj.catch((err) => {
      // Implement
      this.showGenericError(GENERIC_ERROR_MESSAGE)
    })
    //var targetFile = event.target.files[0]; 
    //
    //const formData: FormData = new FormData(); 
    //formData.append(targetFile.name, targetFile)
    //
    //this.selectedFile = formData; 
  }

  setPlant(){
    var setPlantSubscription = this.plant$.subscribe({
      next: (plant)=>{
        this.plant = plant;
      }, 
      error: (err: HttpErrorResponse)=>{
        this.showGenericError(GENERIC_ERROR_MESSAGE)
      }
    }); 
    
   
    if(this.plant != null) this.persistPlantData(true, this.plant);
    
    this.formSubscription.add(setPlantSubscription);
  }

  getPlantFromLocalStorage(isEditing: boolean = false){
    
    var localStorageSavedPlant = localStorage.getItem(PLANT_STATE);

    if (localStorageSavedPlant != null) {
      this.plant = JSON.parse(localStorageSavedPlant)
      return; 
    }

    this.plant = new PlantInfo();
  }

  showGenericError(errorMessage: string){
    this.errMessage = errorMessage
    this.showError = true;
  }

  
}
