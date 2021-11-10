import './sass/main.scss';


const subMenuBtn = document.querySelector('#sub-menu-btn');
const subMenuList = document.querySelector('.sub-menu-list');
const bottomSvg = document.querySelector('.bottom');
const topSvg = document.querySelector('.top');
const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const navRef = document.querySelector('.navigation');


subMenuBtn.addEventListener('click', onSubMenuClick);

function changeMenuOnBurger() {
  if (window.innerWidth < 1366) {
    burgerBtn.addEventListener('click', onOpenBurger);
    closeBtn.addEventListener('click', onBurgerClose);
    burgerBtn.style.display = 'block';
    closeBtn.style.display = 'block';
   }
}
function changeMenuOnBurger()


function onSubMenuClick() {
  if (subMenuList.classList.contains('is-hidden')) {
    subMenuList.classList.remove('is-hidden');
    bottomSvg.classList.add('is-hidden');
    topSvg.classList.remove('is-hidden')
  } else {
    subMenuList.classList.add('is-hidden');
    topSvg.classList.add('is-hidden');
    bottomSvg.classList.remove('is-hidden')
  }
  
}


function onOpenBurger(event) {
  
    navRef.classList.remove('is-hidden');
    burgerBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    closeBtn.addEventListener('click', onBurgerClose);
  
}

function onBurgerClose(event) {
  
    navRef.classList.add('is-hidden');
    burgerBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    closeBtn.removeEventListener('click', onBurgerClose);
  
}


