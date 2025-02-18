import { useState } from "react"
import { Modal } from "./Modal"

export function BookCard ({books, loading, error}) {

  const [selectedBook, setSelectedBook] = useState('')
  const [openModal, setOpenModal] = useState(false)


    const booksWithCovers= books.filter(book =>book.coverId !== undefined && book.coverId !== null )

    if(loading) {
        return <p>Loading books... 🕗 </p>
    }

    if(error) {
        return <p>{error} 😑 </p>
    }

    const handleClick =(book) => {
      setSelectedBook(book)
      setOpenModal(true)
    }


    return (
        <>
        {
            booksWithCovers.length > 0 ? (
              booksWithCovers.map((book, index) => (
                <div className="book-card" key={index} onClick={()=> handleClick(book)}>
                  <h3>{book.name}</h3>
                  
                  {book.coverId && (
                    <img className="book-cover" src={ `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`} />
                  )}
                  <p>Author: {book.autorName}</p>
                </div>
              ))
            ) : (
              <p>No books found ⛔ </p>
            )
          }

          {
            openModal && <Modal selectedBook={selectedBook} onClose={()=> setOpenModal(false)}/>
          }
        </>
    )
}