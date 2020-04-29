let myLibrary = [];

// var firebaseConfig = {
//     apiKey: "AIzaSyD-YslEN-Fso8dJtmCj2U8I9DE1P7pEU7c",
//     authDomain: "library-93c21.firebaseapp.com",
//     databaseURL: "https://library-93c21.firebaseio.com",
//     projectId: "library-93c21",
//     storageBucket: "library-93c21.appspot.com",
//     messagingSenderId: "784844984170",
//     appId: "1:784844984170:web:270cbc7f42d2d759c31f13"
// };

function Book(title, author, numPages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = numPages;
    this.read = read;
    this.index = index;

    this.info = function() {
        return this.title + ' by ' + this.author + 
        ', ' + this.pages + ' pages, ' + this.hasRead();
    }
    this.shelve = function() {
        return JSON.stringify(this);
    }
}

Book.prototype.hasRead = function() {
    return this.read ? 'Already read' : 'Not read'
}

Book.prototype.toggleRead = function() {
    if (this.read) this.read = false;
    else this.read = true;
}

initializeFillerData();
render();
// storeLibrary();
retrieveLibrary();

function retrieveLibrary() {
    firebase.database().ref('books/').once('value', (snap) => {
        snap.forEach((child) => {
            // some sort of manipulation of the array
            console.log(child.key + ', ' + child.val());
        })
    });
}
function storeLibrary() {
    myLibrary.forEach((book) => {
        firebase.database().ref('books/'+book.title).set(book.shelve());
    });
}

const newBookButton = document.querySelector('.new-button');
newBookButton.addEventListener('click', () => {
    const formDiv = document.querySelector('.form-div');
    formDiv.style.display = 'block';
});

const addBookButton = document.querySelector('.add-button');
addBookButton.addEventListener('click', () => {
    let title   = document.forms['book-form']['title'].value;
    let author  = document.forms['book-form']['author'].value;
    let pages   = document.forms['book-form']['pages'].value;
    let read    = document.forms['book-form']['read'].value;
    if (validateForm(title, author, pages, read)) {
        addBookToLibrary(title, author, pages, read);
        render();
        clearForm();
    }
});

function validateForm(title, author, pages, read) {
    console.log(pages);
    if (title === '') {
        alert('Please enter a title');
        return false
    } else if (author === '') {
        alert('Please enter an author');
        return false;
    } else if (pages <= 0 || pages === '') {
        alert('Please enter a valid page count');
        return false;
    } else if (read === '') {
        alert('Please enter if book has been read');
        return false;
    }
    else return true;
}

function clearForm() {
    const formDiv = document.querySelector('.form-div');
    formDiv.style.display = 'None';
    document.forms['book-form']['title'].value = '';
    document.forms['book-form']['author'].value = '';
    document.forms['book-form']['pages'].value = '';
    document.forms['book-form']['read'].value = '';
}

function deleteBook() {
    console.log(this.id);
    myLibrary.splice(this.id, 1);
    console.log(myLibrary);
    render();
}

function addBookToLibrary(title, author, pages, read) {
    let index = myLibrary.length;
    let book = new Book(title, author, pages, read, index);
    myLibrary.push(book);
}

function render() {
    let library = document.querySelector('.library');
    library.innerHTML = ''; // uncomment to remove test css
    for (let i=0; i<myLibrary.length; i++) {
        console.log(myLibrary[i].info());
        let bookTab = document.createElement('div');
        let bookTitle = document.createElement('label');
        let bookAuthor = document.createElement('label');
        let bookPages = document.createElement('label');
        let bookRead = document.createElement('label');
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        bookTab.classList.add('book');
        bookTitle.classList.add('book-label', 'title-label');
        bookAuthor.classList.add('book-label', 'author-label');
        bookPages.classList.add('book-label', 'pages-label');
        bookRead.textContent = myLibrary[i].hasRead();
        bookRead.classList.add('book-label', 'read-label');

        bookTab.appendChild(bookTitle);
        bookTab.appendChild(bookAuthor);
        bookTab.appendChild(bookPages);

        let optionTab = document.createElement('div');
        optionTab.classList.add('options-div');
        
        let deleteButton = document.createElement('button');
        let toggleButton = document.createElement('button');
        deleteButton.classList.add('option-button');
        toggleButton.classList.add('option-button');

        deleteButton.textContent = 'Delete';
        deleteButton.id = ''+i;
        toggleButton.textContent = 'Toggle';

        deleteButton.addEventListener('click', deleteBook);
        toggleButton.addEventListener('click', () => {
            myLibrary[i].toggleRead();
            bookRead.textContent = myLibrary[i].hasRead();
        });

        // optionTab.appendChild(bookRead);
        optionTab.appendChild(deleteButton);
        optionTab.appendChild(toggleButton);

        let spacingTab = document.createElement('div');
        spacingTab.classList.add('spacing-div');

        bookTab.appendChild(spacingTab);
        bookTab.appendChild(bookRead);
        bookTab.appendChild(optionTab);
        library.appendChild(bookTab);

    }

}

function initializeFillerData() {
    addBookToLibrary('The Gun Slinger', 'Stephen King', 300, true);
    addBookToLibrary('Dune', 'Frank Herbert', 412, true);
    addBookToLibrary('A New Hope', 'George Lucas', 321, false);
    addBookToLibrary('Dead Sky, Black Sun', 'Graham McNeill', 250, true);
    addBookToLibrary('Catcher in the Rye', 'J. D. Salinger', 277, false);
    addBookToLibrary('The Dark Crystal', 'Jim Henson Frank Oz', 423, true);
}

