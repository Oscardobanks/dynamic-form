import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  // State to store all submitted form data
  const [submittedData, setSubmittedData] = useState({
    userInfo: [],
    addressInfo: [],
    paymentInfo: [],
  });

  // Handler to edit existing entries
  const handleEdit = (typeKey, index, newData) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      [typeKey]: prevData[typeKey].map((item, i) =>
        i === index ? { ...item, ...newData } : item
      ),
    }));
    toast.success('Changes saved successfully!')
  };

  // Handler to delete entries
  const handleDelete = (typeKey, index) => {
    setSubmittedData((prevData) => ({
      ...prevData,
      [typeKey]: prevData[typeKey].filter((_, i) => i !== index),
    }));
    toast.success('Entry deleted successfully!')
  };

  return (
    <AppContext.Provider
      value={{ submittedData, setSubmittedData, handleEdit, handleDelete }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Export both context and provider
export { AppProvider, AppContext };
