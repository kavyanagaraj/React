import React, {Component} from 'react'
import Movies from './Components/Movies.js'

class App extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      error : ""
    }
  };

  componentDidMount(){
    // To get the list of movies
    this.getMovies();
  };

  // To get the list of movies evan likes
  getMovies(){
    this.setState({error : ""})
    //Checking if data exists in local storage. If it doesn't exist then making a get request to get data
    if (!localStorage['movies']){
      axios.get("http://localhost:3000/movies")
        .then((result) => {
            this.setState({
                movies: result.data
            })
            if(storageAvailable){
              localStorage.setItem("movies", JSON.stringify(result.data))
            }
        }).catch((err) => {
            // Can send a status from the web service if there is no data found
            this.state({error : "Something went wrong"})
            console.log(err)
      }) 
    }else{
      // Getting the list from local storage
      var movie_list = localStorage.getItem('movies');
      if(movie_list){
        this.setState({movies: JSON.parse(movie_list)})
      }
    }   
  } 
  
  //Display the list of there is no error else display the error message
  render(){
    if(!this.state.error){
     return( 
      <div className='page'>
        <div className='app-description'>
          <h1 className='app-description__title'>Movies Evan Likes!</h1>
          <p className='app-description__content'>
            Below is a (not) comprehensive list of movies that Evan really
            likes.
          </p>
        </div>       
        <Movies movies = {this.state.movies} /> 
      </div>)
    }else{
      return (<h2>{this.state.error}</h2>)
    }
  }
} 

// To check if storage is available
export function storageAvailable(type) {
  try {
      var storage = window[type],
      x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage.length !== 0;
  }
}

export default App
  