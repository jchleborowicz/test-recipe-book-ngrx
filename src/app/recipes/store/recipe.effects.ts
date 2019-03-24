import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {

  readonly dbUrl = 'https://ng-recipe-book-a5708.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(this.dbUrl, {
        observe: 'body',
        responseType: 'json'
      });
    }),
    map((recipes) => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    )
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest(
        'PUT',
        this.dbUrl,
        state.recipes,
        {reportProgress: true}
      );
      return this.httpClient.request(req);
    })
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}
