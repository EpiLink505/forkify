const parentElement = document.querySelector('.search');
const inputField = document.querySelector('.search__field');

export function addSearchListener(handler) {
  parentElement.addEventListener('submit', event => {
    event.preventDefault();

    handler(inputField.value);
    inputField.value = '';
  });
}
