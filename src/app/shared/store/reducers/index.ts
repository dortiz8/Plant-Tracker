// Have one file to contain all reducers for this specific module
// define structure of the state tree
import {ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'; 
import * as fromPlants from './plants.reducer'; 
import * as fromPlant from './plant.reducer'; 
import * as fromPlantNotes from './plantNotes.reducer'; 
import * as fromPlantsStats from './plantsStats.reducer'; 
import * as fromUser from './user.reducer'; 

export interface UserState{
    user: fromUser.AuthState; 
}

export interface ProductsState{
    plants: fromPlants.PlantsState; 
    plant: fromPlant.PlantState; 
    plantNotes: fromPlantNotes.PlantNotesState; 
    plantsStats: fromPlantsStats.PlantsStatsState; 
}

export const userReducers: ActionReducerMap<UserState, any> = {
    user: fromUser.reducer
}

// Register our reducers 
export const reducers: ActionReducerMap<ProductsState, any>= {
    plants: fromPlants.reducer,
    plant: fromPlant.reducer, 
    plantNotes: fromPlantNotes.reducer,
    plantsStats: fromPlantsStats.reducer
}; 

// Set selectors
// Selectors allows us to separate our application state with our component trees 
export const getUserState = createFeatureSelector<UserState>('user'); 
export const getProductsState = createFeatureSelector<ProductsState>('products'); 

export const getUserSelectorState = createSelector(
    getUserState,
    (state: UserState) => state.user
); 

// Create a top level selector for plants state
export const getPlantsState =  createSelector(
    getProductsState, 
    (state: ProductsState) => state.plants
); 

export const getPlantState =  createSelector(
    getProductsState, 
    (state: ProductsState) => state.plant
); 

export const getPlantNotesState = createSelector(
    getProductsState,
    (state: ProductsState) => state.plantNotes
); 
export const getPlantsStatsState = createSelector(
    getProductsState,
    (state: ProductsState) => state.plantsStats
); 


export const getUserLoading = createSelector(getUserSelectorState, fromUser.getUserLoading); 
export const getUserLoaded = createSelector(getUserSelectorState, fromUser.getUserLoaded); 
export const getUser = createSelector(getUserSelectorState, fromUser.getUser); 
export const getUserId = createSelector(getUserSelectorState, fromUser.getUserId); 
export const getUserErrMessage = createSelector(getUserSelectorState, fromUser.getUserErrMessage); 


// set the top level individual exports from the plants state
export const getAllPlants = createSelector(getPlantsState, fromPlants.getPlants); 
export const getPlantsLoaded = createSelector(getPlantsState, fromPlants.getPlantsLoaded); 
export const getPlantsLoading = createSelector(getPlantsState, fromPlants.getPlantsLoading); 
export const getPlantsErrMessage = createSelector(getPlantsState, fromPlants.getPlantsErrMessage); 
export const getPlantsDeletingStarted = createSelector(getPlantsState, fromPlants.getPlantsDeletingStarted);
export const getPlantsPlantToDelete = createSelector(getPlantsState, fromPlants.getPlantsPlantToDelete);


export const getPlant = createSelector(getPlantState, fromPlant.getPlant); 
export const getPlantLoaded = createSelector(getPlantState, fromPlant.getPlantLoaded); 
export const getPlantLoading = createSelector(getPlantState, fromPlant.getPlantLoading); 
export const getPlantErrMessage = createSelector(getPlantState, fromPlant.getPlantErrMessage); 
export const getEditPlantSuccess = createSelector(getPlantState, fromPlant.getEditPlantSuccess); 
export const getAddPlantSuccess = createSelector(getPlantState, fromPlant.getAddPlantSuccess); 
export const getAddSamePlant = createSelector(getPlantState, fromPlant.getAddSamePlant); 
export const getEditExistingPlant = createSelector(getPlantState, fromPlant.getEditExistingPlant); 

export const getPlantNotes = createSelector(getPlantNotesState, fromPlantNotes.getPlantNotes);
export const getPlantNotesLoaded = createSelector(getPlantNotesState, fromPlantNotes.getPlantNotesLoaded);
export const getPlantNotesLoading = createSelector(getPlantNotesState, fromPlantNotes.getPlantNotesLoading);
export const getPlantNotesErrMessage = createSelector(getPlantNotesState, fromPlantNotes.getPlantNotesErrMessage); 
export const getPlantNotesAddingChildNote = createSelector(getPlantNotesState, fromPlantNotes.getPlantNotesAddingChildNote); 

export const getPlantsStats = createSelector(getPlantsStatsState, fromPlantsStats.getPlantsStats);
export const getPlantsStatsLoaded = createSelector(getPlantsStatsState, fromPlantsStats.getPlantsStatsLoaded);
export const getPlantsStatsLoading = createSelector(getPlantsStatsState, fromPlantsStats.getPlantsStatsLoading);
export const getPlantsStatsErrMessage = createSelector(getPlantsStatsState, fromPlantsStats.getPlantsStatsErrMessage); 