import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
      <div
        className="h-2 rounded-full"
        style={{
          width: `${progress}%`,
          transition: "width 0.5s ease",
          backgroundColor: `${
            progress < 40 ? "red" : progress > 80 ? "green" : "orange"
          }`,
        }}
      />
      <p className="text-sm text-gray-600">{Math.round(progress)}% completed</p>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
