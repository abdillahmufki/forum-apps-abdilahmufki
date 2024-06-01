import PropTypes from "prop-types";

function Button({ title }) {
  return (
    <button type="button" className="btn btn-primary ms-auto">
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired, // Assuming title is a required string
};

export default Button;
