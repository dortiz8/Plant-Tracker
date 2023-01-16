import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlantListComponent } from './Components/PlantList/plantList.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './app-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './Components/Login/loginForm.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AppJwtModule } from './app-jwt.module';
import { PlantDetailsComponent } from './Components/PlantDetails/plantDetails.component';
import { NavigationComponent } from './Components/Navigation/navigation.component';
import { PageNotFoundComponent } from './Components/WildCards/PageNotFound/pageNotFound.component';
import { PlantScheduleComponent } from './Components/PlantDetails/PlantSchedule/plantSchedule.component';
import { PlantGeneralInformationComponent } from './Components/PlantDetails/PlantGeneralInformation/plantGeneralInformation.component';
import { PlantCardComponent } from './Components/PlantCard/plantCard.component';



@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantCardComponent,
    LoginFormComponent, 
    PlantDetailsComponent,
    NavigationComponent, 
    PageNotFoundComponent, 
    PlantScheduleComponent, 
    PlantGeneralInformationComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AppSharedModule, HttpClientModule, NgbModule, AppRoutingModule, AppJwtModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
