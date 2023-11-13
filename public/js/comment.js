document
  .querySelector('.comments-content button')
  .addEventListener('click', () => {
    document.querySelector('.comments-content').classList.add('hide');
    document.querySelector('.comments-form-wrapper').classList.remove('hide');
  });
