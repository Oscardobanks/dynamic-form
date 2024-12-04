import PropTypes from "prop-types";
import { useState } from "react";

const DataTable = ({ data, onEdit, onDelete, headers }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (item, index) => {
    setEditingRow(index);
    setEditedData(item);
  };

  const handleSave = (index) => {
    onEdit(editedData, index);
    setEditingRow(null);
  };

  const handleInputChange = (header, value) => {
    setEditedData((prev) => ({
      ...prev,
      [header.name]: value,
    }));
  };

  // Check if there's data to display
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm leading-normal">
            {headers.map((header, index) => (
              <th
                key={index}
                className="py-3 px-6 md:text-left text-center border-b border-gray-300"
              >
                {header.label}
              </th>
            ))}
            <th className="py-3 px-6 md:text-left text-center border-b border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              {headers.map((header, i) => (
                <td key={i} className="py-3 px-6">
                  {editingRow === index ? (
                    <input
                      type="text"
                      value={editedData[header.name] || ""}
                      onChange={(e) =>
                        handleInputChange(header, e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item[header.name]
                  )}
                </td>
              ))}
              <td className="py-3 px-6 flex space-x-4">
                {editingRow === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="font-semibold text-green-500 hover:text-green-700 border border-green-500 hover:border-green-700 rounded px-2 py-1"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item, index)}
                    className="font-semibold text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 rounded px-2 py-1"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => onDelete(index)}
                  className="font-semibold text-white hover:bg-red-600 bg-red-500 rounded px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//prop types for DataTable
DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
