import './sass/main.scss';

const subMenuBtn = document.querySelector('#sub-menu-btn');
const subMenuList = document.querySelector('.sub-menu-list');
const bottomSvg = document.querySelector('.bottom');
const topSvg = document.querySelector('.top');
const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const mobileNavRef = document.querySelector('.navigation-mobile');

subMenuBtn.addEventListener('click', onSubMenuClick);

burgerBtn.addEventListener('click', () => {
  mobileNavRef.classList.toggle('is-open')
});

closeBtn.addEventListener('click', () => {
  mobileNavRef.classList.toggle('is-open')
})





function onSubMenuClick() {
  if (subMenuList.classList.contains('is-hidden')) {
    subMenuList.classList.remove('is-hidden');
    bottomSvg.classList.add('is-hidden');
    topSvg.classList.remove('is-hidden');
  } else {
    subMenuList.classList.add('is-hidden');
    topSvg.classList.add('is-hidden');
    bottomSvg.classList.remove('is-hidden');
  }
}


