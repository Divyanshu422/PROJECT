import React, { useState, useEffect } from "react";
import apiClient from "../../../../../../services/apiClient";
import Toggle from "react-toggle";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAnswer from "./AddAnswer";
import DeleteAnswer from "./DeleteAnswer";
import UpdateAnswer from "./UpdateAnswer";
import "react-toggle/style.css";

const ChatBotAnswer = () => {
  const [answers, setAnswers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        "/ADMIN-SERVICE/get-all-chatbot-ans"
      );
      setAnswers(response?.data || []);
      console.log("Fetched answers:", response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Server Issue");
    }
  };

  // Toggle status handler
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      console.log(
        `Updating status for ID: ${id}, Current: ${currentStatus}, New: ${newStatus}`
      );

      const response = await apiClient.put(
        `/ADMIN-SERVICE/update-status/${id}`,
        {
          status: newStatus,
        }
      );

      console.log("API Response:", response?.data);

      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.chatbotAnsId === id ? { ...answer, status: newStatus } : answer
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status. Please try again.");
    }
  };

  // Open modals
  const handleAddAnswer = () => setAddModalOpen(true);
  const handleDeleteAnswer = (answer) => {
    setSelectedAnswer(answer);
    setDeleteModalOpen(true);
  };
  const handleUpdateAnswer = (answer) => {
    setSelectedAnswer(answer);
    setUpdateModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Bot Answer
        </h1>
        <button
          onClick={handleAddAnswer}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow-md"
        >
          Add an Answer
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Serial No.
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Answer
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {answers.map((item, index) => (
              <tr key={item.chatbotAnsId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 text-sm">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700 text-sm">
                  {item.chatbotAns}
                </td>
                <td className="py-3 px-4">
                  <Toggle
                    id={`status-toggle-${item.chatbotAnsId}`}
                    checked={item.status === "active"}
                    onChange={() =>
                      handleToggleStatus(item.chatbotAnsId, item.status)
                    }
                    icons={false}
                    className={`w-16 h-8 rounded-full ${
                      item.status === "active" ? "bg-green-500" : "bg-gray-600"
                    }`}
                  />
                </td>
                <td className="py-3 px-4 flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdateAnswer(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteAnswer(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddAnswer
          onClose={() => setAddModalOpen(false)}
          onSuccess={fetchData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAnswer
          answer={selectedAnswer}
          onClose={() => setDeleteModalOpen(false)}
          onSuccess={fetchData}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateAnswer
          answer={selectedAnswer}
          onClose={() => setUpdateModalOpen(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default ChatBotAnswer;
