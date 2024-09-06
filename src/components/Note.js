import React, { useState, useRef } from 'react';

function Note({ note, deleteNote }) {
  const { content, color, fontSize, fontStyle, isTodo, tasks, image } = note;
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState(tasks || []);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const noteStyle = {
    backgroundColor: color,
    fontSize: `${fontSize}px`,
    fontFamily: fontStyle,
    padding: '10px',
    margin: '10px',
    width: '200px',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
    position: 'relative',
  };

  const handleAddTask = () => {
    setTaskList([...taskList, { task: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskList(updatedTasks);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="note" style={noteStyle}>
      <button
        className="delete-btn"
        onClick={() => deleteNote(note.id)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '5px',
          cursor: 'pointer',
        }}
      >
        X
      </button>

      {!isTodo && <p>{content}</p>}
      {isTodo && (
        <div>
          <h4>To-Do List</h4>
          <ul>
            {taskList.map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                {task.task}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task..."
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      {image && <img src={image} alt="Uploaded" style={{ width: '100%' }} />}
      <canvas
        ref={canvasRef}
        width="200"
        height="150"
        style={{ border: '1px solid #000' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default Note;
