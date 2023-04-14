import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantFormComponent } from './Components/PlantForm/plantForm.component';
import { LoginFormComponent } from './Components/Login/loginForm.component';
import { PlantListComponent } from './Components/PlantList/plantList.component';
import { AuthGuard } from './shared/services/authentication/AuthGuard';
import { AuthenticationService } from './shared/services/authentication/AuthenticationService';
import { PlantDetailsComponent } from './Components/PlantDetails/plantDetails.component';
import { PageNotFoundComponent } from './Components/WildCards/PageNotFound/pageNotFound.component';
import { PlantGeneralInformationComponent } from './Components/PlantDetails/PlantGeneralInformation/plantGeneralInformation.component';
import { PlantNotesComponent } from './Components/PlantDetails/PlantNotes/plantNotes.component';
import { PlantEditFormComponent } from './Components/PlantEditForm/plantEditForm.component';

const routes: Routes = [
  // have your most specific routes at the top
  // The route titles can be dinamic using a TitleStrategy
  // for more information visit: https://angular.io/guide/router
  {path: 'editPlant/:plantId', title: 'Edit Plant Component', component: PlantEditFormComponent},
  { 
    path: 'plantDetails/:plantId', 
    component: PlantDetailsComponent, 
    children: [
      {path: '', title: 'Plant Details Component', redirectTo: 'generalInfo', pathMatch: 'full'},
      {
        path: 'generalInfo', title: 'Plant General Information Component', component: PlantGeneralInformationComponent,
      },
      {
        path: 'notes', title: 'Plant Notes Component', component: PlantNotesComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { 
    path: 'home', title: 'Home Component', component: PlantListComponent, 
      canActivate: [AuthGuard]
    },
  { 
    path: 'addPlant', title: 'Plant Form Component', component: PlantFormComponent, 
    //canActivate: [AuthGuard] 
  },
  { path: 'login', title: 'Login Component',  component: LoginFormComponent},
  // This route is a redirect route if user tries to acces
  // the intial relative URL localhost:**/
  { path: '', pathMatch: 'full', redirectTo: 'login' }, 
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full'} // catch all route 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
