import icons from '../../assets/icons.svg';
import Spinner from './shared/Spinner/Spinner';

const parentElement = document.querySelector('.recipe');

export function renderSpinner() {
  Spinner(parentElement);
}

export function addOnLoadListener(handler) {
  window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) handler(hash.slice(1));
  });
}

export function addRecipeBookmarkListener(handler) {
  parentElement.addEventListener('click', event => {
    const btn = event.target
      .closest('button')
      ?.classList.contains('btn--round');
    if (!btn) return;
    handler();
  });
}

export function addServingsListener(handler) {
  parentElement.addEventListener('click', event => {
    const curButton = event.target.closest('button');
    if (curButton?.className.includes('btn--decrease-servings')) {
      handler(-1);
    }
    if (curButton?.className.includes('btn--increase-servings')) {
      handler(1);
    }
  });
}

export function toggleBookmark() {
  const bookmarkButton = document.querySelector('.btn--round');

  if (bookmarkButton.dataset.isActive === 'true') {
    bookmarkButton.dataset.isActive = 'false';
    bookmarkButton.innerHTML = `<svg class="">
        <use id="bookmark" href="${icons}#icon-bookmark"></use>
    </svg>
    `;
  } else {
    bookmarkButton.dataset.isActive = 'true';
    bookmarkButton.innerHTML = `<svg class="">
        <use id="bookmark" href="${icons}#icon-bookmark-fill"></use>
    </svg>
    `;
  }
}

export function render(recipeData, API_KEY) {
  const {
    id,
    title,
    publisher,
    source_url,
    image_url,
    servings,
    cooking_time,
    ingredients,
    key,
  } = recipeData;

  const ingredientsHTML = renderIngredients(ingredients, servings);
  const isBookmarked = checkRecipeIsBookmarked(id);
  const isUserCreated = key && key === API_KEY;

  const recipeHTML = `
  <figure class="recipe__fig">
    <img src="${image_url}" alt="${title}" class="recipe__img" />
    <h1 class="recipe__title" id=${id}>
      <span>${title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${cooking_time}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated-${
      isUserCreated ? 'active' : 'inactive'
    }">
      ${
        isUserCreated
          ? `<svg>
                <use href="${icons}#icon-user"></use>
            </svg>`
          : ''
      }
    </div>
    <button class="btn--round" data-is-active="${
      isBookmarked ? 'true' : 'false'
    }">
      <svg class="">

          <use id="bookmark" href="${icons}#icon-bookmark${
    isBookmarked ? '-fill' : ''
  }"></use>
      </svg>
    </button>
  </div>

  ${ingredientsHTML}

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${source_url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

  parentElement.innerHTML = recipeHTML;
}
/*
<div class="recipe__user-generated">
  <svg>
      <use href="${icons}#icon-user"></use>
  </svg>
</div>
*/

function renderIngredients(ingredientsArr, servings) {
  const htmlIngredients = ingredientsArr.reduce((accum, curIng) => {
    const { quantity, unit, description } = curIng;

    return (
      accum +
      `<li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            ${
              quantity
                ? `<div class="recipe__quantity">${quantity * servings}</div>`
                : ''
            }
            <div class="recipe__description">
            ${quantity ? `<span class="recipe__unit">${unit}</span>` : ''}
            ${description}
            </div>
        </li>`
    );
  }, ``);

  const html = `
    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
            ${htmlIngredients}
        </ul>
    </div>
    `;

  return html;
}

function checkRecipeIsBookmarked(curRecipeId) {
  const bookmarks = document.querySelector('.bookmarks__list').children;
  const curBookmarkIds = [...bookmarks].map(li => li.id);
  return curBookmarkIds.includes(curRecipeId);
}
