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
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient: Ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const newIngredients = [...state.ingredients];
      newIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: newIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const ingredients = state.ingredients.splice(action.payload, 1);
      return {
        ...state,
        ingredients: ingredients
      };
    default:
      return {ingredients: initialState};
  }
}
