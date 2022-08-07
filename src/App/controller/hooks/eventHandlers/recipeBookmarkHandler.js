import * as model from '../../../model/model.js';
import * as NotificationView from '../../../view/shared/Notifications/NotificationView.js';
import * as RecipeView from '../../../view/RecipeView.js';
import { loadBookmarks } from '../../controller.js';

async function recipeBookmarkHandler() {
  const { message, theme } = await model.addDeleteBookmark();
  NotificationView.render(message, theme);
  loadBookmarks();
  RecipeView.toggleBookmark();
}

export default recipeBookmarkHandler;
