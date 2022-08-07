import icons from '../../../../assets/icons.svg';

function Spinner(parentElement) {
  const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

  parentElement.innerHTML = html;
}

export default Spinner;
