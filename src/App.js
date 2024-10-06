import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
