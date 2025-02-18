
import {useState } from 'react';
import './App.css'
import { BookCard } from './components/BookCard';
import { useBooks } from './hooks/useBooks';
import { Toaster } from 'react-hot-toast';
import { useMostSearched } from './hooks/useMostSearched';

function App() {
  
const [search, setSearch] = useState('')
 const {books, getBooks, loading, error} = useBooks()
 const [searchDone, setSearchDone] = useState(false)
const [favorites, setFavorites] = useState([])
const [loadFavorites,setLoadFavorites] = useState(false)
const {mostSearched} = useMostSearched()
const [isFirstLoad, setIsFirstLoad] = useState(true)

const handleChange =(event) => {
  setSearch(event.target.value)
  setSearchDone(false)
  setLoadFavorites(false)
  setIsFirstLoad(false)
}

const handleSubmit=(event)=> {
  event.preventDefault()
  getBooks({search})
  setSearchDone(true)
  setFavorites(false)
  setIsFirstLoad(false)
}

const handleFavoritesLoad = () => {
const storedFavorites = JSON.parse(localStorage.getItem('favorites'))|| [];
setSearchDone(false)
 setFavorites(storedFavorites)
  setLoadFavorites(true)
  setIsFirstLoad(false)
}

console.log(mostSearched)

  return(
    <>
    <header>
    <Toaster position="top-right" reverseOrder={false} toastOptions={{
      style: {fontFamily: 'Roboto Mono, serif',
        backgroundColor: '#d9cba7'
      }
    }} />
    <img className='logo' src="/images/logo.png" alt="Books space" />
    <h1>Online book searcher</h1>
    <i className="ri-star-fill favorites-icon" onClick={handleFavoritesLoad}></i>
    </header>

    <main>
      <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter a book name, author, or genre' value={search} onChange={handleChange}/>
      <button>Search</button>
      </form>
    </main>

    <section> 
      {
        searchDone && (
          <BookCard books={books} loading={loading} error={error}/>
        ) 
      }

      {
        loadFavorites && (
          <BookCard books={favorites} loading={false} error={null}/>
        )
      }

      {
        isFirstLoad && mostSearched.length > 0 && (
          <BookCard books={mostSearched} loading={false} error={null} />
        )
      }
    </section>
    </>
  )
}

export default App
