
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

  dayDiff: number | undefined; 
  dayDiff2: number | undefined; 
  waterInterval: number; 
  fertilizeInterval: number; 
  private getDayDiff(startDate: any, endDate: any) {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(endDate - startDate) / msInDay);
  }

  public changePlantStateBasedOnDate(plantList: Plant[]): any{
    if (plantList.length) {
      plantList.map((plant) => {
        this.changeSinglePlantStateBasedOnDate(plant); 
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

  public changeSinglePlantStateBasedOnDate(plant: Plant): any{
    if (plant.dateWatered !== undefined && plant.dateFertilized !== undefined) {
      this.dayDiff = this.getDayDiff(new Date(plant.dateWatered).getTime(), new Date().getTime());
      this.dayDiff2 = this.getDayDiff(new Date(plant.dateFertilized).getTime(), new Date().getTime());
      // default days to 7 if no interval exists
      this.waterInterval = plant.waterInterval != null ? plant.waterInterval : 7;
      this.fertilizeInterval = plant.fertilizeInterval != null ? plant.fertilizeInterval : 7;

      //console.log( ' interval ' + this.fertilizeInterval)
      // Switch for water intervals
      if (this.dayDiff > 0) {
        switch (true) {
          case (this.dayDiff <= (this.waterInterval - 1)):
            plant.waterState = WaterState.good;
            break;
          case (this.dayDiff == this.waterInterval):
            plant.waterState = WaterState.warning;
            break;
          case (this.dayDiff > this.waterInterval):
            plant.waterState = WaterState.danger;
            break;
          default:
        }
      }
      if (this.dayDiff2 > 0) {
        switch (true) {
          case (this.dayDiff2 <= (this.fertilizeInterval - 1)):
            plant.fertilizeState = WaterState.good;
            break;
          case (this.dayDiff2 == this.fertilizeInterval):
            plant.fertilizeState = WaterState.warning;
            break;
          case (this.dayDiff2 > this.fertilizeInterval):
            plant.fertilizeState = WaterState.danger;
            break;
          default:
        }
      }

      //console.log(plant.waterState + " -- water state \n" + plant.fertilizeState + " -- fertilize state")
    }
  }

  public changeSinglePlantStateBasedOnDateAndReturn(plant: Plant): any {
    if (plant.dateWatered !== undefined && plant.dateFertilized !== undefined) {
      this.dayDiff = this.getDayDiff(new Date(plant.dateWatered).getTime(), new Date().getTime());
      this.dayDiff2 = this.getDayDiff(new Date(plant.dateFertilized).getTime(), new Date().getTime());
      // default days to 7 if no interval exists
      this.waterInterval = plant.waterInterval != null ? plant.waterInterval : 7;
      this.fertilizeInterval = plant.fertilizeInterval != null ? plant.fertilizeInterval : 7;

      //console.log( ' interval ' + this.fertilizeInterval)
      // Switch for water intervals
      if (this.dayDiff > 0) {
        switch (true) {
          case (this.dayDiff <= (this.waterInterval - 1)):
            plant.waterState = WaterState.good;
            break;
          case (this.dayDiff == this.waterInterval):
            plant.waterState = WaterState.warning;
            break;
          case (this.dayDiff > this.waterInterval):
            plant.waterState = WaterState.danger;
            break;
          default:
        }
      }
      if (this.dayDiff2 > 0) {
        switch (true) {
          case (this.dayDiff2 <= (this.fertilizeInterval - 1)):
            plant.fertilizeState = WaterState.good;
            break;
          case (this.dayDiff2 == this.fertilizeInterval):
            plant.fertilizeState = WaterState.warning;
            break;
          case (this.dayDiff2 > this.fertilizeInterval):
            plant.fertilizeState = WaterState.danger;
            break;
          default:
        }
      }
      return plant; 
      //console.log(plant.waterState + " -- water state \n" + plant.fertilizeState + " -- fertilize state")
    }
  }
 
}
