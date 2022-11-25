
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../models/Plant';
import WaterState from '../../../shared/enums/plantStates';

@Injectable({
  providedIn: 'root',
})
export class PlantDateService {
  constructor() {
    
  }
  private getDayDiff(startDate: any, endDate: any) {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(endDate - startDate) / msInDay);
  }

  changePlantStateBasedOnDate(plantList: Plant[]): any{
    if (plantList.length) {
      plantList.map((plant) => {
        if (plant.dateWatered !== undefined) {
          const dayDiff = this.getDayDiff(new Date(plant.dateWatered).getTime(), new Date().getTime());

          if (dayDiff > 0) {
            switch (true) {
              case (dayDiff <= 5):
                plant.waterState = WaterState.good;
                break;
              case (dayDiff == 6):
                plant.waterState = WaterState.warning;
                break;
              case (dayDiff > 6):
                plant.waterState = WaterState.danger;
                break;
              default:
            }

          }
        }
      });

      return plantList; 
    }
  }
 
}
