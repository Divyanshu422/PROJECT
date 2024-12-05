import React, { useEffect, useState } from "react";
import apiClient from "../../../../../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import AddQuestion from "./AddQuestion";
import DeleteQuestion from "./DeleteQuestion";
import UpdateQuestion from "./UpdateQuestion";
import { FaEdit, FaTrash } from "react-icons/fa";
const ChatBotQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        "/ADMIN-SERVICE/get-all-chatbot-ques"
      );
      setQuestions(response?.data || []);
      console.log(response?.data);
    } catch (error) {
      toast.error("Server Issue");
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const updatedStatus = currentStatus === "active" ? "inactive" : "active";
    setQuestions((prevQuestions) =>
      prevQuestions.map((item) =>
        item.chatbotQuesId === id ? { ...item, status: updatedStatus } : item
      )
    );
    console.log(`Toggled status for ID: ${id} to ${updatedStatus}`);
  };

  const handleAddQuestion = async (newQuestion) => {
    try {
      const response = await apiClient.post("/ADMIN-SERVICE/add-chatbot-ques", {
        question: newQuestion,
      });
      if (response.status === 200) {
        toast.success("Question added successfully!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to add question.");
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await apiClient.delete(
        `/ADMIN-SERVICE/delete-chatbot-ques/?chatbotQuesId=${id}`
      );
      toast.success("Question deleted successfully!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete question.");
    }
  };

  const handleUpdateQuestion = async (id, updatedQuestion) => {
    try {
      await apiClient.put(`/ADMIN-SERVICE/update_chatbot-ques/`, {
        chatbotQuesId: `${id}`,
        question: updatedQuestion,
        status: "Active",
      });
      toast.success("Question updated successfully!");
      fetchData();
    } catch (error) {
      toast.error("Failed to update question.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-6">
        Welcome to ChatBot Questions
      </h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Add Question
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Serial No.
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Question
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.length > 0 ? (
              questions.map((item, index) => (
                <tr
                  key={item.chatbotQuesId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{item.question}</td>
                  <td className="px-6 py-4">
                    <Toggle
                      id={`status-toggle-${item.chatbotQuesId}`}
                      checked={item.status === "active"}
                      onChange={() =>
                        handleToggleStatus(item.chatbotQuesId, item.status)
                      }
                      icons={false}
                      className={`w-16 h-8 rounded-full ${
                        item.status === "active"
                          ? "bg-green-500"
                          : "bg-gray-600"
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4 flex space-x-4">
                    <button
                      onClick={() => {
                        setSelectedQuestion(item);
                        setIsUpdateModalOpen(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                      <FaEdit className="mr-1" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedQuestion(item);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-600">
                  No questions available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && (
        <AddQuestion
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddQuestion}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteQuestion
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            handleDeleteQuestion(selectedQuestion.chatbotQuesId);
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateQuestion
          onClose={() => setIsUpdateModalOpen(false)}
          question={selectedQuestion}
          onSubmit={(updatedQuestion) => {
            handleUpdateQuestion(
              selectedQuestion.chatbotQuesId,
              updatedQuestion
            );
            setIsUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ChatBotQuestion;
