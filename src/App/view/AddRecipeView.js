const addRecipeContainer = document.querySelector('.nav__btn--add-recipe');
const modal = document.querySelector('.add-recipe-window');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.btn--close-modal');
const form = document.querySelector('.upload');

export function addRecipeListeners(handler) {
  addRecipeContainer.addEventListener('click', () => {
    showModal();
  });
  overlay.addEventListener('click', () => {
    removeModal();
  });
  closeModalButton.addEventListener('click', () => {
    removeModal();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();

    const data = [...new FormData(form)];
    handler(data);
  });
}

export function removeModal() {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
}

export function showModal() {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}

export function render() {}
