import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Plant Tracker'; 
  isAuth: string | null = 'false';
  authenticated: boolean = false;
  

 authenticate(isAuth: any){
   console.log(isAuth, ' emiitter')
   this.authenticated = isAuth; 
 }; 
}

