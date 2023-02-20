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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
//import { MatCalendar } from '@angular/material/datepicker/';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PlantEditFormComponent } from './Components/PlantEditForm/plantEditForm.component';
//import { PlantsEffects } from './shared/store/effects/plant.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducers, effects} from './shared/store'; 
import { PageLoadingComponent } from './Components/WildCards/PageLoading/pageLoading.component';
import { PageFailedComponent } from './Components/WildCards/PageFailed/pageFailed.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantCardComponent,
    PlantEditFormComponent,
    LoginFormComponent, 
    PlantDetailsComponent,
    NavigationComponent, 
    PageNotFoundComponent, 
    PlantScheduleComponent, 
    PlantGeneralInformationComponent, 
    PageLoadingComponent, 
    PageFailedComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AppSharedModule, HttpClientModule, NgbModule, AppRoutingModule, AppJwtModule, BrowserAnimationsModule, MatInputModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, StoreModule.forRoot({}), StoreModule.forFeature('products', reducers), EffectsModule.forRoot([]), EffectsModule.forFeature(effects)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
