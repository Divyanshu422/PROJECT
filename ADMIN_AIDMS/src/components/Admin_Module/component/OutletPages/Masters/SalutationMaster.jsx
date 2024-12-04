import React, { useState, useEffect } from "react";
import apiClient from "../../../../../services/apiClient";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const SalutationMaster = () => {
  const [rowData, setRowData] = useState([]);

  const [columnDefs] = useState([
    { headerName: "Sr No", valueGetter: "node.rowIndex + 1", width: 100 },
    { headerName: "Salutation Name", field: "salutationName", width: 200 },
    {
      headerName: "Salutation Short Code",
      field: "salutationShortCode",
      width: 200,
    },
    {
      headerName: "Status",
      field: "status",
      cellRendererFramework: (params) => (
        <label className="flex items-center">
          <input
            type="checkbox"
            className="toggle-checkbox"
            checked={params.value === "active"}
            onChange={() =>
              console.log(`Toggled status for ${params.data.salutationName}`)
            }
          />
          <span className="toggle-slider"></span>
        </label>
      ),
      width: 150,
    },
    {
      headerName: "Action",
      field: "action",
      cellRendererFramework: (params) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
            onClick={() => console.log(`View ${params.data.salutationName}`)}
          >
            View
          </button>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
            onClick={() => console.log(`Edit ${params.data.salutationName}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            onClick={() => console.log(`Delete ${params.data.salutationName}`)}
          >
            Delete
          </button>
        </div>
      ),
      width: 200,
    },
  ]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/ADMIN-SERVICE/salutation`); // Replace with your API endpoint
        setRowData(response); // Store API response in state
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="ag-theme-alpine p-5 rounded-lg border shadow-lg bg-gray-100"
      style={{ height: 400, width: "80%", margin: "auto" }}
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Salutation Master
      </h1>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
};

export default SalutationMaster;
