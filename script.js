
/*

TODO:

 o Setup book struct

 o Have an array to store books

 o Read from the array of books and then display on page

 - Have a button to add a new book

 - Have a form that sends information to a book struct -> refresh the page

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

/* Factory method to produce a book DOM element on the page */
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
    addButton(list,'hasRead','Has Read');
    addButton(list, 'remove', 'Remove');

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
    }
}
//Function for populating the page with books from the book array
function addBooks(booksArray, shelf){
    booksArray.reduce((arrayIndex,book)=>{
        bookToDOM(shelf,booksArray[arrayIndex],arrayIndex);
        console.log(`Book index: ${arrayIndex} added!`);
        return arrayIndex+1;
    },0);
}

//Function to remove a book from page
function removeBook(uniqueID){

    //First removes it from the array
    books = books.filter((book, index) => {
        return index != uniqueID;
    });

    //Then removes it from the DOM;
    let bookContainer = document.querySelector(`.book-container[data-index='${uniqueID}']`);
    bookContainer.remove();

};

/*-----------------------------------------
Actual logic for the page below
--------------------------------*/
const shelf = document.querySelector('.shelf');






/*---------------------------
Debug items
---------------------------*/
/* Test book */
const book1 = new Book('A Game of Thrones','George R.R. Martin',694,true);
const book2 = new Book('B','B',22,false);
const book3 = new Book('C','C',33,false);
/* Test Array */
let books = [];
books.push(book1);
books.push(book2);
books.push(book3);
