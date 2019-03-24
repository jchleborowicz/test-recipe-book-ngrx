import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {map, switchMap} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';

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

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
