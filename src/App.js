import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks(); //call this function to set the books state after first render.  Never call again after first render because of '[]' argument.
    }, []);

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle,
        });

        const updatedBooks = books.map((book) => {
            //if book.id === id, then this is the book object that we want to update.
            if (book.id === id) {
                //creating a new object that takes all the existing properties (keys and values) from the book object that we want to edit, and adds the new properties (keys and values) from the response object as well.
                //essentially only the keys and values from ...response.data are returned because an object can't have duplicate keys ('title' and 'id' keys in this case), and only the final keys are
                //considered (keys from ...response.data in this case)
                return { ...book, ...response.data }; 
            }

            return book; //if it's not the book we're looking for then just return that book object.
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    //because the value passed into createBook is the same name as the key in the object, title: title is not required and can be condensed to just title.
    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        //create a brand new array
        //take all of the existing books, add them into the updatedBooks array, and at the very end of the array add the data from the response. 
        //response.data is the actual object that was created from the post request when a user enters a title and presses the Create! button.
        const updatedBooks = [
            ...books,
            response.data
        ];
        setBooks(updatedBooks);
    };

    //pass down the list of books (array of objects) to BookList component.
    //pass down deleteBookById function to BookList component.
    //pass down editBookById function to BookList component.
    //pass down createBook function to BookCreate component.
    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} /> 
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;