import { Component, EventEmitter, Input, Output } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import * as fromStore from '../../../shared/store';

import { PlantNote } from 'src/app/shared/models/PlantNote';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantNoteCreation } from 'src/app/shared/models/PlantNoteCreation';

@Component({
    selector: 'plant-note',
    templateUrl: './plantNote.component.html',
    styleUrls: [],
    providers: []
})
export class PlantNoteComponent {
   
   @Input() noteDescription : string | null | undefined; 
   @Input() noteId: number | null | undefined; 
   @Output("saveNote") saveNoteFunction: EventEmitter<any> = new EventEmitter();
   @Output("deleteNote") deleteNoteFunction: EventEmitter<any> = new EventEmitter();

   editFormGroup: FormGroup; 
   isEditing: boolean; 
    constructor(private readonly route: ActivatedRoute, private store: Store<fromStore.ProductsState>) {
    }

    ngOnInit() {
        this.editFormGroup = new FormGroup({
            descriptionFormControl: new FormControl(this.noteDescription, [Validators.required, Validators.maxLength(200)])
        })
        console.log(this.noteDescription)
        if(this.noteDescription == undefined || this.noteDescription == '' || this.noteDescription == null){
            this.isEditing = this.noteDescription == undefined; 
        }
    };

    editNote(){
        this.isEditing = true; 
    }
    deleteNote(){
        
        this.deleteNoteFunction.emit(this.noteId?.toString())
        this.isEditing = false; 
    }
    cancelEdit(){
        this.isEditing = false; 
    }
    saveNote(editFormValue: any){
        this.saveNoteFunction.emit([this.noteId?.toString(), editFormValue.descriptionFormControl ]); 
        //console.log(editFormValue); 
        // this.isEditing = false; 
        // this.noteDescription = editFormValue.descriptionFormControl; 
        // var note: PlantNoteCreation = { plantId: this.pla }
        // this.store.dispatch(new fromStore.AddPlantNote(new PlantNoteCreation()))

    }

}; 