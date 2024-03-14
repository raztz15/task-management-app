import { DndProvider } from 'react-dnd';
import './App.css';
import { ToDoList } from './Components/ToDoList/ToDoList';
import { ThemeProvider } from './Context/ThemeContext';
import React from 'react';


function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <div className='upper-background'></div>
        <div className='lower-background'></div>
        <div className='content-wrapper'>
          <ToDoList />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
