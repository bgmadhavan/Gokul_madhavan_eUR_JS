let currentUser;
let books;
document.addEventListener('DOMContentLoaded' ,function(){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    books = {"fiction":['murder on orient express','things we do in the dark'], "non-fiction":['and then there where none']};
    displayUser();
    displayBooks();
    const genreRadios = document.querySelectorAll('input[name="options"]');
    genreRadios.forEach(radio => {
        radio.addEventListener('change', displayBooks);
    });
})

function displayUser(){
    //currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const details = document.getElementById('user-detail');

    const name = document.createElement('h2');
    name.textContent = `User : ${currentUser.username}`;

    const pass = document.createElement('h4');
    pass.textContent = `Mobile : ${currentUser.mobile}`;

    details.innerHTML = '';
    details.appendChild(name);
    details.appendChild(pass);

    if(currentUser.books.length !== 0){
        const ol = document.createElement('ol');
        for (let book of currentUser.books){
            const detail = document.createElement('li');
            detail.classList.add('bookelement');
            detail.textContent = book;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'return';
            removeBtn.addEventListener('click',()=> removeUserBook(book));

            detail.appendChild(removeBtn);
            ol.appendChild(detail);
            details.appendChild(ol);

        }
    }
    else{
        const ol = document.createElement('p');
        ol.textContent = "borrowed books will be displayed here";
        details.appendChild(ol);
    }



}

function displayBooks(){
    
    let selectedGenre = document.querySelector('input[name = "options"]:checked').value;
    let bookList = document.createElement('ul');
    for (let book of books[selectedGenre]){
        const bookElement = document.createElement('li');
        bookElement.classList.add('bookelement');
        bookElement.textContent = book;

        const borrowBtn = document.createElement('button');
        borrowBtn.textContent = 'borrow';
        borrowBtn.addEventListener('click',()=> borrowBook(book));

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.addEventListener('click',()=> removeListBook(book,selectedGenre));

        bookElement.appendChild(borrowBtn);
        bookElement.appendChild(removeBtn);
        bookList.appendChild(bookElement);
    } 
    const container = document.getElementById('booklist');
    container.innerHTML = '';
    container.appendChild(bookList);
}

function borrowBook(book){
    // let parent = event.target.parentElement;
    // let book = parent.textContent;
    if(!currentUser.books.find(x => x===book)){
        currentUser.books.push(book);
        displayUser();
    }
    else{
        alert('you have this book');
    }

}

function addBook(){
    const bookname = document.getElementById('bookname').value;
    const genre = document.getElementById('genre').value;

    books[genre].push(bookname);
    displayBooks();
}

function removeListBook(book,selectedGenre){
    let rm  = books[selectedGenre].indexOf(book);
    books[selectedGenre].splice(rm,1);
    displayBooks();
}

function removeUserBook(book){
    let rm = currentUser.books.indexOf(book);
    currentUser.books.splice(rm,1);
    displayUser();

}
