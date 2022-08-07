import * as model from '../../../model/model.js';
import * as NotificationView from '../../../view/shared/Notifications/NotificationView';
import * as RecipeView from '../../../view/RecipeView';

function servingsHandler(step) {
  if (model.state.recipe.servings === 1 && step === -1) {
    NotificationView.render('You cannot decrease servings below 1', 'warning');
    return;
  }
  if (model.state.recipe.servings === 10 && step === 1) {
    NotificationView.render('You cannot increase servings above 10', 'warning');
    return;
  }

  model.state.recipe.servings += step;

  RecipeView.render(model.state.recipe);
}

export default servingsHandler;
