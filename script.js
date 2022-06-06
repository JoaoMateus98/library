let myLibrary = [];

function Book(author, title, numOfPages, wasRead) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.wasRead = wasRead;
}

Book.prototype.sayRead = function() {
    (this.wasRead === 'true') ? console.log('was read') : console.log('was not read');
}

function addBookToLibrary() {
  const author = window.prompt('Enter authors name');
  const title = window.prompt('Enter book title');
  const numOfPages = window.prompt('Enter number of pages');
  const wasRead = window.prompt('Have you read the book? true or false');

  const newBook = Object.create(Book.prototype);
  newBook.author = author;
  newBook.title = title;
  newBook.numOfPages = numOfPages;
  newBook.wasRead = wasRead;
  myLibrary.push(newBook);
}