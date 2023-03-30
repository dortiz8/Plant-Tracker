import { Component } from '@angular/core';
// Route information
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Plant } from 'src/app/shared/models/Plant';
import * as fromStore from '../../../shared/store';

import { PlantNote } from 'src/app/shared/models/PlantNote';
import { PlantNoteDelete } from 'src/app/shared/models/PlantNoteDelete';
import { PlantNoteCreation } from 'src/app/shared/models/PlantNoteCreation';

@Component({
    selector: 'plant-notes',
    templateUrl: './plantNotes.component.html',
    styleUrls: [],
    providers: []
})
export class PlantNotesComponent {
   plantId: string | null | undefined;
   plantNotes$: Observable<PlantNote[]>;
   loading$: Observable<boolean>; 
   loaded$: Observable<boolean>; 
   childComponentIsEditing$: Observable<boolean>; 
   
    constructor(private readonly route: ActivatedRoute, private store: Store<fromStore.ProductsState>) {
}

    ngOnInit() {
        this.plantId = this.route.parent?.snapshot.paramMap.get('plantId');
        //console.log('notes ', this.plantId)
        this.loading$ = this.store.select(fromStore.getPlantNotesLoading); 
        this.plantNotes$ = this.store.select(fromStore.getPlantNotes); 
        this.childComponentIsEditing$ = this.store.select(fromStore.getPlantNotesIsOnEditMode); 
        this.childComponentIsEditing$.subscribe(x => console.log(x, ' editing'))
        this.store.dispatch(new fromStore.LoadPlantNotes(this.plantId)); 
        this.loaded$ = this.store.select(fromStore.getPlantNotesLoaded); 

        //this.plantNotes$.subscribe(note => console.log(note))
    };
    
    deleteNote($plantId: any) {
        //this.store.dispatch(new fromStore.DeletePlantNote())
        var plantToDelete: PlantNoteDelete = {
            Id: $plantId,
            plantId: this.plantId,
            userId: localStorage.getItem('userId')
        }
        //console.log('delete emitted from child', $plantId, plantToDelete)
       this.store.dispatch(new fromStore.DeletePlantNote(plantToDelete))
    }
    
    saveNote($noteInfo: string[]) {
        var plantToSave: PlantNoteCreation = {
            userId: localStorage.getItem('userId')?.toString(),
            plantId: $noteInfo[0],
            description: $noteInfo[1]
        }
        //console.log('save emitted from child', $noteInfo, plantToSave); 
        this.store.dispatch(new fromStore.AddPlantNote(plantToSave))
    }

    addNote(){
        this.store.dispatch(new fromStore.PreAddPlantNote()); 
       
    }
    componentIsEditing(event: any){
        console.log(event, ' emitter')
        
    }
}; 