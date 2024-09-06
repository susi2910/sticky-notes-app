import React from 'react';
import Note from './Note';

function Board({ notes, deleteNote }) {
  return (
    <div className="board">
      {notes.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} />
      ))}
    </div>
  );
}

export default Board;
