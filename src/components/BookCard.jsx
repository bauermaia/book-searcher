

export function BookCard ({books, loading, error}) {


    const booksWithCovers= books.filter(book =>book.coverId !== undefined && book.coverId !== null )

    if(loading) {
        return <p>Loading books... 🕗 </p>
    }

    if(error) {
        return <p>{error} 😑 </p>
    }

    return (
        <>
        {
            booksWithCovers.length > 0 ? (
              booksWithCovers.map((book, index) => (
                <div className="book-card" key={index}>
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
        </>
    )
}