import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar';
import 'tabler-react/dist/Tabler.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
