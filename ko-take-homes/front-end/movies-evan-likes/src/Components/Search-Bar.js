import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state ={search : ""} 
  } 

  handleUpdate(event){
      console.log(event.target.value)
      this.props.search_filter(event.target.value)
  }
  render() {
    return (
        <div>
            <input type="text" onChange={this.handleUpdate.bind(this)} placeholder = "Search by title"/>
        </div>
    )
  }
}

export default SearchBar;