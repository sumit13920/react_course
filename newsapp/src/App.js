import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={6} country="us" category="general"/>} />
            <Route exact path="/business" element={<News key="business" pageSize={6} country="us" category="business"/>} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country="us" category="entertainment"/>} />
            <Route exact path="/generalhealth" element={<News key="generalhealth" pageSize={6} country="us" category="generalhealth"/>} />
            <Route exact path="/science" element={<News key="science" pageSize={6} country="us" category="science"/>} />
            <Route exact path="/sports" element={<News key="sports" pageSize={6} country="us" category="sports"/>} />
            <Route exact path="/technology" element={<News key="technology" pageSize={6} country="us" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}

 

 
