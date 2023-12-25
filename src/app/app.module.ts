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
import { PageNotFoundComponent } from './Components/WildCards/PageNotFound/pageNotFound.component';
import { PlantNotesComponent } from './Components/PlantDetails/PlantNotes/plantNotes.component';
import { PlantGeneralInformationComponent } from './Components/PlantDetails/PlantGeneralInformation/plantGeneralInformation.component';
import { PlantCardComponent } from './Components/PlantCard/plantCard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
//import { MatCalendar } from '@angular/material/datepicker/';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { PlantsEffects } from './shared/store/effects/plant.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducers, effects, userReducers, userEffects} from './shared/store'; 
import { PageLoadingComponent } from './Components/WildCards/PageLoading/pageLoading.component';
import { PageFailedComponent } from './Components/WildCards/PageFailed/pageFailed.component';
import { FormValidators } from './shared/services/utils/formValidators';
import { PageSuccessComponent } from './Components/WildCards/PageSuccess/pageSuccess.component';
import { PlantFormComponent } from './Components/PlantForm/plantForm.component';
import { PageDeletePromptComponent } from './Components/WildCards/PageDeletePrompt/pageDeletePrompt.component';
import { PlantNote } from './shared/models/PlantNote';
import { PlantNoteComponent } from './Components/PlantDetails/PlantGeneralInformation/PlantNote/plantNote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlantsStatsComponent } from './Components/PlantsStats/plantsStats.component';
import { TopNavigationComponent } from './Components/Navigation/TopNavigation/topNav.component';
import { BottomNavigationComponent } from './Components/Navigation/BottomNavigation/bottomNav.component';
import { FilterPipe } from './shared/services/utils/lisFilter';
import { GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthGuard } from './shared/services/authentication/AuthGuard';
import { LoginFormGoogleComponent } from './Components/Login/loginFormGoogle.component';
import { AccountCreateFormComponent } from './Components/AccountCreate/accountCreateForm.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    PlantCardComponent,
    PlantFormComponent,
    LoginFormComponent, 
    LoginFormGoogleComponent, 
    AccountCreateFormComponent, 
    PlantDetailsComponent,
    TopNavigationComponent,
    BottomNavigationComponent, 
    PageNotFoundComponent, 
    PlantNotesComponent, 
    PlantNoteComponent,
    PlantGeneralInformationComponent, 
    PlantsStatsComponent, 
    PageLoadingComponent, 
    PageFailedComponent, 
    PageSuccessComponent, 
    PageDeletePromptComponent, 
    FilterPipe
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AppSharedModule, 
    HttpClientModule, 
    NgbModule, 
    AppRoutingModule, 
    AppJwtModule, 
    BrowserAnimationsModule, 
    MatInputModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    SocialLoginModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('user', userReducers),
    StoreModule.forFeature('products', reducers),  
    EffectsModule.forRoot([]), 
    EffectsModule.forFeature(userEffects),
    EffectsModule.forFeature(effects),
    FontAwesomeModule
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false, //keeps the user signed in
        providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider('683573935998-g2aveu6e7n98au5umaqvq8nbap9j4v7k.apps.googleusercontent.com') // your client id
            }
          ], 
          onError: (err) => {
            console.log(err); 
          }  
        } as SocialAuthServiceConfig, 
    },
    GoogleSigninButtonDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
