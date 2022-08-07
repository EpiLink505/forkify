import icons from '../../assets/icons.svg';

const parentElement = document.querySelector('.pagination');

export function addPaginationListener(handler) {
  parentElement.addEventListener('click', event => {
    event.preventDefault();
    const curButton = event.target.closest('button');

    handler(curButton);
  });
}

export function render(curPageNum = 1, maxPages) {
  const leftButton =
    curPageNum === 1
      ? ''
      : `
          <button class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPageNum - 1}</span>
          </button>
    `;
  const rightButton =
    curPageNum >= maxPages
      ? ''
      : `
          <button class="btn--inline pagination__btn--next">
              <span>Page ${curPageNum + 1}</span>
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
    `;
  parentElement.innerHTML = `
        ${leftButton}
        ${rightButton}
    `;
}
