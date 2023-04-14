import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { Store } from '@ngrx/store';
import * as fromStore from './shared/store';
import { IS_AUTH } from './shared/constants/auth';
import { LocalStorageService } from './shared/services/authentication/LocalStorageService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Plant Tracker'; 
  userAuthenticated : boolean; 
  constructor(private localStorageService: LocalStorageService, private store: Store<fromStore.ProductsState>) {
    
  }; 

  ngOnInit(){
    this.userAuthenticated = this.isUserAuthenticated(); 
  }

  isUserAuthenticated():boolean{
    // var userLoaded = null; 
    // this.store.select(fromStore.getUserLoaded).subscribe(x => userLoaded = x); 
    // if(userLoaded != false){
    //   return true; 
    // }
    return this.localStorageService.retrieveKey(IS_AUTH) == "true" ? true : false; 
  }
}

