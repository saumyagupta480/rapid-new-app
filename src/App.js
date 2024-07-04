import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<News category='latest' />} />
        </Routes>
        </Router>
      </div>
    )
  }
}
