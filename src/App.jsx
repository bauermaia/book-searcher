
import {useState } from 'react';
import './App.css'
import { BookCard } from './components/BookCard';
import { useBooks } from './hooks/useBooks';
import { Toaster } from 'react-hot-toast';

function App() {
  
const [search, setSearch] = useState('')
 const {books, getBooks, loading, error} = useBooks()
 const [searchDone, setSearchDone] = useState(false)
const [favorites, setFavorites] = useState([])
const [loadFavorites,setLoadFavorites] = useState(false)


const handleChange =(event) => {
  setSearch(event.target.value)
  setSearchDone(false)
  setLoadFavorites(false)
}

const handleSubmit=(event)=> {
  event.preventDefault()
  getBooks({search})
  setSearchDone(true)
  setFavorites(false)
}

const handleFavoritesLoad = () => {
const storedFavorites = JSON.parse(localStorage.getItem('favorites'))|| [];
setSearchDone(false)
 setFavorites(storedFavorites)
  setLoadFavorites(true)
}

console.log(favorites)

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
    </section>
    </>
  )
}

export default App
