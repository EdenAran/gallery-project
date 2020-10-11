'use strict';

const PAGE_SIZE = 5;

var gBooks;
var gSortBy = "ID"
var gSortOrder = 1;
var gBookNames = ['The Golden Compass', 'The Hunger Games', 'JS for Dummies', 'American Gods']
var gCurrPage = 0;


function getBooksForDisplay() {
    var fromIdx = gCurrPage * PAGE_SIZE;
    sortBooks();
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
}

function getBooks() {
    return gBooks;
}

function getBookById(id) {
    var book = gBooks.find(function (book) {
        return book.id === id;
    })
    return book;
}

// function getBookIdxById(id) {
//     return gBooks.findIndex(function (book) {
//         return book.id === id;
//     })
// }

function addBook(name, price) {
    var book = _createBook(name, price);
    gBooks.push(book);
    saveToStorage('books', gBooks);
}

function removeBook(id) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === id;
    })
    if (bookIdx === -1) return;
    gBooks.splice(bookIdx, 1);
    saveToStorage('books', gBooks);
}

function updateBook(id, price) {
    var book = getBookById(id);
    book.price = price;
    saveToStorage('books', gBooks);
}

function setSortBy(sortBy) {
    if (gSortBy === sortBy) gSortOrder *= -1;
    else {
        gSortBy = sortBy;
        gSortOrder = 1;
    }
}

function sortBooks() {
    updateSortHeader();
    if (gSortBy === 'TITLE') gBooks.sort(function (book1, book2) {
        if (book1.name.toUpperCase() > book2.name.toUpperCase()) return 1 * gSortOrder;
        if (book1.name.toUpperCase() < book2.name.toUpperCase()) return -1 * gSortOrder;
        return 0;
    })
    else {
        var sort = (gSortBy === 'ID') ? 'id' : 'price';
        gBooks.sort(function (book1, book2) {
            return (book1[sort] - book2[sort]) * gSortOrder;
        })
    }
}

function updateSortHeader() {
    var sortBy = (gSortBy === 'TITLE') ? 'Title' : (gSortBy === 'ID') ? 'Id' : 'Price';
    document.querySelector('.sort-by span').innerText = sortBy;
}


function createBooks() {
    var books = loadFromStorage('books');
    if (!books || !books.length) {
        books = []
        gBookNames.forEach(function (name) {
            var price = getRandomIntInclusive(80, 200);
            books.push(_createBook(name, price))
        })
    }
    gBooks = books;
    saveToStorage('books', gBooks);
}

function rateBook(bookId, rating) {
    var book = getBookById(bookId);
    book.rating = rating;
    saveToStorage('books', gBooks);
}

function turnPage(diff) {
    if ((gCurrPage + 1) * PAGE_SIZE >= gBooks.length && diff > 0) gCurrPage = 0;
    else if (gCurrPage <= 0 && diff < 0) gCurrPage = getMaxPages();
    else gCurrPage += diff;
    updatePageNum();
}

function getPage() {
    return gCurrPage + 1;
}

function getMaxPages() {
    return Math.floor(gBooks.length / (PAGE_SIZE));
}

function _createBook(name, price) {
    var id = makeId();
    if (gBooks && gBooks.length) {
        while (getBookById(id)) {
            id = makeId();
        }
    }
    var imgUrl = (gBookNames.includes(name)) ? `img/${name}.png` : 'img/book.png'
    return {
        id,
        name,
        price,
        imgUrl,
        rating: 0
    }
}