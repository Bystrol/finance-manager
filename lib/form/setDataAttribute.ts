export const setDataAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value) {
    e.target.setAttribute('data-input-active', '');
  } else {
    e.target.removeAttribute('data-input-active');
  }
};
