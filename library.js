let myLibrary = [];

function Book(title, author, numPages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = numPages;
    this.read = read;
    this.index = index;

    this.info = function() {
        let hasRead = this.read ? 'Has already read' : 'Has not yet read';
        return this.title + ' by ' + this.author + 
        ', ' + this.pages + ' pages, ' + hasRead;
    }

    this.hasRead = function() {
        return this.read ? 'Has already read' : 'Has not yet read'
    }

    this.toggleRead = function() {
        if (this.read) this.read = false;
        else this.read = true;
        console.log(this.read);
    }
}


initializeFillerData();
render();

const addBookButton = document.querySelector('.add-button');
addBookButton.addEventListener('click', () => {
    let title   = document.forms['book-form']['title'].value;
    let author  = document.forms['book-form']['author'].value;
    let pages   = document.forms['book-form']['pages'].value;
    let read    = document.forms['book-form']['read'].value;
    console.log('read: ' + read);
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
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        bookTab.classList.add('book');
        bookTitle.classList.add('book-label', 'title-label');
        bookAuthor.classList.add('book-label', 'author-label');
        bookPages.classList.add('book-label', 'pages-label');
        console.log(myLibrary[i].pages);

        bookTab.appendChild(bookTitle);
        bookTab.appendChild(bookAuthor);
        bookTab.appendChild(bookPages);

        let optionTab = document.createElement('div');
        let bookRead = document.createElement('label');
        bookRead.textContent = myLibrary[i].hasRead();
        bookRead.classList.add('book-label');
        
        let deleteButton = document.createElement('button');
        let toggleButton = document.createElement('button');

        deleteButton.textContent = 'Delete';
        deleteButton.id = ''+i;
        toggleButton.textContent = 'Toggle';

        deleteButton.addEventListener('click', deleteBook);
        toggleButton.addEventListener('click', () => {
            myLibrary[i].toggleRead();
            bookRead.textContent = myLibrary[i].hasRead();
        });

        optionTab.appendChild(bookRead);
        optionTab.appendChild(deleteButton);
        optionTab.appendChild(toggleButton);

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

