import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
    selector: 'plant-schedule',
    templateUrl: './plantSchedule.component.html',
    styleUrls: [],
    providers: []
})
export class PlantScheduleComponent {
    /**
     *
     */
    plantId: string | null | undefined;
    constructor(private readonly route: ActivatedRoute) {
        

    }
    ngOnInit() {
        this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
    };
}; 