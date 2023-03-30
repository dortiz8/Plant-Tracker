import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
    selector: 'plant-details',
    templateUrl: './plantDetails.component.html',
    styleUrls: ['./plantDetails.component.css'],
    providers: []
})
export class PlantDetailsComponent {
    /**
     *
     */
    plantId: string | null = ''
    constructor(private readonly route: ActivatedRoute) {
    }

    
    ngOnInit() {
        this.plantId = this.route.snapshot.paramMap.get('plantId'); 
    };
}; 