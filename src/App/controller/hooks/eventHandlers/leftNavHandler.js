import * as model from '../../../model/model.js';
import { renderRecipe } from '../../controller.js';
import * as NotificationView from '../../../view/shared/Notifications/NotificationView.js';

async function leftNavHandler(recipeId) {
  try {
    const { recipe } = await model.getRecipe(recipeId);
    renderRecipe(recipe);
  } catch (err) {
    NotificationView.render(err.message, 'error');
    console.error(err);
  }
}

export default leftNavHandler;
