import { API_KEY, DEFAULT_SEARCH_TERM } from '../../configs/config.js';
import * as model from '../model/model.js';
import * as AddRecipeView from '../view/AddRecipeView.js';
import * as BookmarkView from '../view/BookmarkView.js';
import * as LeftNavView from '../view/LeftNavView.js';
import * as NotificationView from '../view/shared/Notifications/NotificationView.js';
import * as PaginationView from '../view/PaginationView.js';
import * as RecipeView from '../view/RecipeView.js';
import * as SearchView from '../view/SearchView.js';

import addRecipeHandler from './hooks/eventHandlers/addRecipeHandler.js';
import bookmarkHandler from './hooks/eventHandlers/bookmarkHandler.js';
import leftNavHandler from './hooks/eventHandlers/leftNavHandler.js';
import onLoadHandler from './hooks/eventHandlers/onLoadHandler.js';
import paginationHandler from './hooks/eventHandlers/paginationHandler.js';
import recipeBookmarkHandler from './hooks/eventHandlers/recipeBookmarkHandler.js';
import searchHandler from './hooks/eventHandlers/searchHandler.js';
import servingsHandler from './hooks/eventHandlers/servingsHandler.js';

export function init() {
  AddRecipeView.addRecipeListeners(addRecipeHandler);
  BookmarkView.addBookmarksListener(bookmarkHandler);
  LeftNavView.addNavRecipeListener(leftNavHandler);
  PaginationView.addPaginationListener(paginationHandler);
  RecipeView.addRecipeBookmarkListener(recipeBookmarkHandler);
  RecipeView.addOnLoadListener(onLoadHandler);
  RecipeView.addServingsListener(servingsHandler);
  SearchView.addSearchListener(searchHandler);
  loadLeftNav();
  loadBookmarks();
}

export function activateLinks(recipeId) {
  BookmarkView.renderActivePreview(recipeId);
  LeftNavView.renderActivePreview(recipeId);
}

export function renderRecipe(recipe) {
  model.state.recipe = recipe;
  window.history.pushState(null, 'forkify', `/#${recipe.id}`);
  RecipeView.renderSpinner();
  RecipeView.render(recipe, API_KEY);
  activateLinks(recipe.id);
}

export async function loadLeftNav(searchTerm = false) {
  try {
    LeftNavView.renderSpinner();
    let data;
    !searchTerm
      ? (data = await model.getSearchRecipes(DEFAULT_SEARCH_TERM))
      : (data = await model.getSearchRecipes(searchTerm));
    if (!data.length)
      NotificationView.render(
        'No recipes found. Please try another Search Term.',
        'warning'
      );

    const paginatedArr = model.createPaginatedArr(data);
    LeftNavView.render(paginatedArr[0]);
    PaginationView.render(1, paginatedArr.length);
  } catch (err) {
    NotificationView.render(err.message, 'error');
    console.error(err);
  }
}

export async function loadBookmarks() {
  try {
    const bookmarksArr = await model.getBookmarks();
    BookmarkView.render(bookmarksArr, API_KEY);
  } catch (err) {
    NotificationView.render(err.message, 'error');
    console.error(err);
  }
}
