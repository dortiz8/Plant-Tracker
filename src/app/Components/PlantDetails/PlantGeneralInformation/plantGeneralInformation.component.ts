import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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
    private sub: any; 
    constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
        

    }
    ngOnInit() {
        this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
    };
}; 