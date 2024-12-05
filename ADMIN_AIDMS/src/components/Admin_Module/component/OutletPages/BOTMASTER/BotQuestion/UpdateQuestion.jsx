import React, { useState } from "react";

const UpdateQuestion = ({ onClose, question, onSubmit }) => {
  const [updatedQuestion, setUpdatedQuestion] = useState(question?.question);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Update Question</h2>
        <input
          type="text"
          value={updatedQuestion}
          onChange={(e) => setUpdatedQuestion(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter updated question"
        />
        <div className="flex space-x-4">
          <button
            onClick={() => onSubmit(updatedQuestion)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
