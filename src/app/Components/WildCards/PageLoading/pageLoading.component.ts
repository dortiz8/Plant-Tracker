import {Component} from '@angular/core'; 

@Component({
    selector: 'page-loading', 
    templateUrl: './pageLoading.component.html', 
    styleUrls: [],
    providers: []
})

export class PageLoadingComponent{
    componentMessage: string = '...Loading Plants'; 
}