import { Component, Input } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    providers: []
})
export class NavigationComponent {
    /**
     *
     */
    plantId: string | null = ''
    isAuth: string | null = 'false'; 
    @Input() authenticated: boolean;
    constructor(private readonly route: ActivatedRoute, private readonly router: Router) {


    }
    ngOnInit() {
        this.plantId = this.route.snapshot.paramMap.get('plantId');
        this.isAuth = localStorage.getItem('isAuth');
        this.authenticated = (this.isAuth == "true");
    };
  
    logOut(){
        this.cleanTokens(); 
        this.router.navigate(['/login']).then(()=>window.location.reload());
        
    }
    // will go in a utils method
    cleanTokens(){
        localStorage.removeItem('token'); 
        localStorage.removeItem('refreshToken'); 
        localStorage.setItem('isAuth', "false"); 
    }
};