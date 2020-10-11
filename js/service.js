'use strict';

var gProjects = [

    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Minesweeper with some upgrades',
        desc: 'A little different minesweeper game with some more utilities I added.',
        url: './proj/minesweeper',
        publishedAt: 1589993942000,
        labels: []
    },
    {
        id: 'book-shop',
        name: 'Book Shop',
        title: 'Online book shop',
        desc: 'A demo version of my online book shop.',
        url: './proj/book-shop',
        publishedAt: 1587993942000,
        labels: []
    },
    {
        id: 'proj-todos',
        name: 'Todo Project',
        title: 'An online todo list',
        desc: 'I made an online todo list for easy tracking of your todos.',
        url: './proj/proj-todos',
        publishedAt: 1584693942000,
        labels: []
    },
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'My very own pacman',
        desc: 'My take on the pacman game, was made as a project for the class.',
        url: './proj/pacman',
        publishedAt: 1588693942000,
        labels: ['Matrix', 'Board', 'Game']
    },
    {
        id: 'safe-content',
        name: 'Safe Content',
        title: 'A site with some content that is hidden',
        desc: 'In this site we have some hidden content with access only to the registered users and also an Admin page.',
        url: './proj/safe-content',
        publishedAt: 1588993942000,
        labels: []
    },
    {
        id: 'chess',
        name: 'Chess',
        title: 'A demo chess game',
        desc: 'A demo version of a chess game, not fully functioning.',
        url: './proj/chess',
        publishedAt: 1586909394200,
        labels: []
    }
];

function getProjects() {
    return gProjects;
}

function getProjectById(id) {
    return gProjects.find(function (project) {
        return project.id === id;
    })
}