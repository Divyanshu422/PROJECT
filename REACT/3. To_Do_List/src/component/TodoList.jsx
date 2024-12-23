import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    "Eat Breakfast",
    "Take Shower",
    "Walk the Dog",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };
  const handleAdd = () => {
    if (newTask.trim() !== "") {
      // we need to add the task in the handleButton
      setTasks((prev) => [...prev, newTask]);
      // After adding the task we set the input box to empty string:
      setNewTask("");
    }
  };
  const deleteTask = (key) => {
    // In this code block, we will remove a task from the `tasks` state variable.
    // To do this, we create a new array called `updatedTasks`, which includes all items except the one at the specified delete index. [Filter method]
    // We then assign `updatedTasks` back to the `tasks` state variable to update the list.
    const updateTask = tasks.filter((task, index) => {
      return index !== key;
    });
    setTasks(updateTask);
  };
  const moveTaskUp = (index) => {
    // Check if the current index is greater than 0; only then swapping is allowed
    // (since the first item has no item above it).
    if (index > 0) {
      // Create a new array `updatedArray` by copying the current tasks array.
      const updatedArray = [...tasks];

      // Swap the item at `index` with the item directly above it (`index - 1`).
      [updatedArray[index], updatedArray[index - 1]] = [
        updatedArray[index - 1],
        updatedArray[index],
      ];

      // Update the tasks state with the modified `updatedArray`.
      setTasks(updatedArray);
    }
  };
  const moveTaskDown = (index) => {
    // Check if the current index is less than the last index of the tasks array.
    if (index < tasks.length - 1) {
      // Create a new array `updatedArray` by copying the current tasks array.
      const updatedArray = [...tasks];
      [updatedArray[index], updatedArray[index + 1]] = [
        updatedArray[index + 1],
        updatedArray[index],
      ];

      setTasks(updatedArray);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center font-serif">
      <div className="w-96 p-4 bg-red-50 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">ToDo-List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Enter the Task..."
            value={newTask}
            onChange={handleChange}
            className="flex-grow px-4 py-2 border border-blue-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Mapping the todo list */}
      <ol className="mt-6 space-y-2 w-96">
        {tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">{task}</span>
              <div className="space-x-2">
                <button
                  onClick={() => deleteTask(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => moveTaskUp(index)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  👍
                </button>
                <button
                  onClick={() => moveTaskDown(index)}
                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  👎
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TodoList;
