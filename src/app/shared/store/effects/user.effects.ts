import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, delay, tap } from 'rxjs/operators';
import { TOKEN, USER_ID } from '../../constants/auth';
import { HOME_ROUTE } from '../../constants/routes';
import { AuthResponseBody } from '../../models/IAuthResponse';
import { AuthenticationService } from '../../services/authentication/AuthenticationService';
import { LocalStorageService } from '../../services/utils/LocalStorageService';
import { ObjectMapper } from '../../services/utils/objectMapper';

import * as userActions from '../actions/user.action'; 

@Injectable()
export class UserEffects{
    /**
     *
     */
    constructor(private actions$: Actions, private readonly store: Store,
        private readonly router: Router, private authService: AuthenticationService, 
        private localStorageService: LocalStorageService) {
    }

    loadUser$ = createEffect(() => this.actions$.pipe(ofType(userActions.LOAD_USER), //delay(2000),
        mergeMap(({ payload }) => this.authService.postAuthenticationCredentials(payload)
            .pipe(
                map((user: AuthResponseBody) => {
                    this.localStorageService.storeKeys(ObjectMapper.mapUserToLocalStorageObject(user));
                    this.authService.saveTokens(user.token, user.refreshToken); 
                    this.router.navigate([HOME_ROUTE]);
                    return new userActions.LoadUserSuccess(user)
                }),
                catchError((err) => of(new userActions.LoadUserFail(err)))
            ))));

    logOffUser$ = createEffect(() => this.actions$.pipe(ofType(userActions.LOG_OFF_USER),
        tap(() => {
            this.authService.logOut(); 
            this.router.navigate(['/login']).then(() => window.location.reload());
        })),
        { dispatch: false });
}