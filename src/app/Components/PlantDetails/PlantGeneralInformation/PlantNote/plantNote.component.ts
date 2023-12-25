import { Component, EventEmitter, Input, Output } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import * as fromStore from '../../../../shared/store';

import { PlantNote } from 'src/app/shared/models/PlantNote';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantNoteCreation } from 'src/app/shared/models/PlantNoteCreation';
import { faCancel, faCheck, faEllipsis, faSquarePlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'plant-note',
    templateUrl: './plantNote.component.html',
    styleUrls: ['./plantNote.compoenent.css'],
    providers: []
})
export class PlantNoteComponent {
   
   @Input() noteDescription : string | null | undefined; 
   @Input() noteId: number | null | undefined; 
   @Output("saveNote") saveNoteFunction: EventEmitter<any> = new EventEmitter();
   @Output("deleteNote") deleteNoteFunction: EventEmitter<any> = new EventEmitter();

   editFormGroup: FormGroup; 
   isEditing: boolean; 
   isAddingNewNote: Observable<boolean>; 

    // Icons
    editIcon = faEllipsis; 
    deleteIcon = faXmark; 
    checkMarkIcon = faCheck; 
    cancelIcon = faCancel
    
    constructor(private readonly route: ActivatedRoute, private store: Store<fromStore.ProductsState>) {
       
    }

    ngOnInit() {
        
        this.isEditing = this.isNewNote(); 
        this.mapEditFormGroup(); 
        
        // if(this.noteDescription == undefined || this.noteDescription == '' || this.noteDescription == null){
        //     this.isEditing = this.noteDescription == undefined; 
        // }
    };

    mapEditFormGroup(){
        this.editFormGroup = new FormGroup({
            descriptionFormControl: new FormControl(this.noteDescription, [Validators.required, Validators.maxLength(200)])
        });
    }
    isNewNote(){
        this.isAddingNewNote = this.store.select(fromStore.getPlantNotesAddingChildNote); 
        var isNewNote = false; 
        this.isAddingNewNote.subscribe((x)=>{
            isNewNote = x; 
        }); 
        return isNewNote; 
    }

    editNote(){
        this.isEditing = true; 
    }
    deleteNote(){
        
        this.deleteNoteFunction.emit(this.noteId?.toString())
        this.isEditing = false; 
    }
    cancelEdit(){
        if(this.isNewNote()){
            this.store.dispatch(new fromStore.CancelPreAddPlantNote()); 
            return; 
        }

        this.isEditing = false; 
    }
    saveNote(editFormValue: any){
       
        this.saveNoteFunction.emit([this.noteId, editFormValue.descriptionFormControl]); 
        

    }

}; 