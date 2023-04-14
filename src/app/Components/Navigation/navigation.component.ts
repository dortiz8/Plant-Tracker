import { Component, Input } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../../shared/store';
import { IS_AUTH } from 'src/app/shared/constants/auth';
import { AuthenticationService } from 'src/app/shared/services/authentication/AuthenticationService';
import { LocalStorageService } from 'src/app/shared/services/authentication/LocalStorageService';
import { Observable } from 'rxjs';
import { faLeaf, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    providers: []
})
export class NavigationComponent {
    
    userLoaded$: Observable<boolean>; 
    @Input() userAuthenticated: boolean; 
    @Input() mainTitle: string; 
    //Icons
    leafIcon = faLeaf;
    searchIcon = faMagnifyingGlass;  
    constructor(private readonly route: ActivatedRoute, private readonly router: Router, 
        private localStorageService: LocalStorageService, private store: Store<fromStore.UserState>) {


    }
    ngOnInit() {
        this.userLoaded$ = this.store.select(fromStore.getUserLoaded); 
    };
  
    logOut(){
        this.store.dispatch(new fromStore.LogOffUser()); 
    }

    search(){
        console.log('searched for: ')
    }
};