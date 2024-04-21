import React from 'react';
import './App.css';
import MainComponent from './MainComponent'; // Import the MainComponent

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Display the MainComponent */}
        <MainComponent />
      </header>
    </div>
  );
}

export default App;