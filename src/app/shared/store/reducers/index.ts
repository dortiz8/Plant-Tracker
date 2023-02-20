// Have one file to contain all reducers for this specific module
// define structure of the state tree
import {ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'; 
import * as fromPlants from './plants.reducer'; 
import * as fromPlant from './plant.reducer'; 

export interface ProductsState{
    plants: fromPlants.PlantsState; 
    plant: fromPlant.PlantState
}

// Register our reducers 
export const reducers: ActionReducerMap<ProductsState, any>= {
    plants: fromPlants.reducer,
    plant: fromPlant.reducer
}; 

// Set selectors
// Selectors allows us to separate our application state with our component trees 
export const getProductsState = createFeatureSelector<ProductsState>('products')

// Create a top level selector for plants state
export const getPlantsState =  createSelector(
    getProductsState, 
    (state: ProductsState) => state.plants
); 

export const getPlantState =  createSelector(
    getProductsState, 
    (state: ProductsState) => state.plant
); 

    console.log(getPlantsState); 
// set the top level individual exports from the plants state
export const getAllPlants = createSelector(getPlantsState, fromPlants.getPlants); 
export const getPlantsLoaded = createSelector(getPlantsState, fromPlants.getPlantsLoaded); 
export const getPlantsLoading = createSelector(getPlantsState, fromPlants.getPlantsLoading); 
export const getPlantsErrMessage = createSelector(getPlantsState, fromPlants.getPlantsErrMessage); 


export const getPlant = createSelector(getPlantState, fromPlant.getPlant); 
export const getPlantLoaded = createSelector(getPlantState, fromPlant.getPlantLoaded); 
export const getPlantLoading = createSelector(getPlantState, fromPlant.getPlantLoading); 
export const getPlantErrMessage = createSelector(getPlantState, fromPlant.getPlantErrMessage); 

