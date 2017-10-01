import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props)
  } 
  
  // Handle update on search input
  handleUpdate(event){
    // Invoking call back from the movies component to handle change in searchterm
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