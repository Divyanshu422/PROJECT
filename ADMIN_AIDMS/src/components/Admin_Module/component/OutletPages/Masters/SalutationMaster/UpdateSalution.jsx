import React, { useState } from "react";
import apiClient from "../../../../../../services/apiClient";
import { toast } from "react-toastify"; // For success/error notifications

const UpdateSalutation = ({
  isOpen,
  closeModal,
  salutationId,
  salutationName,
  salutationShortCode,
  updateSalutation,
}) => {
  const [newSalutationName, setNewSalutationName] = useState(salutationName);
  const [newSalutationShortCode, setNewSalutationShortCode] =
    useState(salutationShortCode);

  const handleUpdate = async () => {
    if (!newSalutationName || !newSalutationShortCode) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const response = await apiClient.put(
        `/ADMIN-SERVICE/salutation/${salutationId}`,
        {
          salutationName: newSalutationName,
          salutationShortCode: newSalutationShortCode,
        }
      );
      updateSalutation(salutationId, newSalutationName, newSalutationShortCode); // Update the state in parent component
      closeModal();
      toast.success("Salutation updated successfully");
    } catch (error) {
      toast.error("Error updating salutation");
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
        <h2 className="text-xl font-semibold mb-4">Update Salutation</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Salutation Name
          </label>
          <input
            type="text"
            value={newSalutationName}
            onChange={(e) => setNewSalutationName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter new salutation name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Salutation Short Code
          </label>
          <input
            type="text"
            value={newSalutationShortCode}
            onChange={(e) => setNewSalutationShortCode(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter new short code"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalutation;
