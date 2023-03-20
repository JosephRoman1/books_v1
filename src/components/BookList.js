import BookShow from './BookShow';

function BookList({ books, onDelete, onEdit }) {
    
    //map through the list of books (array of objects).
    //pass down a particular book (object) to BookShow component.
    //pass down deleteBookById function to BookShow component, deleteBookById is represented by the onDelete prop.
    //pass down editBookById function to BookShow component, editBookById is represented by the onEdit prop.
    const renderedBooks = books.map((book) => {
        return <BookShow onEdit={onEdit} onDelete={onDelete} key={book.id} book={book} />;
    });

    return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;