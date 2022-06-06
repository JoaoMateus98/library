const addBook = document.querySelector('#add-book');
const createBook = document.querySelector('#create-book');
const form = document.querySelector('.new-book-form');

let formData;
let title;
let author;
let numOfPages;

addBook.addEventListener('click', function () {
  form.classList.add('active-form');
});

createBook.addEventListener('click', function () {
  form.classList.remove('active-form');
  formData = new FormData(form);
  title = formData.get('title');
  author = formData.get('author');
  numOfPages = formData.get('pages');


  console.log(title, author, numOfPages);
  form.reset();
});