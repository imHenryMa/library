
/*

TODO:

 o Setup book struct

 o Have an array to store books

 o Read from the array of books and then display on page

 - Hook up the 'Add book' button

 - Have the 'New Book' form hide when a book isn't being added, and show up when added
 - Have the 'New Book' form function properly

 o Hook up the 'Has Read' and the 'Remove' buttons per book

*/

/*-------------------------------------
Book methods and struct below
--------------------------------------*/

function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = function(){
    console.log(`${this.title} is written by ${this.author} and has ${this.pages} pages. ${hasRead ? 'You have read this!' : 'You have not read this!'}`);
}

//Books are stored within the 'shelf' parent node
const shelf = document.querySelector('.shelf');

//In memory they are stored in the 'books' array
let books = [];

//Function for populating the shelf with all books from the book array
function addBooks(booksArray, shelf){
    booksArray.reduce((arrayIndex,book)=>{

        //Generating a unique identifier for each book in the shelf
        let uniqueID = Date.now();
        book.uniqueID = uniqueID;

        //Pause for at least 1 millisecond so no two uniqueIDs are the same
        while(Date.now() - uniqueID < 1);

        //Add the book, then increase array iteration
        bookToDOM(shelf,booksArray[arrayIndex],uniqueID);
        console.log(`Book index: ${arrayIndex} added!`);
        return arrayIndex+1;
    },0);
}

/* Function to produce a book DOM element on the page */
function bookToDOM(shelf,bookData,uniqueID){
    /* Creates a book DOM element with the following HTML structure*/
    /*        
        <div class="book-container">
            <ul class="complete">
                <li>
                    <div class="title label">Title:</div>
                    <div class="title content">Title of book</div>
                </li>
                <li>
                    <div class="author label">Author:</div>
                    <div class="author content">Author of book</div>
                </li>
                <li>
                    <div class="pageCount label">Number of pages:</div>
                    <div class="pageCount content">PageCount</div>
                </li>
                <li>
                    <button class="hasRead">Has Read</button>
                </li>
                <li>
                    <button class="remove">Remove</button>
                </li>
            </ul>
        </div>
    */

    //Creating the element to store book details
    let newBook = document.createElement('div');
    newBook.classList.add('book-container');
    newBook.setAttribute('data-index',uniqueID);
    shelf.appendChild(newBook);
    
    //Using list for structure
    let list = document.createElement('ul')
    list.classList.add('complete');
    newBook.appendChild(list);

    //List item creation method
    addListItem(list, newBook,'title','Title:',bookData.title);
    addListItem(list, newBook,'author','Author:',bookData.author);
    addListItem(list, newBook,'pageCount','Number of pages:',bookData.pages);

    //Adding the two buttons.
    let readButton = addButton(list,'hasRead','Has Read');
    readButton.setAttribute('data-hasread',bookData.hasRead);
    readButton.textContent = bookData.hasRead ? 'Has read' : 'Has not read';
    let removeButton = addButton(list, 'remove', 'Remove');

    removeButton.addEventListener('click', ()=>{
        console.log(`${uniqueID} remove button was clicked`);
        removeBook(uniqueID);
    });

    readButton.addEventListener('click',() =>{
        console.log(`${uniqueID} read status was clicked`);
        let newStatus = toggleHasRead(uniqueID);
        readButton.setAttribute('data-hasread',newStatus);
        readButton.textContent = newStatus ? 'Has read' : 'Has not read';
    });

    function addListItem(list, book, className, title, content){
        let listItem = document.createElement('li');
        list.appendChild(listItem);
    
        let itemLabel = document.createElement('div');
        itemLabel.classList.add(className,'label');
        itemLabel.textContent=title;
        listItem.appendChild(itemLabel);
    
        let itemContent = document.createElement('div');
        itemContent.classList.add(className,'content');
        itemContent.textContent=content;
        listItem.appendChild(itemContent);
    }

    function addButton(list,className,content){
        let listItem = document.createElement('li');
        list.appendChild(listItem);

        let button = document.createElement('button');
        button.classList.add(className);
        button.textContent=content;
        listItem.appendChild(button);

        return button;
    }
}

//Function to remove a book from page
function removeBook(uniqueID){

    //First removes it from the array
    books = books.filter((book) => {
        return book.uniqueID != uniqueID;
    });

    //Then removes it from the DOM;
    let bookContainer = document.querySelector(`.book-container[data-index='${uniqueID}']`);
    bookContainer.remove();
};

//Function to change the 'hasRead' status of a book
function toggleHasRead(uniqueID){

    //Finds the current book in question
    let index = books.findIndex((book) => {
        return book.uniqueID == uniqueID;
    });

    
    //Toggles the status in the array
    books[index].hasRead = !(books[index].hasRead);

    //Returns the new status
    return books[index].hasRead;
}

/* Methods for the 'Add Book' button below */
addBookButton = document.querySelector('.add-book');
form = document.querySelector('.book-form');

//When the button is clicked, hide the button and show the form
addBookButton.addEventListener('click',() =>{
    addBookButton.classList.add('form-shown');
    form.classList.add('form-shown');
});

//When the submit button is clicked add the book, and then revert the 'Add Book' button to what it was
submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click',(event) => {
    if(form.checkValidity()){
        event.preventDefault();
        //Add the book to the array
        let newBook = new Book(title.value,author.value,pages.value,hasRead.checked);
        newBook.uniqueID = Date.now();
        books.push(newBook);
        bookToDOM(shelf,newBook, newBook.uniqueID);

        //Clear the form
        addBookButton.classList.remove('form-shown');
        form.classList.remove('form-shown');
        title.value = "";
        author.value = "";
        pages.value = "";
        hasRead.checked = false;
    }
});

//Cancel button resets the form and hides everything
cancelButton = document.querySelector('button[type="reset"]');
cancelButton.addEventListener('click',(event) => {
        //Resets form status
        addBookButton.classList.remove('form-shown');
        form.classList.remove('form-shown');
});


/*---------------------------
Debug items
---------------------------*/
/* Test book */
const book1 = new Book('A Game of Thrones','George R.R. Martin',694,true);
const book2 = new Book('B','B',22,false);
const book3 = new Book('C','C',33,false);
/* Test Array */
books.push(book1);
books.push(book2);
books.push(book3);
