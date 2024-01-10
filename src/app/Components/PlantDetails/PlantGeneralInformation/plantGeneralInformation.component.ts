import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import { PlantInfo } from 'src/app/shared/models/PlantInfo';
import { PlantLoad } from 'src/app/shared/models/PlantLoad';
import { PlantDateService } from 'src/app/shared/services/dates/PlantDateService';
import { GenusService } from 'src/app/shared/services/menus/MenusService';
import { ObjectMapper } from 'src/app/shared/services/utils/objectMapper';
import * as fromStore from '../../../shared/store';
import { faAdd, faTrash, faPen, faDroplet, faPlantWilt, faTriangleExclamation, faCircleInfo, faCircleArrowLeft, faSeedling } from '@fortawesome/free-solid-svg-icons'
import { PlantDelete } from 'src/app/shared/models/PlantDelete';
import { DeletePlant } from '../../../shared/store';
import { LocalStorageService } from 'src/app/shared/services/utils/LocalStorageService';
import { Subscription } from 'rxjs';
import { HOME_ROUTE } from 'src/app/shared/constants/routes';

@Component({
    selector: 'plant-general-information',
    templateUrl: './plantGeneralInformation.component.html',
    styleUrls: ['./plantGeneralInformation.component.css'],
    providers: []
})
export class PlantGeneralInformationComponent {
    /**
     *
     */
    @Input() plantId: string | null | undefined; 
    genusName: string | undefined; 
    plant$: Observable<any>;
    plant: PlantInfo;
    loaded$: Observable<boolean>;
    loading$: Observable<boolean>; 
    showError: boolean; 
    errMessage$: Observable<string>;
    userId$: Observable<string>;

    plantImage: string; 
    userIdFromStorage: string | null; 
    userId: string | undefined; 
    //Icons
    addIcon = faAdd;
    deleteIcon = faTrash;
    editIcon = faPen;
    waterIcon = faDroplet;
    fertilizeIcon = faSeedling;
    triangleExclamationIcon = faTriangleExclamation;
    infoIcon = faCircleInfo;
    returnIcon = faCircleArrowLeft;  
    plantSubscription: Subscription; 

    constructor(private readonly route: ActivatedRoute, 
        private readonly router: Router,
        private store: Store<fromStore.ProductsState>, 
        private localStorageService: LocalStorageService,
        private readonly dateService: PlantDateService) {
        

    }
    ngOnInit() {
        this.plantSubscription = new Subscription(); 
        //this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
        this.plant$ = this.store.select(fromStore.getPlant);
        this.loaded$ = this.store.select(fromStore.getPlantLoaded);
        this.loading$ = this.store.select(fromStore.getPlantLoading);
        this.errMessage$ = this.store.select(fromStore.getPlantNotesErrMessage);
        this.userId$ = this.store.select(fromStore.getUserId); 
        this.loadUserId(); 
        this.loadPlant(); 
        this.mapPlant(); 
    };

    ngOnDestroy(){
        if(this.plantSubscription){
            this.plantSubscription.unsubscribe(); 
        }
    }

    loadUserId(){
        var userIdSubscription = this.userId$.subscribe(userId =>{
            if(userId !=null){
                this.userId = userId
            }else{
                var retrievedUserId =  this.localStorageService.retrieveKey('userId'); 
                if(retrievedUserId != null){
                    this.userId = retrievedUserId 
                }
            }
        });
        
        this.plantSubscription.add(userIdSubscription); 
    }

    loadPlant(){
        var plantLoad: PlantLoad = {
            plantId: this.plantId,
            info: true,
            userId: this.userId
        };
        this.store.dispatch(new fromStore.LoadPlant(plantLoad));
    }

    mapPlant(){
        var plantSubscription = this.plant$.subscribe(plant => {
            this.plant = plant;
            this.plantImage = this.plant.image != null ? this.plant.image.base64 : '../../../../assets/generic_plant_image2.jpeg';
        });

        this.plantSubscription.add(plantSubscription); 
    }

    navigateToAddPlantPage() {
        this.store.dispatch(new fromStore.AddSamePlant(this.plant)); 
    }

    navigateToPlantEditPage(){
        this.store.dispatch(new fromStore.EditExistingPlant(this.plant))
    }

    navigateBackHome(){
        this.router.navigate([HOME_ROUTE]);
    }

    waterFertilizePlantPatch(actionName: string) {
        var formattedDate = this.dateService.getNewFormattedDate();
        var patchInfo = ObjectMapper.mapPatchObject("replace", actionName == 'water' ? '/dateWatered' : '/dateFertilized', formattedDate);
        var patchListObject = ObjectMapper.mapPatchListObject([patchInfo], null, this.plant.id?.toString(), localStorage.getItem('userId')?.toString())
        actionName == 'water' ? this.store.dispatch(new fromStore.WaterPlant(patchListObject)) : this.store.dispatch(new fromStore.FertilizePlant(patchListObject));
    }

    promptDeletePanel(){
        var plantToDelete: PlantDelete = {
           userId: this.userId, 
           plantId: this.plant.id,
           plantName: this.plant.name, 
       }; 

       this.store.dispatch(new fromStore.BeginDeletePlantProcess(plantToDelete)); 

    }

    reload() {
        window.location.reload()
    }

   
}; 