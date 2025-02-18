import { useBookDescription } from "../hooks/useBookDescription"

export function Modal ({selectedBook, onClose}) {

 const {description} =useBookDescription(selectedBook.key)

    return (
      <div className="modal-container">
        <div className="modal">
        <button className="close-modal-button" onClick={onClose}><i className="ri-arrow-left-box-line"></i></button>
        <h1>{selectedBook.name}</h1>
        <img className="book-cover" src={ `https://covers.openlibrary.org/b/id/${selectedBook.coverId}-M.jpg`} />
        <p>Author: {selectedBook.autorName}</p>
        <p className="description">{description} </p>
        <a href={`https://www.amazon.com/s?k=${selectedBook.name}`}>📖 Buy this book</a>
        </div>
      </div>
    )
}