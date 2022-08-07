import * as LeftNavView from '../../../view/LeftNavView.js';
import * as model from '../../../model/model.js';
import * as PaginationView from '../../../view/PaginationView.js';

function paginationHandler(curButton) {
  let { curPageNum } = model.state;

  if (curButton?.className.includes('next')) {
    curPageNum += 1;
    PaginationView.render(curPageNum, model.state.paginatedArr.length);
    LeftNavView.render(model.state.paginatedArr[curPageNum - 1]);
    model.state.curPageNum += 1;
  }

  if (curButton?.className.includes('prev')) {
    curPageNum = curPageNum - 1;
    PaginationView.render(curPageNum, model.state.paginatedArr.length);
    LeftNavView.render(model.state.paginatedArr[curPageNum - 1]);
    model.state.curPageNum -= 1;
  }
}

export default paginationHandler;
