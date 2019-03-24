import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, switchMap, mergeMap} from 'rxjs/operators';

import * as firebase from 'firebase';
import {from} from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => action.payload),
    switchMap((authData: { user: string, password: string }) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.user, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => action.payload),
    switchMap((authData: { user: string, password: string }) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.user, authData.password));
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
    mergeMap((token: String) => {
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  constructor(private actions$: Actions) {
  }
}
