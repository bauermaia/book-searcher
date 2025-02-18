import { useBookDescription } from "../hooks/useBookDescription"
import {toast} from "react-hot-toast"

export function Modal ({selectedBook, onClose}) {


 const {description} =useBookDescription(selectedBook.key)

  const handleFavorites=(selectedBook)=>{
    const favorites= JSON.parse(localStorage.getItem('favorites'))||[];

    const isAlreadyFavorite = favorites.some(fav=> fav.name === selectedBook.name)

    if(!isAlreadyFavorite) {
      favorites.push(selectedBook)
      localStorage.setItem('favorites', JSON.stringify(favorites))

      toast.success(`${selectedBook.name} added to favorites!👌` )
    } else {
      toast.error(`${selectedBook.name} is alreade in favorites ❌`  )
    }
  }

    return (
      <div className="modal-container">
        <div className="modal">
        <button className="close-modal-button" onClick={onClose}><i className="ri-arrow-left-box-line"></i></button>
        <h1>{selectedBook.name}</h1>
        <img className="book-cover" src={ `https://covers.openlibrary.org/b/id/${selectedBook.coverId}-M.jpg`} />
        <p>Author: {selectedBook.autorName}</p>
        <p className="description">{description} </p>
       <div className="actions"> 
       <a href={`https://www.amazon.com/s?k=${selectedBook.name}`}>📖 Buy this book</a>
       <p>Add to favorites</p>
       <i className="ri-star-fill favorites-icon-modal" onClick={()=>handleFavorites(selectedBook)}></i>
       </div>
        </div>
      </div>
    )
}