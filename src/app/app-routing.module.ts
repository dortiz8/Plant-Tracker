import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantFormComponent } from './Components/PlantForm/plantForm.component';
import { PlantListComponent } from './Components/PlantList/plantList.component';

const routes: Routes = [
  { path: 'addPlant', component: PlantFormComponent },
  //{ path: 'home', component: PlantListComponent },
  //{ path: '', pathMatch: 'full', redirectTo: 'home' }  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
