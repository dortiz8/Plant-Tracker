import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Plant } from "src/app/shared/models/Plant";

@Component({
    selector: 'plant-stats',
    templateUrl: './plantStats.component.html',
    styleUrls: ['./plantStats.component.css'],
    providers: []
})
export class PlantStatsComponent {
    userId$: Observable<string>;
    plants$: Observable<Plant[]>;
    loading$: Observable<boolean>;
    loadingFailed$: Observable<boolean>;
    errMessage$: Observable<string>;

    name: string = '';
    today: String = new Date().toDateString(); 
 }