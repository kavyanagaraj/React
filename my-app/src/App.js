import React, { Component } from 'react';
import Projects from './Components/Projects'
import './App.css'
class App extends Component {
  constructor(){
    super()
    this.state = {
      projects : []
    }
  }
  
  componentWillMount(){
    this.setState({projects : [
      {
      title : 'Learn React',
      category: 'React Dev'
      },
      {
        title : 'Travel',
        category: 'Angular Dev'
      }
    ]});
  }
  
  render() {
    return (
      <div className="App">
        My App
        <Projects projects = {this.state.projects}/>
      </div>
    );
  }
}

export default App;
