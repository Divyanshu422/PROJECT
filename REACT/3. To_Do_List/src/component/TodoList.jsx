import React, { useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState([
    "Eat Breakfast",
    "Take Shower",
    "walk the Dog",
  ]);
  const [newTask, setNewTask] = useState("");
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };
  const handleAdd = () => {};
  return (
    <>
      <div>
        <h1>ToDo-List</h1>
        <input
          type="text"
          placeholder="Enter the Task..."
          value={newTask}
          onChange={handleChange}
          className="border-blue-900"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  );
};

export default TodoList;
