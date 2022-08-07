import icons from '../../assets/icons.svg';

const parentElement = document.querySelector('.bookmarks__list');

export function addBookmarksListener(handler) {
  parentElement.addEventListener('click', event => {
    event.preventDefault();

    const recipeId = event.target.closest('li').id;
    handler(recipeId);
    // window.history.pushState(null, 'forkify', `/#${recipeId}`);
  });
}

export function renderActivePreview(recipeId) {
  const bookmarks = parentElement.querySelectorAll('.preview');
  [...bookmarks].forEach(preview => {
    const a = preview.querySelector('.preview__link');
    if (preview.id === recipeId) {
      a.classList.add('preview__link--active');
      return a;
    }
    a.classList.remove('preview__link--active');
  });
}

export function render(bookmarksArr, API_KEY) {
  const hashId = +window.location.hash.slice(1);

  let html = bookmarksArr.reduce((accum, curBookmark) => {
    const { id, publisher, title, image_url, key } = curBookmark;
    const isActive = hashId === id;
    const isUserCreated = key && key === API_KEY;

    return (
      accum +
      `
          <li class="preview" id="${id}">
              <a class="preview__link ${
                isActive ? 'preview__link--active' : ''
              }" href="${id}">
                <figure class="preview__fig">
                    <img src="${image_url}" alt="${title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">
                        ${title}
                    </h4>
                    <p class="preview__publisher">${publisher}</p>
                </div>
                <div class="preview__user-generated-${
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
              </a>
          </li>
          `
    );
  }, '');

  if (!html) {
    html = `
        <div class="message">
            <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
        </div>
                  `;
  }

  parentElement.innerHTML = '';
  parentElement.innerHTML = html;
}

/*
<svg>
    <use href="${icons}#icon-user"></use>
</svg>
*/
