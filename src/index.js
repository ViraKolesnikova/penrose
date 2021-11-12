import './sass/main.scss';
import template from './template/dataMarkUp.hbs';
import refs from './js/refs.js'

const {
  subMenuBtn,
  subMenuMobileBtn,
  subMenuList,
  subMenuMobileList,
  bottomSvg,
  topSvg,
  mobileBottomSvg,
  mobileTopSvg,
  burgerBtn,
  closeBtn,
  mobileNavRef,
  sliderContent,
  prevBtn,
  nextBtn,
  dotsContainer,
} = refs



subMenuBtn.addEventListener('click', onSubMenuClick);
document.addEventListener('click', onDocumentCloseSubmenu);
burgerBtn.addEventListener('click', onMobileMenuOpen);
closeBtn.addEventListener('click', onMobileMenuClose);
mobileNavRef.addEventListener('click', onCloseMenuByLinkClick)


fetchData();

  
function onMobileMenuOpen() {
  mobileNavRef.classList.toggle('is-open');
  activateMobileSubMenu();
}

function onMobileMenuClose() {
  mobileNavRef.classList.toggle('is-open');
  activateMobileSubMenu();
}


function activateMobileSubMenu() {
  if (mobileNavRef.classList.contains('is-open')) {
    subMenuMobileBtn.addEventListener('click', onMobileSubMenuClick);
  } else{subMenuMobileBtn.removeEventListener('click', onMobileSubMenuClick)}
  
}


function onSubMenuClick() {
  subMenuList.classList.contains('is-hidden') ? openSubmenu(subMenuList,bottomSvg,topSvg) : closeSubMenu(subMenuList,bottomSvg,topSvg);  
}

function onMobileSubMenuClick(event) {
  subMenuMobileList.classList.contains('is-hidden') ? openSubmenu(subMenuMobileList,mobileBottomSvg, mobileTopSvg) : closeSubMenu(subMenuMobileList,mobileBottomSvg, mobileTopSvg);  
}

function openSubmenu(list, bottom, top) {
  list.classList.remove('is-hidden');
  bottom.classList.add('is-hidden');
  top.classList.remove('is-hidden');  
}

function closeSubMenu(list, bottom, top) {
  list.classList.add('is-hidden');
  top.classList.add('is-hidden');
  bottom.classList.remove('is-hidden');  
}

function onDocumentCloseSubmenu(event) {
  if (!subMenuList.classList.contains('is-hidden') && event.target!==subMenuBtn) {
    closeSubMenu(subMenuList,bottomSvg,topSvg);
  } else if (!subMenuMobileList.classList.contains('is-hidden') && event.target!==subMenuMobileBtn) {
    closeSubMenu(subMenuMobileList, mobileBottomSvg, mobileTopSvg);
    onMobileMenuClose();
  }
}

function onCloseMenuByLinkClick(event) {
  if (event.target.nodeName==='A') {
    onMobileMenuClose();
  }
}

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



async function appendDots(data) {
  const dotsAmount = await data.length;
  for (let i = 0; i < dotsAmount; i += 1){
    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    a.setAttribute('href', '#');
    span.classList.add('dot');
    li.classList.add('dots-item');
    a.appendChild(span);
    li.appendChild(a);    
    dotsContainer.append(li);
  }
}  
