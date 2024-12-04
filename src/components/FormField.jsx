import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const FormField = ({ field }) => {
  // Get form context methods and error state
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label
        htmlFor={field.name}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {field.label}
      </label>
      <input
        type={field.type}
        id={field.name}
        {...register(field.name, {
          required: field.required ? `${field.label} is required` : false,
        })}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors[field.name] ? "border-red-500" : ""
        }`}
      />
      {errors[field.name] && (
        <p className="text-red-500 text-xs italic">
          {errors[field.name].message}
        </p>
      )}
    </div>
  );
};

// PropTypes for type checking
FormField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default FormField;
