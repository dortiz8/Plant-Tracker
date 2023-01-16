import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter(){
    return localStorage.getItem('token'); 
}

const jwtConfig ={
    tokenGetter: tokenGetter, 
    
}

@NgModule({
    imports: [JwtModule.forRoot({config: jwtConfig})],
    exports: [JwtModule]
})
export class AppJwtModule { } 