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
    plantId: string | null | undefined = ''
    constructor(private readonly route: ActivatedRoute, private router: Router) {
    }

    
    ngOnInit() {
        this.plantId = this.route.snapshot.paramMap.get('plantId'); 
    };

    navigateToFragment(fragment: string): void{
        console.log(this.route)
        this.router.navigateByUrl('/plantDetails/' + this.plantId + '#' + fragment); 
    }
}; 