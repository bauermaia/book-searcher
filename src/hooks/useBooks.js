import { useState } from "react";


const BOOK_INFO_ENDPOINT= 'https://openlibrary.org/search.json?q=';
const SUBJECT_ENDPOINT= 'https://openlibrary.org/subjects'


const SUBJECTS = new Set (["fiction", "history", "science", "love", "arts", "animals", 
      "finance", "children", "wellness", "biography", "textbooks", 
      "fantasy", "mystery", "horror", "cience fiction", "cooking", "medicine",
    "mistery", "detectives", "religion", "music"
])

export function useBooks () {


  const [books, setBooks] = useState([])
  const [error, setError] =useState()
  const [loading, setLoading] = useState(false)

  const getBooks = async({search}) => {
  
    setLoading(true)
    setError(null)

    try {

      const isSubject =SUBJECTS.has(search.toLowerCase())
      const url = isSubject 
      ? `${SUBJECT_ENDPOINT}/${search}.json`
      : `${BOOK_INFO_ENDPOINT}${search}`;

 
    const response = await fetch(url);
    const data = await response.json();

    let booksData = [];

    if (!isSubject && data.docs) {
      // Para búsquedas por título o autor
      booksData = data.docs.map(book => ({
        autorId: book.author_key?.[0] || 'Unknown',
        autorName: book.author_name?.[0] || 'Unknown',
        coverId: book.cover_i,
        name: book.title,
        key: book.key
      }));
    } else if (isSubject && data.works) {
      // Para búsquedas por subject (género)
      booksData = data.works.map(book => ({
        autorId: book.authors?.[0]?.key || 'Unknown',
        autorName: book.authors?.[0]?.name || 'Unknown',
        coverId: book.cover_id,
        name: book.title,
        key: book.key
      }));
    }

    setBooks(booksData);
  } catch (e) {
    setError("Error getting books");
  } finally {
    setLoading(false);
  }
};


  return {books, error, loading, getBooks}
  
}