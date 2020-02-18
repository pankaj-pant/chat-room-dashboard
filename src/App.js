import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import 'typeface-roboto';

function App() {
  console.log("Inside App")
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
