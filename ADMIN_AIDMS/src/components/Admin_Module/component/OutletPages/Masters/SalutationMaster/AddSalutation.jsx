import React, { useState } from "react";
import apiClient from "../../../../../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSalutation = ({ isOpen, closeModal, addSalutation }) => {
  const [salutationName, setSalutationName] = useState("");
  const [salutationShortCode, setSalutationShortCode] = useState("");

  const handleSubmit = async () => {
    // Here you can make an API call to post the data
    console.log("Salutation Name:", salutationName);
    console.log("Salutation Short Code:", salutationShortCode);

    // Close the modal after submitting
    addSalutation(salutationName, salutationShortCode);
    try {
      const response = await apiClient.post(`ADMIN-SERVICE/add-salutation`, {
        salutationName: salutationName,
        salutationShortCode: salutationShortCode,
      });
      console.log(response);
    } catch (error) {
      toast.error("Server Not working");
    }

    closeModal();
  };

  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click on modal from closing it
      >
        <h2 className="text-2xl font-semibold mb-4">Add Salutation</h2>
        <div className="mb-4">
          <label
            htmlFor="salutationName"
            className="block text-sm font-medium text-gray-700"
          >
            Salutation Name
          </label>
          <input
            type="text"
            id="salutationName"
            value={salutationName}
            onChange={(e) => setSalutationName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter salutation name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="salutationShortCode"
            className="block text-sm font-medium text-gray-700"
          >
            Salutation Short Code
          </label>
          <input
            type="text"
            id="salutationShortCode"
            value={salutationShortCode}
            onChange={(e) => setSalutationShortCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter salutation short code"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300"
          >
            ADD
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSalutation;
