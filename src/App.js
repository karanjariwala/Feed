

import React, { Component } from 'react';

import Feed from '../src/components/Feed.jsx'
// import FlockDupe from   '../src/Services/flockdupe.js';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

          <h2>Feed</h2>

          <Feed />

      </div>
    );
  }
}

export default App;
