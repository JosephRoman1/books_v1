import { useState } from "react";
import BookEdit from './BookEdit';

function BookShow({ book, onDelete, onEdit }) {
    //showEdit is a boolean value that determines if BookEdit component is shown or not.
    const [showEdit, setShowEdit] = useState(false);

    //When a user clicks on the 'X' icon to delete a book, the function defined in App.js (deleteBookById)
    //runs, with the id of the book to be deleted, being passed back up the component hierarchy all the way to App.js, and into the argument
    //that deleteBookById expects, which is an id number.
    const handleDeleteClick = () => {
        onDelete(book.id);
    };

    //When a user clicks the pencil icon to edit a book, showEdit's boolean value becomes the opposite of what it was.
    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    //After a user submits the form when they're done editing the book's title, 
    //showEdit becomes false so that the BookEdit component isn't shown anymore.
    //Then the function defined in App.js (editBookById) runs, with the id of
    //the book to be edited and the new title, being passed back up the component hierarchy all the way to App.js, and into the arguments
    //that editBookById expects, which is an id number and new title.
    const handleSubmit = (id, newTitle) => {
        setShowEdit(false);
        onEdit(id, newTitle);
    };

    //if showEdit is false then content just shows the book's title, otherwise content shows BookEdit component.
    //pass the book object down to BookEdit as a prop, so BookEdit can use the title of the book for the default value of it's state.
    let content = <h3>{book.title}</h3>;
    if (showEdit) {
        content = <BookEdit onSubmit={handleSubmit} book={book} />;
    } 

    return (
        <div className="book-show">
            <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
            <div>{content}</div>
            <div className="actions">
                <button className="edit" onClick={handleEditClick}>
                    Edit
                </button>
                <button className="delete" onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>    
        </div>
    );
}

export default BookShow;