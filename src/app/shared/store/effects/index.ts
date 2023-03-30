import { PlantEffects } from './plant.effects';
import { PlantNotesEffects } from './plantNotes.effects';
import {PlantsEffects} from './plants.effects'; 

export const effects: any[] = [PlantsEffects, PlantEffects, PlantNotesEffects]; 

export * from './plants.effects'; 
export * from './plant.effects'; 
export * from './plantNotes.effects'