import React, { Component } from 'react';
import SearchBar from './Search-Bar.js' 
import Decade from './Decade.js'
import Decade_Filter from '../Services/Decade-Filter.js'
import Search_Filter from '../Services/Search-Filter.js'
import storageAvailable from '../App.js'

class Movies extends Component {
  constructor(props){
    super(props)
    //Setting state
    this.state = { 
      movies : {}, // List of all the movies
      filtered_list : [], // List of movies when various filters are applied
      selected_decade : "", 
      decade_list : [], 
      review : {},
      is_review : true} 
    } 

  componentWillReceiveProps(props){
    this.setState({
        movies: props.movies,
        filtered_list : props.movies
    })   
  }

  //Search filter
  search_filter(term){
    this.setState({search_text : term.trim()}, function(){
      //Making the filters additive and setting the state depending on the helper functions decade and search filter output
      if(this.state.selected_decade){
        this.state.search_text == "" ? this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)}) : 
        this.setState({filtered_list: Search_Filter(this.state.filtered_list, this.state.search_text)})
      } else{
        this.setState({filtered_list: Search_Filter(this.state.movies, this.state.search_text)})
      }
    })
  }

  //Decade Filter
  decade_filter(decade){
    this.setState({selected_decade: decade}, function(){
      // this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)})
      if(this.state.search_text){
        this.setState({filtered_list: Decade_Filter(this.state.filtered_list, this.state.selected_decade)})
      }else{
        this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)})
      }      
    })
  }

  //To open rotten tomato site when link is clicked and not open the review tab
  open_url(event){
    this.setState({is_review : false});
    event.stopPropagation()
  }

  //Triggers when the list is clicked to get review of a movie
  get_review(id, event){
    this.setState({is_review: true});
    this.setState({review : {}});
    //Checking if data exists in local storage. If it doesn't exist then making a get request to get data
    if (!localStorage['reviews']){
      axios.get("http://localhost:3000/reviews")
        .then((result) => {
            if(storageAvailable){
              this.setState({review : result.data[id-1]},function(){this.setState({is_review : true}), console.log(this.state.review);})
              localStorage.setItem("reviews", JSON.stringify(result.data))
            }
        }).catch((err) => {
            console.log(err)
      }) 
    }else{
      //Getting review from local storage
      var review_list = localStorage.getItem('reviews');
      if(review_list){
        review_list = JSON.parse(review_list)
        this.setState({review : review_list[id-1]}, () => {
          this.setState({is_review : true})
        })
      }
    }   
  }

  render() {
    //Arranges the list alphabetically
    this.state.filtered_list.sort(function(movie1,movie2){
      return movie1.title.localeCompare(movie2.title);
    })
    //Creating the html - collpasible header and body for the movies
    let userList = this.state.filtered_list.map((movie,index) => {
      let score = movie.score * 100
      // Collapsible header with title, year and score
      // Body with image served from Amazon S3 bucket and review of the movie 
      return (<li key = {index}> 
          <div className = "collapsible-header" onClick = {this.get_review.bind(this, movie.id)}>{score}% - <a onClick={this.open_url.bind(this)} href = {movie.url} target = "_blank">{movie.title} </a> - ({movie.year})</div>
          <div className={this.state.is_review ? 'collapsible-body' : 'close_div'}>
            { this.state.is_review == true && <div className = "row">
              <div className="col s4 m2">                   
                  <img src= {this.state.review.image_url} id = "movie_image" alt=":("/>  
                </div>
                <div className="col s8 m10">
                  <p>{this.state.review.review}</p>
                </div> 
              </div>}             
          </div>    
      </li>)  
    }) 

    //Search component, Decade component and the movie list
    return (
      <div> 
        <div className = "row">
          <div className="col s6 m6">                   
            <SearchBar search_filter={this.search_filter.bind(this)}/>   
          </div>
          <div className="col s4 offset-s2 m4 offset-m2">
            <Decade movies = {this.state} decade_filter = {this.decade_filter.bind(this)}/>
          </div> 
        </div> 
        <ul className="Movies collapsible" data-collapsible="accordion">
            {userList}
        </ul>
      </div>      
    );
  }
}

export default Movies;