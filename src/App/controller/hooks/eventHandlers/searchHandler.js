import { loadLeftNav } from '../../controller.js';

function searchHandler(searchTerm) {
  loadLeftNav(searchTerm);
}

export default searchHandler;
