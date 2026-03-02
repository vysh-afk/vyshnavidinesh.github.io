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

btnTheme.addEventListener('click', () => {
  isDark() ? setTheme('light','fa-moon') : setTheme('dark','fa-sun');
});

// =====================
// Typing Effect
// =====================
const typeWriter = (elementId, text, speed = 100, callback) => {
  const element = document.getElementById(elementId);
  let i = 0;
  const timer = setInterval(() => {
    if(i < text.length){
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      if(callback) callback();
    }
  }, speed);
}

typeWriter("typing-name", "Hi, I am Vyshnavi Dinesh.", 100, () => {
  typeWriter("typing-role", "Artificial Intelligence Student | Embedded Systems Minor", 60);
});

// =====================
// GitHub Projects Fetch
// =====================
const githubUsername = "vysh-afk";
const projectsContainer = document.getElementById("github-projects");

if(projectsContainer){
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
      repos.slice(0,6).forEach(repo => {
        const projectCard = document.createElement("div");
        projectCard.className = "project";
        projectCard.innerHTML = `
          <h3>${repo.name.replace(/-/g,' ')}</h3>
          <p class="project__description">${repo.description || "No description available."}</p>
          <ul class="project__stack">
            <li class="project__stack-item">GitHub Repo</li>
          </ul>
          <a href="${repo.html_url}" class="link link--icon" target="_blank"><i class="fab fa-github"></i></a>
        `;
        projectsContainer.appendChild(projectCard);
      });
    })
    .catch(err => {
      projectsContainer.innerHTML = "<p>Unable to load GitHub projects at this time.</p>";
      console.error(err);
    });
}
