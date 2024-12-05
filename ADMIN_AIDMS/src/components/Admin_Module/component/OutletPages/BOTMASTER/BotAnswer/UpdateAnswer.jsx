import React, { useState } from "react";
import apiClient from "../../../../../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateAnswer = ({ answer, onClose, onSuccess }) => {
  const [updatedAnswer, setUpdatedAnswer] = useState(answer.chatbotAns);

  const handleUpdate = async () => {
    try {
      // Replace this with your API call
      await apiClient.put(`/ADMIN-SERVICE/update-chatbot-ans/`, {
        chatbotAnsId: `${answer.chatbotAnsId}`,
        chatbotAns: updatedAnswer,
        status: "inactive",
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to update answer");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Update Answer</h2>
        <input
          type="text"
          value={updatedAnswer}
          onChange={(e) => setUpdatedAnswer(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAnswer;
