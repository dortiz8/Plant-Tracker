import { Component, Input } from "@angular/core";
import { faLeaf, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";

@Component({
    selector: 'top-nav',
    templateUrl: './topNav.component.html',
    styleUrls: ['./topNav.component.css'],
    providers: []
})

export class TopNavigationComponent{
    userLoaded$: Observable<boolean>;
    @Input() userAuthenticated: boolean;
    @Input() mainTitle: string;
    searchIcon = faMagnifyingGlass;
    leafIcon = faLeaf;
    constructor() {
        

    }

    search() {
        console.log('searched for: ')
    }
}