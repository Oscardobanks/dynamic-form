import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormField from "../components/FormField";
import FormSelection from "../components/FormSelection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProgressBar from "../components/ProgressBar";
import { apiResponses } from "../api/Api";
import useAppContext from "../hooks/useAppContext";

const DynamicForm = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const { setSubmittedData } = useAppContext();
  const [formType, setFormType] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler for form type selection changes
  const handleFormTypeChange = (e) => {
    const selectedFormType = e.target.value;
    setFormType(selectedFormType);
    const fields = apiResponses[selectedFormType]?.fields || [];
    setFormFields(fields);
    methods.reset(); // Reset the form when the form type changes
  };

  // Form submission handler
  const onSubmit = (data) => {

    // Check if the key exists in submittedData, if not create an empty array
    setSubmittedData((prevData) => ({
      ...prevData,
      [formType]: [...(prevData[formType] || []), data],
    }));
    methods.reset();
    toast.success("Form submitted successfully!");
    setIsSubmitted(true);
    setIsSubmitted(false);
    navigate("/home"); // Navigate to the home page after successful submission
  };

  // Watch all relevant fields to determine the progress
  const watchedFields = methods.watch();

  // Calculate progress based on filled fields
  const progress =
    (formFields.filter((field) => {
      return (
        watchedFields[field.name] !== undefined &&
        watchedFields[field.name] !== ""
      );
    }).length /
      formFields.length) *
    100;

  return (
    <div
      className={`flex justify-center min-h-screen bg-white ${
        formType ? "lg:items-center items-start lg:pt-0 pt-20" : "pt-20"
      }`}
    >
      <div className="max-w-md w-full h-fit p-6 bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Dynamic Form</h1>

        <FormSelection onChange={handleFormTypeChange} />

        {formType && (
          <>
            <ProgressBar progress={progress} />
          </>
        )}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {formFields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
            {formType && (
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition
              disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitted}
              >
                Submit
              </button>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
export default DynamicForm;
