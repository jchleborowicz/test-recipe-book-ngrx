import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

import {RecipeService} from '../recipes/recipe.service';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    const req = new HttpRequest('PUT', this.dbUrl, this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
  }
}
