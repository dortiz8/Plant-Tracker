import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { Store } from '@ngrx/store';
import * as fromStore from './shared/store';
import { IS_AUTH } from './shared/constants/auth';
import { LocalStorageService } from './shared/services/authentication/LocalStorageService';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Plant Tracker'; 
  userAuthenticated : boolean;
  getUserLoaded: Observable<boolean>  
  constructor(private localStorageService: LocalStorageService, private store: Store<fromStore.ProductsState>) {
    
  }; 

  ngOnInit(){
    this.getUserLoaded = this.store.select(fromStore.getUserLoaded); 
    this.isUserAuthenticated(); 
  }

  isUserAuthenticated():void{
    this.getUserLoaded.subscribe(x =>{
      this.userAuthenticated = x; 
      if(!this.userAuthenticated){
        var isUserAuth = this.localStorageService.retrieveKey(IS_AUTH); 
        if(isUserAuth != null){
          this.userAuthenticated = isUserAuth == "true" ? true : false; 
        }
      }
    } ); 
  }
}

