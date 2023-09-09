import {Component, Input} from '@angular/core'; 

import { Observable } from 'rxjs';

@Component({
    selector: 'page-failed', 
    templateUrl: './pageFailed.component.html', 
    styleUrls: ['./pageFailed.component.css'],
    providers: []
})

export class PageFailedComponent{
    @Input() componentMessage: Observable<string>; 
    message: string; 



    ngOnInit(){
        this.componentMessage.subscribe((str)=> this.message = str); 
    }
}