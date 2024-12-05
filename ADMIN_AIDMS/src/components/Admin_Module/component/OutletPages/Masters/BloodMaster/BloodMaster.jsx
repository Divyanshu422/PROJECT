import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // Default toggle styles
import apiClient from "../../../../../../services/apiClient";
import UpdateBlood from "./UpdateBlood";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BloodMaster = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bloodName, setBloodName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddBloodName = async () => {
    try {
      const response = await apiClient.post(`ADMIN-SERVICE/add-blood-group`, {
        bloodGroupName: bloodName,
      });
      console.log(response);
    } catch (error) {
      toast.error("Server Not working");
    }
    closeModal();
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await apiClient.get("/ADMIN-SERVICE/get-all-blood-group");
    setRowData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setRowData((prevData) =>
      prevData.map((item) =>
        item.bloodGroupId === id ? { ...item, status: newStatus } : item
      )
    );
    console.log(`Toggled ${id} to ${newStatus}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center flex-grow">
          Blood Master
        </h1>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Add Blood Name
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
                Blood Group Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-600">
                  Loading...
                </td>
              </tr>
            ) : (
              rowData.map((item, index) => (
                <tr
                  key={item.bloodGroupId}
                  className={`border-b last:border-none ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {item.bloodGroupName}
                  </td>
                  <td className="px-6 py-4">
                    <Toggle
                      id={`status-toggle-${item.bloodGroupId}`}
                      checked={item.status === "active"}
                      onChange={() =>
                        handleToggleStatus(item.bloodGroupId, item.status)
                      }
                      icons={false}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => console.log("View", item)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                      >
                        <FaEye className="mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => console.log("Edit", item)}
                        className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-200"
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => console.log("Delete", item.bloodGroupId)}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UpdateBlood
          title="Add Blood Name"
          onClose={closeModal}
          onSave={handleAddBloodName}
        >
          <label className="block text-gray-700 font-medium mb-2">
            Blood Name
          </label>
          <input
            type="text"
            value={bloodName}
            onChange={(e) => setBloodName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter blood group name"
          />
        </UpdateBlood>
      )}
      <ToastContainer />
    </div>
  );
};

export default BloodMaster;
