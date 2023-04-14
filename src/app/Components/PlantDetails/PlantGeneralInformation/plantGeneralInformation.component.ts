import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import { PlantInfo } from 'src/app/shared/models/PlantInfo';
import { PlantLoad } from 'src/app/shared/models/PlantLoad';
import { GenusService } from 'src/app/shared/services/menus/MenusService';
import * as fromStore from '../../../shared/store';

@Component({
    selector: 'plant-general-information',
    templateUrl: './plantGeneralInformation.component.html',
    styleUrls: [],
    providers: []
})
export class PlantGeneralInformationComponent {
    /**
     *
     */
    plantId: string | null | undefined; 
    genusName: string | undefined; 
    private sub: any; 
    plant$: Observable<any>;
    plant: PlantInfo;
    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;
    loadingFailed$: Observable<boolean>; 
    showError: boolean; 
    constructor(private readonly route: ActivatedRoute, 
        private readonly router: Router,
        private store: Store<fromStore.ProductsState>, 
        private genusService: GenusService) {
        

    }
    ngOnInit() {
        this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
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
        }); 
        
    };
}; 