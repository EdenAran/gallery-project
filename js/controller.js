'use strict';

function initPage(){
    renderProjects();
}

function renderProjects() {
    var projects = getProjects();
    var strHTML = projects.map(function (project) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" data-id="${project.id}">
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
        </div>
        </div>`
    }).join('');
    document.querySelector('.my-projects').innerHTML = strHTML;
}




