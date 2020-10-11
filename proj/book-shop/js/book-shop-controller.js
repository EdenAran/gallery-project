'use strict';

function init() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay(); 
    var strHTML = books.map(function (book) {
        return `
        <div class="book">
        <div class="box id">${book.id}</div>
        <div class="box title">${book.name}</div>
        <div class="box price price${book.id}">${book.price}$</div>
        <div class="box actions">
            <button onclick="onReadBook(this.name)" name="${book.id}">Read</button>
            <button onclick="onUpdateBook(this.name)" name="${book.id}" class="update-btn${book.id}">Update</button>
            <button onclick="onSetPrice(this.name)" name="${book.id}" class="set-btn${book.id}" hidden>Set Price</button>
            <button onclick="onDeleteBook(this.name)" name="${book.id}">Delete</button>
        </div>
    </div>`
    })
    document.querySelector('.books').innerHTML = strHTML.join('');
}


function onNewBook() {
    var name = document.querySelector('.new-name').value;
    var price = document.querySelector('.new-price').value;
    document.querySelector('.new-name').value = '';
    document.querySelector('.new-price').value = '';
    if(!name || !price) return;
    addBook(name, price);
    renderBooks();
}


function onReadBook(id) {
    var book = getBookById(id);
    document.querySelector('.book-details').hidden = false;
    document.querySelector('.book-details h2').innerText = book.name;
    document.querySelector('.book-details p').innerHTML = `<img src="${book.imgUrl}" class="book-img">`;
    document.querySelector('.book-details input').value = book.rating;
    document.querySelector('.book-details input').name = book.id;
}

function onUpdateBook(id) {
    document.querySelector(`.price${id}`).innerHTML = '<input type="text" class="price" value="0">'
    document.querySelector(`.update-btn${id}`).hidden = true;
    document.querySelector(`.set-btn${id}`).hidden = false;
}

function onSetPrice(id){
    var price = document.querySelector(`.price${id} input`).value;
    if(!price) return;
    document.querySelector(`.update-btn${id}`).hidden = false;
    document.querySelector(`.set-btn${id}`).hidden = true;
    updateBook(id, price);
    renderBooks();
}

function onDeleteBook(id) {
    removeBook(id);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.book-details').hidden = true;
}

function onRateBook(isPlus) {
    if (isPlus) document.querySelector('.book-details input').stepUp(1);
    else document.querySelector('.book-details input').stepDown(1);
    var bookId = document.querySelector('.book-details input').name;
    var rating = document.querySelector('.book-details input').value;
    rateBook(bookId, rating)
    // ALWAYS UPDATE IN THE SERVICE
}

function onSort(sortBy){
    setSortBy(sortBy);
    renderBooks();
}

function onTurnPage(diff){
    turnPage(diff);
    renderBooks();
}

function updatePageNum(){
    document.querySelector('.page-num').innerText = getPage();
}