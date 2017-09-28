import React, { Component } from 'react';
import Search_Filter from '../Services/Search.js'
import SearchBar from './Search-Bar.js' 
import Decade from './Decade.js'
import Decade_Filter from '../Services/Decade-Filter.js'
import ImageLoader from 'react-imageloader';
import storageAvailable from '../App.js'

class Movies extends Component {
  constructor(props){
    super(props)
    this.state ={movies : this.props.movies, filtered_list : [], selected_decade : "", decade_list : [], review : {}} 
  } 

  componentWillReceiveProps(props){
    this.setState({
        movies: props.movies,
        filtered_list : props.movies
    })   
  }

  search_filter(term){
    this.setState({search_text : term.trim()}, function(){
      if(this.state.selected_decade){
        this.state.search_text == "" ? this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)}) : 
        this.setState({filtered_list: Search_Filter(this.state.filtered_list, this.state.search_text)})
      } else{
        this.setState({filtered_list: Search_Filter(this.state.movies, this.state.search_text)})
      }
    })
  }

  decade_filter(decade){
    this.setState({selected_decade: decade}, function(){
      console.log("decade filter", Decade_Filter(this.props.movies, this.state.selected_decade))
      this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)})
      if(this.state.search_text){
        this.setState({filtered_list: Decade_Filter(this.state.filtered_list, this.state.selected_decade)})
      }else{
        this.setState({filtered_list: Decade_Filter(this.state.movies, this.state.selected_decade)})
      }      
    })
  }

  preloader() {
    return <img src="./spinner.gif"/>;
  }

  rotten_tomato(event){
    console.log("inside tomato");
    event.stopPropagation();
    this.setState({is_review : false})
  }

  get_review(id, event){
    this.setState({is_review: false})
    this.setState({review : {}})
    console.log(id);
    if (!localStorage['reviews']){
      console.log("Inside reviews axios");
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
      console.log("Inside reviews else", this.state.is_review);
      var review_list = localStorage.getItem('reviews');
      if(review_list){
        review_list = JSON.parse(review_list)
        this.setState({review : review_list[id-1]}, () => {
          this.setState({is_review : true}, () => {console.log("setting is review", this.state.is_review, this.state.review)})
        })
      }
    }   
  }

  render() {
    this.state.filtered_list.sort(function(movie1,movie2){
      return movie1.title.localeCompare(movie2.title);
    })

    let userList = this.state.filtered_list.map((movie,index) => {
      let score = movie.score * 100
      return (<li key = {index}> 
          <div className = "collapsible-header" onClick = {this.get_review.bind(this, movie.id)}>{score}% - <a onClick={this.rotten_tomato.bind(this)} href = {movie.url} target = "_blank">{movie.title} </a> - ({movie.year})</div>
            <div className="collapsible-body">
            { this.state.is_review === true && <div className = "row">
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

    return (
      <div> 
        <SearchBar search_filter={this.search_filter.bind(this)}/>
        <Decade movies = {this.state} decade_filter = {this.decade_filter.bind(this)}/>
        <ul className="Movies collapsible" data-collapsible="accordion">
            {userList}
        </ul>
      </div>      
    );
  }
}

export default Movies;