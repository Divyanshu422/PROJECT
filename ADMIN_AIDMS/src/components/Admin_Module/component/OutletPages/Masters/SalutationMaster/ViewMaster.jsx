import React from "react";

const ViewSalutation = ({
  isOpen,
  closeModal,
  salutationName,
  salutationShortCode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          View Salutation
        </h2>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Field
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-sm font-medium text-gray-600">
                Salutation Name
              </td>
              <td className="px-4 py-2 text-sm font-medium text-gray-800">
                {salutationName}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-sm font-medium text-gray-600">
                Salutation Short Code
              </td>
              <td className="px-4 py-2 text-sm font-medium text-gray-800">
                {salutationShortCode}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <button
            onClick={closeModal}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSalutation;
