import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import { PlantInfo } from 'src/app/shared/models/PlantInfo';
import { PlantLoad } from 'src/app/shared/models/PlantLoad';
import { PlantDateService } from 'src/app/shared/services/dates/PlantDateService';
import { GenusService } from 'src/app/shared/services/menus/MenusService';
import { ObjectMapper } from 'src/app/shared/services/utils/objectMapper';
import * as fromStore from '../../../shared/store';
import { faAdd, faTrash, faPen, faDroplet, faPlantWilt, faTriangleExclamation, faCircleInfo, faCircleArrowLeft, faSeedling } from '@fortawesome/free-solid-svg-icons'

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
    // plantId: string | null | undefined; 
    genusName: string | undefined; 
    private sub: any; 
    plant$: Observable<any>;
    plant: PlantInfo;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    loadingFailed$: Observable<boolean>; 
    showError: boolean; 

    //Icons
    addIcon = faAdd;
    deleteIcon = faTrash;
    editIcon = faPen;
    waterIcon = faDroplet;
    fertilizeIcon = faSeedling;
    triangleExclamationIcon = faTriangleExclamation;
    infoIcon = faCircleInfo;
    returnIcon = faCircleArrowLeft;  

    constructor(private readonly route: ActivatedRoute, 
        private readonly router: Router,
        private store: Store<fromStore.ProductsState>, 
        private genusService: GenusService, 
        private readonly dateService: PlantDateService) {
        

    }
    ngOnInit() {
        //this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
        this.plant$ = this.store.select(fromStore.getPlant);
        this.loading$ = this.store.select(fromStore.getPlantLoading);
        this.loaded$ = this.store.select(fromStore.getPlantLoaded);
        this.loadingFailed$ = this.store.select(fromStore.getPlantLoaded);
        var plantLoad: PlantLoad = {
            plantId: this.plantId,
            info: true,
            userId: localStorage.getItem('userId')?.toString()
        }; 
        this.store.dispatch(new fromStore.LoadPlant(plantLoad));
        this.plant$.subscribe(plant => {
            this.plant = plant; 
            console.log(this.plant)
        }); 
    };

    navigateToAddPlantPage() {
        this.store.dispatch(new fromStore.AddSamePlant(this.plant))
    }
    navigateBackHome(){
        this.router.navigate(['/home']);
    }

    waterFertilizePlantPatch(actionName: string) {
        var formattedDate = this.dateService.getNewFormattedDate();
        var patchInfo = ObjectMapper.mapPatchObject("replace", actionName == 'water' ? '/dateWatered' : '/dateFertilized', formattedDate);
        var patchListObject = ObjectMapper.mapPatchListObject([patchInfo], null, this.plant.id?.toString(), localStorage.getItem('userId')?.toString())
        actionName == 'water' ? this.store.dispatch(new fromStore.WaterPlant(patchListObject)) : this.store.dispatch(new fromStore.FertilizePlant(patchListObject));
    }
}; 