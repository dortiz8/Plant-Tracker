import { PlantEffects } from './plant.effects';
import { PlantNotesEffects } from './plantNotes.effects';
import {PlantsEffects} from './plants.effects'; 
import { UserEffects } from './user.effects';

export const userEffects: any[] = [UserEffects];
export const effects: any[] = [PlantsEffects, PlantEffects, PlantNotesEffects]; 

export * from './plants.effects'; 
export * from './plant.effects'; 
export * from './plantNotes.effects'; 
export * from './user.effects'; 