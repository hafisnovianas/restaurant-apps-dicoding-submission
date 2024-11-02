const drawer = () => {
  const menu = document.querySelector('#menu')
  const hero = document.querySelector('.hero')
  const main = document.querySelector('main')
  const drawer = document.querySelector('#drawer')

  menu.addEventListener('click', event => {
    drawer.classList.toggle('open');
    event.stopPropagation();
  });

  hero.addEventListener('click', () => {
    drawer.classList.remove('open');
  });

  main.addEventListener('click', () => {
    drawer.classList.remove('open');
  });
}

export default drawer;

