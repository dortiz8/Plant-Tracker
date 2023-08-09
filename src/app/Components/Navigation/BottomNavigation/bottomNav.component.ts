import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { faMagnifyingGlass, faHome, faAdd, faUser } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { HOME_ROUTE } from "src/app/shared/constants/routes";
import * as fromStore from '../../../shared/store';

@Component({
    selector: 'bottom-nav',
    templateUrl: './bottomNav.component.html',
    styleUrls: ['./bottomNav.component.css'],
    providers: []
})

export class BottomNavigationComponent {
    userLoaded$: Observable<boolean>;
    @Input() userAuthenticated: boolean;
    homeRoute: string; 
 
    // Icons
    homeIcon = faHome
    addIcon = faAdd
    userIcon = faUser
    constructor(private store: Store<fromStore.UserState>, private router: Router) {


    }

    ngOnInit(){
        this.homeRoute = HOME_ROUTE; 
    }

    logOut() {
        this.store.dispatch(new fromStore.LogOffUser());
    }

    addPlant(){
        this.store.dispatch(new fromStore.ResetPlant());
        this.router.navigateByUrl('/addPlant');
    }
}