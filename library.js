let myLibrary = [];

function Book(title, author, numPages, read, index) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = this.read ? 'Has already read' : 'Has not yet read';
    this.index = index;

    this.info = function() {
        return this.title + ' by ' + this.author + 
        ', ' + this.numPages + ' pages, ' + this.read;
    }
}

const addBookButton = document.querySelector('.add-button');
addBookButton.addEventListener('click', () => {

});

initializeFillerData();
render();


function addBookToLibrary(title, author, pages, read) {
    let index = myLibrary.length;
    let book = new Book(title, author, pages, read, index);
    myLibrary.push(book);
}

function render() {
    let library = document.querySelector('.library');
    for (let i=0; i<myLibrary.length; i++) {
        console.log(myLibrary[i].info());
        let bookTab = document.createElement('div');
        let bookTitle = document.createElement('label');
        let bookAuthor = document.createElement('label');
        let bookPages = document.createElement('label');
        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;

        bookTab.appendChild(bookTitle);
        bookTab.appendChild(bookAuthor);
        bookTab.appendChild(bookPages);

        let optionTab = document.createElement('div');
        let bookRead = document.createElement('label');
        bookRead.textContent = myLibrary[i].read;
        
        let deleteButton = document.createElement('button');
        let toggleButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        toggleButton.textContent = 'Toggle';

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
    addBookToLibrary('Catcher in the Rye', 'J. D. Salinger', 277, false);
}

