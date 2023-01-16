import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Plant } from 'src/app/shared/models/Plant';
import { PlantService } from 'src/app/shared/services/plants/PlantService';
import { StyleMethods } from '../../shared/services/utils/styleMethods';

@Component({
    selector: 'plant-card',
    templateUrl: './plantCard.component.html',
    styleUrls: [],
    providers: []
})
export class PlantCardComponent {
    styleMethods = StyleMethods;
    @Input() plant: Plant; 
    errorMessage: string = '';
    showError: boolean;
    userIdFromStorage: string | null; 
    userId: number | null; 
    constructor(private readonly plantService: PlantService) {
      

    }
    ngOnInit(){
        this.userIdFromStorage = localStorage.getItem('userId'); 
        if (this.userIdFromStorage != null) this.userId = parseInt(this.userIdFromStorage); 
    }

    waterFertilizePlantPatch(actionName: string){
        this.plantService.patchWaterPlant(this.userId, this.plant.id, actionName).subscribe({
            next: (res: any)=>{
                console.log(res); 
            }, 
            error: (err: HttpErrorResponse)=>{
                this.errorMessage = err.message; 
                this.showError = true; 
            }
        }); 
    }
}; 
