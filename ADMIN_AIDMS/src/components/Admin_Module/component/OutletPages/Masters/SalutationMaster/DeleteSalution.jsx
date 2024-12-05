import React from "react";
import apiClient from "../../../../../../services/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteSalutation = ({
  isOpen,
  closeModal,
  salutationId, // This should receive salutationID from the parent
  deleteSalutation,
}) => {
  const handleDelete = async () => {
    try {
      // Use the salutationId directly in the request URL
      await apiClient.delete(
        `/ADMIN-SERVICE/delete-salutation?salutationId=${salutationId}`
      );
      toast.success("Salutation deleted successfully");

      // Notify parent component to update the state
      deleteSalutation(salutationId);
      closeModal();
    } catch (error) {
      toast.error("Server Side error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeleteSalutation;
