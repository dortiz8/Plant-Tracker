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
import { LocalStorageService } from '../../services/authentication/LocalStorageService';
import { UserService } from '../../services/user/userService';

import { ObjectMapper } from '../../services/utils/objectMapper';

import * as userActions from '../actions/user.action';

@Injectable()
export class UserCreateEffects {
    /**
     *
     */
    constructor(private actions$: Actions, private readonly store: Store,
        private readonly router: Router, private authService: AuthenticationService,
        private readonly userService: UserService,
        private localStorageService: LocalStorageService) {
    }
    createUser$ = createEffect(() => this.actions$.pipe(ofType(userActions.CREATE_USER), delay(2000),
        mergeMap(({ payload }) => this.userService.postCreateUser(payload)
            .pipe(
                map(result => {
                    return new userActions.CreateUserSuccess(result); 
                }),
                catchError((err) =>{
                    console.log(err, ' from reducer ')
                    return of(new userActions.CreateUserFail(err))
                } )
            ))));
}








