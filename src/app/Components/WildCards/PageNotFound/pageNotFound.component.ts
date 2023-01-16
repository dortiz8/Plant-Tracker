import {Component} from '@angular/core'; 

@Component({
    selector: 'page-not-found', 
    templateUrl: './pageNotFound.component.html', 
    styleUrls: [],
    providers: []
})

export class PageNotFoundComponent{
    componentMessage: string = '404 Page Not Found'; 
}