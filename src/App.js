import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Esse é Meu App React
        </p>
      </header>
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
