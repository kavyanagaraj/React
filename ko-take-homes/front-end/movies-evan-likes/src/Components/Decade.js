import React, { Component } from 'react';

class Decade extends Component {
  constructor(props){
    super(props)
    this.state ={decade : [], movies : []} 
  } 

  componentDidMount(){
    this.setState({movies: this.props.movies});
  };

  componentWillReceiveProps(props){
    this.setState({movies: props.movies.movies}, function(){
        this.compute_decade(); 
    })  
  }

  handleUpdate(event){
      console.log(event.target.value)
      this.props.decade_filter(event.target.value)
  }

  render() {
    var decade_list; 
    decade_list = this.state.decade.map((decade, index) =>{
        return(<li onClick={this.handleUpdate.bind(this)} key = {index} value={decade}>{decade}</li>)
    })
    return (
        <div>
            <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Decade</a>
            <ul id = "dropdown1" className='dropdown-content'>
                {decade_list}
            </ul>
        </div>
    )
  }

  compute_decade(){
    var minYear = this.state.movies[0].year;
    var maxYear = this.state.movies[0].year;
    //Gets the minimum and maximum year in the list
    for(var i = 0; i < this.state.movies.length; i++){
      if(minYear > this.state.movies[i].year){
        minYear = this.state.movies[i].year;
      }
      if(this.state.movies[i].year > maxYear){
        maxYear = this.state.movies[i].year;
      }
    }
    //Gives minYear and maxYear
    minYear = minYear - (minYear % 10);
    maxYear = maxYear - (maxYear % 10);
    
    //Creates the decade array
    var decade_list = []
    for(var i = parseInt(minYear); i <= parseInt(maxYear); i += 10){
        decade_list.push(i);
    }
    this.setState({decade : decade_list});
  }
}

export default Decade;