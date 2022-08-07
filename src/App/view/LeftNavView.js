import icons from '../../assets/icons.svg';
import Spinner from './shared/Spinner/Spinner.js';

const parentElement = document.querySelector('.results');

export function renderSpinner() {
  Spinner(parentElement);
}

export function addNavRecipeListener(handler) {
  parentElement.addEventListener('click', event => {
    event.preventDefault();
    const navItem = event.target.closest('li');
    handler(navItem.id);
    // window.history.pushState(null, 'forkify', `/#${navItem.id}`);
    // window.location.hash = `#${navItem.id}`;
  });
}

export function renderActivePreview(recipeId) {
  const leftNavPreviews = parentElement.querySelectorAll('.preview');

  [...leftNavPreviews].forEach(preview => {
    const a = preview.querySelector('.preview__link');
    if (preview.id === recipeId) {
      a.classList.add('preview__link--active');
      return;
    }
    a.classList.remove('preview__link--active');
  });
}

export function render(data, API_KEY) {
  Spinner(parentElement);
  if (!data.length) {
    parentElement.innerHTML = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div>
    `;
    return;
  }

  const html = data.reduce((accum, curItem) => {
    const { publisher, image_url, title, id, key } = curItem;
    const isActive = window.location.hash.slice(1) === id;
    const isUserCreated = key && key === API_KEY;

    const itemHtml = `
    <li class="preview" id=${id}>
        <a class="preview__link ${
          isActive ? 'preview__link--active' : ''
        }" href=${id}>
            <figure class="preview__fig">
                <img src=${image_url} alt=${title} />
            </figure>
            <div class="preview__data}">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
            </div>
            ${
              isUserCreated
                ? `<div class="preview__user-generated-active">
                        <svg>
                            <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>`
                : ''
            }
        </a>
    </li>
  `;

    return accum + itemHtml;
  }, '');

  parentElement.innerHTML = html;
}

// preview__link--active
/*
<div class="preview__user-generated">
    <svg>
        <use href="${icons}#icon-user"></use>
    </svg>
</div>
*/
