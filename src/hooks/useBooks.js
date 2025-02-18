import { useState } from "react";
export function useBooks () {

  const BOOK_INFO_ENDPOINT= 'https://openlibrary.org/search.json?q=';
  const [books, setBooks] = useState([])
  const [error, setError] =useState()
  const [loading, setLoading] = useState(false)

  const getBooks = async({search}) => {
    if(search.trim() ==='') return;
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BOOK_INFO_ENDPOINT}${search}`)
       //renderizado progresivo para que no demore tanto en cargar
      const reader= response.body.getReader()
      const decoder = new TextDecoder();
      let partialData=''

      while(true) {
        const {value, done} = await reader.read()
        if(done) break;
        partialData += decoder.decode(value, {stream: true})
      }
     

      //intenta parsear en cada fragmento recibido
      try {
        const json = JSON.parse(partialData);
        const booksData = json.docs?.map(book => ({
          autorId: book.author_key?.[0] || 'Unknown',
          autorName: book.author_name?.[0] || 'Unknown',
          coverId: book.cover_i,
          name: book.title
        }))
  
       setBooks(booksData)
      } catch(e) {
        //si la respeusta no esta completa ignora el error de JSON. parse
      }

      
      
    } catch(e) {
    setError("Error geting books")
    } finally {
      setLoading(false)
    }
  }

  return {books, error, loading, getBooks}
  
}