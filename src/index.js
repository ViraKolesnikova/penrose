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



// ============Event Listeners===================
subMenuBtn.addEventListener('click', onSubMenuClick);
burgerBtn.addEventListener('click', onMobileMenuOpen);

mobileNavRef.addEventListener('click', onCloseMenuByLinkClick);
nextBtn.addEventListener('click', onNextBtnClick);
// =============================================

fetchData();

//========== MOBILE MENU FUNCTIONS =================
function onMobileMenuOpen() {
  mobileNavRef.classList.toggle('is-open');
  activateMobileSubMenu();
  burgerBtn.removeEventListener('click', onMobileMenuOpen);
  closeBtn.addEventListener('click', onMobileMenuClose);
}

function onMobileMenuClose() {
  mobileNavRef.classList.toggle('is-open');
  activateMobileSubMenu();
  burgerBtn.addEventListener('click', onMobileMenuOpen);  
}

function activateMobileSubMenu() {
  if (mobileNavRef.classList.contains('is-open')) {
    subMenuMobileBtn.addEventListener('click', onMobileSubMenuClick);
  } else{subMenuMobileBtn.removeEventListener('click', onMobileSubMenuClick)}  
}

function onCloseMenuByLinkClick(event) {
  if (event.target.nodeName==='A') {
    onMobileMenuClose();
  }  
}

// =============================================

// ============SUBMENU FUNCTIONS================
function onMobileSubMenuClick(event) {
  subMenuMobileList.classList.contains('is-hidden') ?
    openSubmenu(subMenuMobileList, mobileBottomSvg, mobileTopSvg) :
    closeSubMenu(subMenuMobileList, mobileBottomSvg, mobileTopSvg);
}

function onSubMenuClick() {
  subMenuList.classList.contains('is-hidden') ?
    openSubmenu(subMenuList, bottomSvg, topSvg) :
    closeSubMenu(subMenuList, bottomSvg, topSvg);
}

function openSubmenu(list, bottom, top) {
  list.classList.remove('is-hidden');
  bottom.classList.add('is-hidden');
  top.classList.remove('is-hidden');
  document.addEventListener('click', onDocumentCloseSubmenu);
}

function closeSubMenu(list, bottom, top) {
  list.classList.add('is-hidden');
  top.classList.add('is-hidden');
  bottom.classList.remove('is-hidden');
  document.removeEventListener('click', onDocumentCloseSubmenu);
  
}

function onDocumentCloseSubmenu(event) {
  if (!subMenuList.classList.contains('is-hidden') && event.target!==subMenuBtn) {
    closeSubMenu(subMenuList,bottomSvg,topSvg);
  } else if (!subMenuMobileList.classList.contains('is-hidden') && event.target!==subMenuMobileBtn) {
    closeSubMenu(subMenuMobileList, mobileBottomSvg, mobileTopSvg);
    onMobileMenuClose();
  }
}
// =============================================

// ============FETCH DATA================

async function fetchData() {
  const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline');
  const result = await response.json();
  const filteredData = await filtrDataByPrice(result);
  renderMarkUp(filteredData);
  appendDots(filteredData);
  
}

async function filtrDataByPrice(data) {
  const dataArr = await data;
  return dataArr.filter(item => item.price < 5);
}
// =============================================

// ============RENDER MARKUP================
async function renderMarkUp(data) {
  const markUp = await template(data);
  sliderContent.innerHTML = markUp;
  const arr = await addEventListenerForSlider();
  arr[0].classList.add('is-open');
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
  const arr = await addEventListenerForDots();
  arr[0].classList.add('is-active');
}
// =============================================

// ============SLIDER FUNCTIONS================
async function addEventListenerForSlider() {
  return document.querySelectorAll('.slide');   
}

async function addEventListenerForDots() {
  return document.querySelectorAll('.dot');   
}

async function onPrevBtnClick() {
 const slides = await addEventListenerForSlider();
  const dots = await addEventListenerForDots();
  showArrow(nextBtn);
  nextBtn.addEventListener('click', onNextBtnClick);
  let index = recordCurrentSlideIndex(slides);
  moveSlideLeft(slides, dots, index);

  if(index === 1) {
    prevBtn.classList.add('is-hidden');
    prevBtn.removeEventListener('click', onPrevBtnClick);
  }  
}

async function onNextBtnClick(event) {
  const slides = await addEventListenerForSlider();
  const dots = await addEventListenerForDots();
  showArrow(prevBtn);
  prevBtn.addEventListener('click', onPrevBtnClick);
  let index = recordCurrentSlideIndex(slides);
  moveSlideRight(slides,dots, index);
  
  if(index === slides.length - 2) {
    nextBtn.classList.add('is-hidden');
    nextBtn.removeEventListener('click', onNextBtnClick);
  }  
}

function showArrow(button) {
  if (button.classList.contains('is-hidden')) {
    button.classList.remove('is-hidden');
  }
}

function recordCurrentSlideIndex(array) {
  for (let i = 0; i < array.length; i += 1){
    if (array[i].classList.contains('is-open')) {
      return i;
    }
  }
}

function moveSlideRight(array,dotsArr, index) {
  array[index].classList.remove('is-open');
  dotsArr[index].classList.remove('is-active');
  if (index === array.length - 1) {    
    index = 0;
    array[index].classList.add('is-open');
    dotsArr[index].classList.add('is-active');
  } else {
    array[index + 1].classList.add('is-open');
    dotsArr[index+1].classList.add('is-active');
  }
}

function moveSlideLeft(array,dotsArr, index) {
  array[index].classList.remove('is-open');
  dotsArr[index].classList.remove('is-active');
  if (index === 0) {    
    index = array.length -1;
    array[index].classList.add('is-open');
    dotsArr[index].classList.add('is-active');
  } else {
    array[index - 1].classList.add('is-open');
    dotsArr[index-1].classList.add('is-active');
  }
}
// ================================================