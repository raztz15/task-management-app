import { DndProvider } from 'react-dnd';
import './App.css';
import { ToDoList } from './Components/ToDoList/ToDoList';


function App() {
  return (

    <div className="App">
      <div className='upper-background'></div>
      <div className='lower-background'></div>
      <div className='content-wrapper'>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
