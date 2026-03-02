// =====================
// Theme Toggle
// =====================
const body = document.body;
const btnTheme = document.querySelector('#btn-theme');

const addThemeClass = (bodyClass, btnClass) => {
  if(bodyClass) body.classList.add(bodyClass);
  if(btnClass) btnTheme.classList.add(btnClass);
}

const getBodyTheme = localStorage.getItem('portfolio-theme');
const getBtnTheme = localStorage.getItem('portfolio-btn-theme');

addThemeClass(getBodyTheme, getBtnTheme);

const isDark = () => body.classList.contains('dark');

const setTheme = (bodyClass, btnClass) => {
  body.classList.remove(localStorage.getItem('portfolio-theme'));
  btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'));

  addThemeClass(bodyClass, btnClass);

  localStorage.setItem('portfolio-theme', bodyClass);
  localStorage.setItem('portfolio-btn-theme', btnClass);
}

const toggleTheme = () => {
  isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun');
}

btnTheme.addEventListener('click', toggleTheme);

// =====================
// Hamburger Menu
// =====================
const btnHamburger = document.querySelector('.fa-bars');

const displayList = () => {
  const navUl = document.querySelector('.nav__list');

  if (btnHamburger.classList.contains('fa-bars')) {
    btnHamburger.classList.remove('fa-bars');
    btnHamburger.classList.add('fa-times');
    navUl.classList.add('display-nav-list');
  } else {
    btnHamburger.classList.remove('fa-times');
    btnHamburger.classList.add('fa-bars');
    navUl.classList.remove('display-nav-list');
  }
}

if(btnHamburger) btnHamburger.addEventListener('click', displayList);

// =====================
// Scroll Up Button
// =====================
const scrollUp = () => {
  const btnScrollTop = document.querySelector('.scroll-top');

  if (
    body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    if(btnScrollTop) btnScrollTop.style.display = 'block';
  } else {
    if(btnScrollTop) btnScrollTop.style.display = 'none';
  }
}

document.addEventListener('scroll', scrollUp);
