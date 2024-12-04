import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const FormSelection = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Form Type");
  const dropdownRef = useRef(null);

  const options = [
    { value: "", label: "Select Form Type" },
    { value: "userInfo", label: "User Information" },
    { value: "addressInfo", label: "Address Information" },
    { value: "paymentInfo", label: "Payment Information" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    setIsActive(option.value);
    onChange({ target: { value: option.value } });
  };

  return (
    <div ref={dropdownRef} className="relative w-full min-w-[200px] mb-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 rounded bg-white cursor-pointer
        flex justify-between items-center hover:border-green-500 transition-colors"
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className={`w-full mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 ${
            selectedOption === "Select Form Type" ? "relative" : "absolute"
          }`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-2 cursor-pointer transition-colors ${
                isActive === option.value &&
                option.value !== "" &&
                "bg-green-300 text-white"
              } ${
                option.value === ""
                  ? "text-sm text-gray-400"
                  : "hover:bg-green-300 hover:text-white"
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FormSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FormSelection;
