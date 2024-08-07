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
        <Router basename='/rapid-news-app'>
        <Navbar/>

        <Routes>
          <Route exact path="/rapid-news-app" element={<News key="latest" category='latest' />} />
          <Route path="/business" element={<News key="business" category='business' />} />
        </Routes>
        </Router>
      </div>
    )
  }
}
