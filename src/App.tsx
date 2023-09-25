import { DndProvider } from 'react-dnd';
import './App.css';
import { ToDoList } from './Components/ToDoList/ToDoList';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className='upper-background'></div>
        <div className='lower-background'></div>
        <div className='content-wrapper'>
          <ToDoList />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
