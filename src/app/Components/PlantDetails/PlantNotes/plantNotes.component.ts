import { Component, Input } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import * as fromStore from '../../../shared/store';

import { PlantNote } from 'src/app/shared/models/PlantNote';
import { PlantNoteDelete } from 'src/app/shared/models/PlantNoteDelete';
import { PlantNoteCreation } from 'src/app/shared/models/PlantNoteCreation';
import { PatchListObject, PatchObject } from 'src/app/shared/models/PatchObject';
import { ObjectMapper } from 'src/app/shared/services/utils/objectMapper';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'plant-notes',
    templateUrl: './plantNotes.component.html',
    styleUrls: ['./plantNotes.component.css'],
    providers: []
})
export class PlantNotesComponent {
    @Input() plantId: string | null | undefined; 
//    plantId: string | null | undefined;
   plantNotes$: Observable<PlantNote[]>;
   loading$: Observable<boolean>; 
   loaded$: Observable<boolean>; 
   
    isAddingNewNote$: Observable<boolean>;
    loadingFailed$: Observable<boolean>;
    errMessage$: Observable<string>;
    showError: boolean;
    addIcon = faSquarePlus; 
    
    constructor(private readonly route: ActivatedRoute, private store: Store<fromStore.ProductsState>) {
    
    }
    
    ngOnInit() {
        this.errMessage$ = this.store.select(fromStore.getPlantNotesErrMessage);
        //this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
        this.isAddingNewNote$ = this.store.select(fromStore.getPlantNotesAddingChildNote); 
        //console.log('notes ', this.plantId)
        this.loading$ = this.store.select(fromStore.getPlantNotesLoading); 
        this.plantNotes$ = this.store.select(fromStore.getPlantNotes); 
        this.store.dispatch(new fromStore.LoadPlantNotes(ObjectMapper.mapPlantNoteLoad(this.plantId, localStorage.getItem('userId')))); 
        this.loaded$ = this.store.select(fromStore.getPlantNotesLoaded); 
        
        //this.plantNotes$.subscribe(note => console.log(note))
    };
    
    isNewNote() {
        var isNewNote = false;
        this.isAddingNewNote$.subscribe((x) => {
            isNewNote = x;
        });
        return isNewNote;
    }

    deleteNote($plantId: any) {
        const plantToDelete = ObjectMapper.mapPlantNoteToDelete($plantId, this.plantId, localStorage.getItem('userId')); 
        this.store.dispatch(new fromStore.DeletePlantNote(plantToDelete))
    }
    
    saveNote($noteInfo: string[]) {
        if(this.isNewNote()){
            this.saveNewNote($noteInfo)
            return; 
        }
        this.editExistingNote($noteInfo)
    }

    saveNewNote($noteInfo: string[]){
        var plantToSave = ObjectMapper.mapPlantNoteCreation($noteInfo[1], this.plantId, localStorage.getItem('userId')?.toString())
        this.store.dispatch(new fromStore.AddPlantNote(plantToSave))
    }
    
    editExistingNote($noteInfo: string[]){
        var noteToEdit = ObjectMapper.mapPatchObject("replace", "/description", $noteInfo[1]);
        var patchListObject = ObjectMapper.mapPatchListObject([noteToEdit], $noteInfo[0], this.plantId, localStorage.getItem('userId')?.toString())
        this.store.dispatch(new fromStore.EditPlantNote(patchListObject)); 
    }

    addNote(){
        this.store.dispatch(new fromStore.PreAddPlantNote()); 
    }

    reload(){
        window.location.reload()
    }
}; 