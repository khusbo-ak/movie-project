import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from "./search.svg"
import PosterCard from './PosterCard';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=1c39442'


function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);


  const searchMovie = async (title)=>{
     setLoading(true);
    try {

    const response = await fetch (`${API_URL}&s=${title}`);
    const data = await response.json(); 

    setMovies(data.Search||[]);
        } catch (error) {
      console.error("Failed to fetch movies", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect( ()=>{
searchMovie()
  },[])

  return (
 <> 
     <div className="app">
        <h1>MovieExplorer</h1>

        <div className="search">
          <input placeholder="Search for movies"
            value= {searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

          <img src={SearchIcon} alt="search" onClick={() => searchMovie(searchTerm)} />
        </div>
          {loading ? (
          <div className="loading">
            <h2>Loading...</h2>
          </div>
        ): movies?.length>0?(
        <div className="container">
       
        {movies.map((movie)=>( 
          <PosterCard key={movie.imdbID} movie={movie} />
        ))}
        </div>
        ):(
          <div className="empty">
          <h2>No Movies Found :( </h2>
          </div>
        )
      }
     </div>
 </>
  );
}

export default App;
