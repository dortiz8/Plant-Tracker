import {Component, EventEmitter, Input, Output} from '@angular/core'; 
import { Observable } from 'rxjs';

@Component({
    selector: 'page-delete-prompt', 
    templateUrl: './pageDeletePrompt.component.html', 
    styleUrls: ['./pageDeletePrompt.component.css'],
    providers: []
})

export class PageDeletePromptComponent{
    
    @Input() plantName: string | null | undefined;
    @Output("yesFunction") yesFunction: EventEmitter<any> = new EventEmitter();
    @Output("noFunction") noFunction: EventEmitter<any> = new EventEmitter();
    componentMessage: string;  

    ngOnInit(){
        this.componentMessage = `Are you sure you want to delete plant `; 
    }

    emitNoFunction(){
        this.noFunction.emit(); 
    }
    emitYesFunction(){
        this.yesFunction.emit(); 
    }
   
}