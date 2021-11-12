import './sass/main.scss';
import template from './template/dataMarkUp.hbs';
import refs from './js/refs.js'

const{subMenuBtn, subMenuList, bottomSvg, topSvg, burgerBtn , closeBtn,navRef, mobileNavRef, sliderContent, prevBtn, nextBtn, dotsContainer}=refs



subMenuBtn.addEventListener('click', onSubMenuClick);
document.addEventListener('click', onDocumentCloseSubmenu);

burgerBtn.addEventListener('click', () => {
  mobileNavRef.classList.toggle('is-open')
});

closeBtn.addEventListener('click', () => {
  mobileNavRef.classList.toggle('is-open')
})


function onSubMenuClick() {
  subMenuList.classList.contains('is-hidden') ? openSubmenu() : closeSubMenu();
  
}

function openSubmenu() {
  subMenuList.classList.remove('is-hidden');
  bottomSvg.classList.add('is-hidden');
  topSvg.classList.remove('is-hidden');  
}

function closeSubMenu() {
  subMenuList.classList.add('is-hidden');
  topSvg.classList.add('is-hidden');
  bottomSvg.classList.remove('is-hidden');  
}

fetchData()

async function fetchData() {
  const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
  const result = response.json();
  const filteredData = await filtrDataByPrice(result);
  renderMarkUp(filteredData);
  appendDots(filteredData);
}


async function filtrDataByPrice(data) {
  const dataArr = await data;
  return dataArr.filter(item => item.price < 5);
}

async function renderMarkUp(data) {
  const markUp = await template(data);
  sliderContent.innerHTML = markUp;
}

function onDocumentCloseSubmenu(event) {
  if (!subMenuList.classList.contains('is-hidden') && event.target!==subMenuBtn) {
    closeSubMenu();
  } 
}

async function appendDots(data) {
  const dotsAmount = await data.length;
  for (let i = 1; i < dotsAmount; i += 1){
    const item = document.createElement('li');
    const a = document.createElement('a');
    const span = document.querySelector('span');
    
    '<li><a href="#"><span class="dot"></span></a></li>';
  }
  dotsContainer.append
}  
