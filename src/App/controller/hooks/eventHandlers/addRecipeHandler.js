import * as model from '../../../model/model.js';
import { renderRecipe } from '../../controller.js';
import * as NotificationView from '../../../view/shared/Notifications/NotificationView.js';
import * as AddRecipeView from '../../../view/AddRecipeView';

async function addRecipeHandler(formData) {
  try {
    const recipe = await model.addRecipe(formData);
    renderRecipe(recipe);
    AddRecipeView.removeModal();
  } catch (err) {
    NotificationView.render(err.message, 'error');
    console.error(err);
  }
}

export default addRecipeHandler;
