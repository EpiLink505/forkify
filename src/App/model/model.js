import { FORKIFY_URL, FIREBASE_URL, API_KEY } from '../../configs/config.js';
import deleteHook from './hooks/APIs/deleteHook.js';
import fetchHook from './hooks/APIs/fetchHook.js';
import postHook from './hooks/APIs/postHook.js';
import putHook from './hooks/APIs/putHook.js';
import paginationHook from './hooks/paginationHook.js';
import transformAddRecipeData from './hooks/transformAddRecipeData.js';

export const state = {
  recipe: {},
  paginatedArr: [],
  curPageNum: 1,
  bookmarks: [],
  curActivePreview: ['', ''],
};

export async function getRecipe(recipeId) {
  try {
    const { data } = await fetchHook(
      `${FORKIFY_URL}/${recipeId}?key=${API_KEY}`
    );
    // const data = [];
    if (data.recipe) data.recipe.servings = 1;
    state.recipe = data.recipe;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getSearchRecipes(searchTerm) {
  try {
    const { data } = await fetchHook(
      `${FORKIFY_URL}/?search=${searchTerm}&key=${API_KEY}`
    );
    const { recipes } = data;
    // const recipes = [];
    return recipes;
  } catch (err) {
    throw err;
  }
}

export function createPaginatedArr(dataArr) {
  state.paginatedArr = paginationHook(dataArr);
  return state.paginatedArr;
}

export async function getBookmarks() {
  try {
    const bookmarks = await fetchHook(`${FIREBASE_URL}/bookmarks.json`);
    let bookmarksArr = [];
    for (const key in bookmarks) {
      bookmarksArr.push(bookmarks[key]);
    }
    state.bookmarks = bookmarksArr;
    return bookmarksArr;
  } catch (err) {
    throw err;
  }
}

export async function addDeleteBookmark() {
  const { recipe } = state;
  const { id, image_url, publisher, title, key } = recipe;
  const doesExist = bookmarkExists(id);

  const data = {
    id,
    image_url,
    publisher,
    title,
    ...(key && { key: key }),
  };
  if (doesExist) {
    await deleteHook(`${FIREBASE_URL}/bookmarks/${id}.json`);
    return {
      message: 'Bookmark has been deleted!',
      theme: 'warning',
    };
  }
  if (!doesExist) {
    await putHook(`${FIREBASE_URL}/bookmarks/${id}.json`, data);
    return {
      message: 'Bookmark has been added!',
      theme: 'success',
    };
  }
}

export function bookmarkExists(recipeId) {
  const id = recipeId;

  return (
    state.bookmarks.filter(bookmark => {
      if (bookmark.id === id) return id;
    }).length !== 0
  );
}

export async function addRecipe(formData) {
  try {
    const newRecipe = transformAddRecipeData(formData, API_KEY);
    const data = await postHook(`${FORKIFY_URL}/?key=${API_KEY}`, newRecipe);
    return data.data.recipe;
  } catch (err) {
    throw err;
  }
}
//1659902695713
