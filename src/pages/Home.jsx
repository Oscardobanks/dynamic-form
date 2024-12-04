import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import DataTable from "../components/Table";
import { apiResponses } from "../api/Api";

const Home = () => {
  const { submittedData, handleEdit, handleDelete } = useAppContext();
  const navigate = useNavigate();

  const handleEditData = (typeKey) => (item, index) => {
    handleEdit(typeKey, index, item);
  };

  const handleDeleteData = (typeKey) => (index) => {
    handleDelete(typeKey, index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Submitted Data</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Go Back to Form
        </button>
      </div>

      {submittedData.userInfo.length == 0 &&
        submittedData.addressInfo.length == 0 &&
        submittedData.paymentInfo.length == 0 && (
          <div className="text-center text-gray-500">No data available.</div>
        )}

      <DataTable
        data={submittedData.userInfo}
        onEdit={handleEditData("userInfo")}
        onDelete={handleDeleteData("userInfo")}
        headers={apiResponses.userInfo.fields.map((field) => field)}
      />

      <DataTable
        data={submittedData.addressInfo}
        headers={apiResponses.addressInfo.fields.map((field) => field)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DataTable
        data={submittedData.paymentInfo}
        headers={apiResponses.paymentInfo.fields.map((field) => field)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
