import * as ShoppingListActions from './shopping-list.actions';

import {Ingredient} from '../../shared/ingredient.model';

const initialState = [
  new Ingredient('Apples', 5),
  new Ingredient('Tomatoes', 10),
];

export function shoppingListReducer(state, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return {ingredients: initialState};
  }
}
