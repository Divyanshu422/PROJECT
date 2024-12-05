import React from "react";
import apiClient from "../../../../../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DeleteAnswer = ({ answer, onClose, onSuccess }) => {
  const handleDelete = async () => {
    try {
      // Replace with your API call
      await apiClient.delete(
        `/ADMIN-SERVICE/delete-chatbot-ans?chatbotAnsId=${answer.chatbotAnsId}`
      );
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Answer</h2>
        <p>Are you sure you want to delete this answer?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnswer;
