const addBook = document.querySelector('#add-book');
const createBook = document.querySelector('#create-book');
const form = document.querySelector('.new-book-form');
const bookContainer = document.querySelector('.book-container');

let deleteButtons = [];
let formData;
let title;
let author;
let numOfPages;

let library = [];

addBook.addEventListener('click', function () {
  form.classList.add('active-form');
});

createBook.addEventListener('click', function () {
  form.classList.remove('active-form');
  formData = new FormData(form);
  title = formData.get('title');
  author = formData.get('author');
  numOfPages = formData.get('pages');

  addBookToLibrary(title, author, numOfPages);

  form.reset();
});

function addBookToLibrary(title, author, numOfPages) {
  const newBook = new Book(title, author, numOfPages);
  const newBookDiv = newBook.createDiv();

  library.push(newBookDiv);
  updateDisplay();
}

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages
}

Book.prototype.createDiv = function() {
  const newBookDiv = document.createElement('div');
  const titleElement = document.createElement('p');
  const authorElement = document.createElement('p');
  const numOfPagesElement = document.createElement('p');
  const deleteButton = document.createElement('button');

  titleElement.innerHTML = this.title;
  authorElement.innerHTML = this.author;
  numOfPagesElement.innerHTML = this.numOfPages;
  deleteButton.innerHTML = 'Delete';

  deleteButton.addEventListener('click', (e) => {
    let index = e.path[1].id;
    deleteBook(index);
  })

  newBookDiv.append(titleElement, authorElement, numOfPagesElement, deleteButton);
  
  return newBookDiv;
}

function updateDisplay() {
  removeAllChildrenNodes(bookContainer);
  library.forEach((book) => {
    let index = library.indexOf(book).toString();
    book.setAttribute('id', index);
    bookContainer.appendChild(book);
  });
}

function removeAllChildrenNodes(parent) {
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function deleteBook(index) {
  index = parseInt(index);
  library.splice(index, 1);
  updateDisplay();
}