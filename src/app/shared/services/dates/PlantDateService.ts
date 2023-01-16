
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

  public getNewFormattedDate(): string{
    // Create a date object from a date string
    var date = new Date();

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate; 
  }
 
}
