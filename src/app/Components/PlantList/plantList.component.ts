import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Plant } from '../../shared/models/Plant';
import { User } from '../../shared/models/User';
import { PlantService } from '../../shared/services/plants/PlantService';

import { PlantDateService } from '../../shared/services/dates/PlantDateService';


// Route information
import{ActivatedRoute, Router, ParamMap} from '@angular/router'; 
@Component({
  selector: 'plant-list',
  templateUrl: './plantList.component.html',
  styleUrls: ['./plantList.component.css'],
  providers: [PlantService]
})
export class PlantListComponent {
  plants: Plant[] = [];
  updatedPlantList: Plant[] = [];
  
  name: string = ''; 
  // Move this to a service...  
  constructor( private readonly plantService: PlantService, private readonly dateService: PlantDateService, private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.plantService.getPlantList(1).subscribe(plantList => {
      this.plants = plantList as Plant[]
      this.updatedPlantList = this.dateService.changePlantStateBasedOnDate(this.plants); 
    });
    
  }


}


