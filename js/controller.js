'use strict';

function initPage() {
  renderProjects();
}

function renderProjects() {
  var projects = getProjects();
  var strHTML = projects.map(function (project) {
    var labelStr = project.labels.map(function (label) {
      return `<span class="badge badge-info m-1">${label}</span>`
    }).join('');

    return `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal('${project.id}')">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" ">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.id}-thumbnail.png" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
          ${labelStr}
        </div>
        </div>`
  }).join('');
  document.querySelector('.my-projects').innerHTML = strHTML;
}

function renderModal(projId) {
  var project = getProjectById(projId);
  var date = new Date(project.publishedAt).toLocaleDateString()
  document.querySelector('.modal-name').innerText = project.name;
  document.querySelector('.modal-title').innerText = project.title;
  document.querySelector('.modal-img').src = `img/portfolio/${project.id}.png`;
  document.querySelector('.modal-description').innerText = project.desc;
  document.querySelector('.modal-date').innerText = date;
  document.querySelector('.project-btn').name = projId;
}

function openProject(id) {
  console.log(id)
  window.open(`proj/${id.name}/index.html`);
}

function onSubmit() {
  var email = 'My email is: ' + document.querySelector('.email input').value;
  var subject = document.querySelector('.subject input').value;
  var body = document.querySelector('textarea').value.split("\n").join('%0D%0A');   
  var strEmail = `https://mail.google.com/mail/?view=cm&fs=1&to=edenaran@gmail.com&su=${subject}&body=${body}%0D%0A${email}`;
  window.open(strEmail);
}