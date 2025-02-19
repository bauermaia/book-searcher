
import {useEffect, useState } from 'react';
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
const {mostSearched, mostLoading} = useMostSearched()
const [isFirstLoad, setIsFirstLoad] = useState(true)
const [searchError, setSearchError] = useState('')
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);


const handleChange =(event) => {
  setSearch(event.target.value)
  setSearchDone(false)
  setLoadFavorites(false)
  setIsFirstLoad(false)
  setSearchError('')
}

const handleSubmit=(event)=> {
  event.preventDefault()
  if (search === ''){
    setSearchError('Enter a title, author or genre. The search cannot be empty❗' )
    return;
  }
  getBooks({ search })
  setSearchDone(true)
  setFavorites([])
  setIsFirstLoad(false)

}

const handleFavoritesLoad = () => {
const storedFavorites = JSON.parse(localStorage.getItem('favorites'))|| [];
setSearchDone(false)
 setFavorites(storedFavorites)
  setLoadFavorites(true)
  setIsFirstLoad(false)
  setSearch('')
}

const handleLogo = ()=> {
  setIsFirstLoad(true)
  setLoadFavorites(false)
  setSearchDone(false)
  setSearchError('')
  setSearch('')
}


  return(
    <>
    <header>
    <Toaster position="top-right" reverseOrder={false} toastOptions={{
      style: {fontFamily: 'Roboto Mono, serif',
        backgroundColor: '#d9cba7'
      }
    }} />
    <img className='logo' src="/images/logo.png" alt="Books space" onClick={handleLogo}/>
    <h1>Online book searcher</h1>
    <button className='mode' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <i className="ri-sun-line"></i> : <i className="ri-contrast-2-fill"></i>}
      </button>
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
       searchError ? (
          <p className='message'>{searchError}</p>
        )
        :  searchDone && ( 
        <>
        <div className='section-title'> <h2>Results for: {`${search}`} 📚</h2></div>
        <BookCard books={books} loading={loading} error={error}/>
        </>
        ) 
      }

      {
        loadFavorites && (
          <>
          <div className='section-title'> <h2>Your favorites ⭐</h2></div>
          <BookCard books={favorites} loading={false} error={null}/>
          </>
        )
      }

      {
       isFirstLoad && (
        <>
          <div className='section-title'>
            <h2>Most searched books today 🔍</h2>
          </div>
          {mostLoading ? (
            <p className="message">Loading most searched books... 🕗</p>
          ) : (
            <BookCard books={mostSearched} loading={mostLoading} error={null} />
          )}
        </>
      )
      }
    </section>
    </>
  )
}

export default App
