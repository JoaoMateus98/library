const addBook = document.querySelector('#add-book');
const createBook = document.querySelector('#create-book');
const form = document.querySelector('.new-book-form');
const bookContainer = document.querySelector('.book-container');

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
  wasRead = formData.get('was-read');

  wasRead = getWasReadValue(wasRead);

  console.log(wasRead);

  addBookToLibrary(title, author, numOfPages, wasRead);

  form.reset();
});

function getWasReadValue(wasRead) {
  let read = (wasRead == 'on') ? 'was read' : 'was not read';
  return read;
}

function addBookToLibrary(title, author, numOfPages, wasRead) {
  const newBook = new Book(title, author, numOfPages, wasRead);
  const newBookDiv = newBook.createDiv();

  library.push(newBookDiv);
  updateDisplay();
}

function Book(title, author, numOfPages, wasRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.wasRead = wasRead;
  this.id = '';
}

Book.prototype.createDiv = function() {
  const newBookDiv = document.createElement('div');
  const titleElement = document.createElement('p');
  const authorElement = document.createElement('p');
  const numOfPagesElement = document.createElement('p');
  const wasReadButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  titleElement.innerHTML = this.title;
  authorElement.innerHTML = this.author;
  numOfPagesElement.innerHTML = this.numOfPages;
  wasReadButton.innerHTML = this.wasRead;
  deleteButton.innerHTML = 'Delete';

  wasReadButton.addEventListener('click', (e) => {
    this.id = e.path[1].id;
    wasReadButton.setAttribute('id', `was-read-${this.id}`);
    this.id = `was-read-${this.id}`;
    this.updateWasRead(this.id);
  });

  deleteButton.addEventListener('click', (e) => {
    let index = e.path[1].id;
    deleteBook(index);
  });

  newBookDiv.append(titleElement, authorElement, numOfPagesElement, wasReadButton, deleteButton);
  
  return newBookDiv;
}

Book.prototype.updateWasRead = function(id) {
  const currentWasReadButton = document.getElementById(id);
  this.wasRead = (this.wasRead === 'was read') ? 'was not read' : 'was read';
  currentWasReadButton.innerHTML = this.wasRead;
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