import React, { useState, useEffect } from "react";
import apiClient from "../../../../../../services/apiClient";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Default toggle styles
import AddSalutation from "./AddSalutation";
import DeleteSalutation from "./DeleteSalution";
import UpdateSalutation from "./UpdateSalution";
import ViewSalutation from "./ViewMaster";

const SalutationMaster = () => {
  const [rowData, setRowData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSalutation, setSelectedSalutation] = useState(null);
  console.log(rowData);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openDeleteModal = (salutation) => {
    console.log(salutation);
    setSelectedSalutation(salutation);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openViewModal = (salutation) => {
    setSelectedSalutation(salutation);
    setIsViewModalOpen(true);
  };
  const closeViewModal = () => setIsViewModalOpen(false);

  const openUpdateModal = (salutation) => {
    setSelectedSalutation(salutation);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);

  const addSalutation = (salutationName, salutationShortCode) => {
    const newSalutation = {
      salutationID: Date.now(), // Use salutationID instead of id
      salutationName,
      salutationShortCode,
      status: "active",
    };
    setRowData((prev) => [...prev, newSalutation]);
  };

  const deleteSalutation = (salutationID) => {
    setRowData((prev) =>
      prev.filter((item) => item.salutationID !== salutationID)
    );
  };

  const updateSalutation = (
    salutationID,
    salutationName,
    salutationShortCode
  ) => {
    setRowData((prev) =>
      prev.map((item) =>
        item.salutationID === salutationID
          ? { ...item, salutationName, salutationShortCode }
          : item
      )
    );
  };

  // Toggle the status (active/inactive) for a specific row
  const handleToggleStatus = async (salutationID, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";

      setRowData((prevRowData) =>
        prevRowData.map((item) =>
          item.salutationID === salutationID
            ? { ...item, status: updatedStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/ADMIN-SERVICE/salutation");
      setRowData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Salutation Master
        </h1>
        <button
          onClick={openAddModal}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none transition duration-300"
        >
          Add Salutation
        </button>
      </div>

      <div className="overflow-x-auto bg-white p-5 rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Sr No</th>
              <th className="px-4 py-2 text-left">Salutation Name</th>
              <th className="px-4 py-2 text-left">Salutation Short Code</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((item, index) => (
              <tr key={item.salutationID} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.salutationName}</td>
                <td className="px-4 py-2">{item.salutationShortCode}</td>
                <td className="px-4 py-2">
                  <Toggle
                    id={`status-toggle-${item.salutationID}`} // Use salutationID here
                    checked={item.status === "active"}
                    onChange={() =>
                      handleToggleStatus(item.salutationID, item.status)
                    } // Pass salutationID here
                    icons={false}
                    className={`w-16 h-8 rounded-full ${
                      item.status === "active" ? "bg-green-500" : "bg-gray-600"
                    }`}
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-start space-x-4">
                    <button
                      onClick={() => openViewModal(item)}
                      className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600"
                    >
                      <FaEye className="mr-1" />
                    </button>

                    <button
                      onClick={() => openUpdateModal(item)}
                      className="flex items-center bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-yellow-600"
                    >
                      <FaEdit className="mr-1" />
                    </button>

                    <button
                      onClick={() => openDeleteModal(item.salutationID)}
                      className="flex items-center bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600"
                    >
                      <FaTrash className="mr-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSalutation
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        addSalutation={addSalutation}
      />

      <DeleteSalutation
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        salutationId={selectedSalutation?.salutationID} // Make sure this is salutationID, not id
        deleteSalutation={deleteSalutation}
      />

      <ViewSalutation
        isOpen={isViewModalOpen}
        closeModal={() => setIsViewModalOpen(false)}
        salutationName={selectedSalutation?.salutationName}
        salutationShortCode={selectedSalutation?.salutationShortCode}
      />

      <UpdateSalutation
        isOpen={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
        salutationID={selectedSalutation?.salutationID}
        salutationName={selectedSalutation?.salutationName}
        salutationShortCode={selectedSalutation?.salutationShortCode}
        updateSalutation={updateSalutation}
      />
    </div>
  );
};

export default SalutationMaster;
