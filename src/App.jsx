
import {useState } from 'react';
import './App.css'
import { BookCard } from './components/BookCard';
import { useBooks } from './hooks/useBooks';

function App() {
  
const [search, setSearch] = useState('')
 const {books, getBooks, loading, error} = useBooks()
 const [searchDone, setSearchDone] = useState(false)


const handleChange =(event) => {
  setSearch(event.target.value)

}

const handleSubmit=(event)=> {
  event.preventDefault()
  getBooks({search})
  setSearchDone(true)
}

console.log(books)

  return(
    <>
    <header>
    <img className='logo' src="/images/logo.png" alt="Books space" />
    <h1>Online book searcher</h1>
    </header>

    <main>
      <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter the book name' value={search} onChange={handleChange}/>
      <button>Search</button>
      </form>
    </main>

    <section> 
      {
        searchDone ? (
          <BookCard books={books} loading={loading} error={error}/>
        ) :(
          <p>Please, enter a book name to start the search</p>
        )
      }
    </section>
    </>
  )
}

export default App
