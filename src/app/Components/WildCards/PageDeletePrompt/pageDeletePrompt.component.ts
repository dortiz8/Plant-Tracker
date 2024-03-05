import {Component, EventEmitter, Input, Output} from '@angular/core'; 
import { Observable } from 'rxjs';
import { GENERIC_PRE_DELETE_MESSAGE } from 'src/app/shared/constants/common';

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
        this.componentMessage = GENERIC_PRE_DELETE_MESSAGE; 
    }

    emitNoFunction(){
        this.noFunction.emit(); 
    }
    emitYesFunction(){
        this.yesFunction.emit(); 
    }
   
}