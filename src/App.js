import React, { useState } from 'react';
import Board from './components/Board';
import Toolbar from './components/Toolbar';

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App">
      <Toolbar addNote={addNote} />
      <Board notes={notes} deleteNote={deleteNote} />
    </div>
  );
}

export default App;
