import { renderRecipe } from '../../controller.js';
import * as model from '../../../model/model.js';
import * as NotificationView from '../../../view/shared/Notifications/NotificationView.js';

async function onLoadHandler(hashId) {
  try {
    const { recipe } = await model.getRecipe(hashId);
    renderRecipe(recipe);
  } catch (err) {
    NotificationView.render(err.message, 'error');
    console.error(err);
  }
}

export default onLoadHandler;
