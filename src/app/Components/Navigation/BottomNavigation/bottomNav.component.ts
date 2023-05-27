import { Component, Input } from "@angular/core";
import { faMagnifyingGlass, faHome, faAdd, faUser } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
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
 
    // Icons
    homeIcon = faHome
    addIcon = faAdd
    userIcon = faUser
    constructor(private store: Store<fromStore.UserState>) {


    }

    logOut() {
        this.store.dispatch(new fromStore.LogOffUser());
    }
}