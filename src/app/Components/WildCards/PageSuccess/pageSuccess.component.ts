import {Component, Input} from '@angular/core'; 
import { Observable } from 'rxjs';

@Component({
    selector: 'page-success', 
    templateUrl: './pageSuccess.component.html', 
    styleUrls: [],
    providers: []
})

export class PageSuccessComponent{
    @Input() componentMessage: string; 
    ngOnInit(){
        
    }
    ngOnDestroy(){
        this.componentMessage = ''; 
    }
   
}