// =====================
// Theme Toggle
// =====================
const body = document.body;
const btnTheme = document.querySelector('#btn-theme');
const btnHamburger = document.querySelector('.fa-bars');

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

// =====================
// GitHub Projects Fetch
// =====================
const githubUsername = "vysh-afk"; // your GitHub username
const projectsContainer = document.getElementById("github-projects");

if(projectsContainer){
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      repos.slice(0, 6).forEach(repo => { // show latest 6 repos
        const projectCard = document.createElement("div");
        projectCard.className = "project";
        projectCard.innerHTML = `
          <h3>${repo.name.replace(/-/g, ' ')}</h3>
          <p class="project__description">
            ${repo.description ? repo.description : "No description available."}
          </p>
          <ul class="project__stack">
            <li class="project__stack-item">GitHub Repo</li>
          </ul>
          <a href="${repo.html_url}" class="link link--icon" target="_blank">
            <i class="fab fa-github"></i>
          </a>
        `;
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(err => {
      projectsContainer.innerHTML = "<p>Unable to load GitHub projects at this time.</p>";
      console.error("Failed to fetch GitHub repos:", err);
    });
}
