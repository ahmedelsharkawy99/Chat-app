// Packages

// Types and Schemas

// Data and styles
import "./spinner.css";

// Functions and Hooks

// Components

const Spinner: React.FC<{
  borderColor?: string;
  loaderColor?: string;
  width?: string;
}> = ({ borderColor, loaderColor, width }) => (
  <div
    className="loader"
    style={{
      borderColor: borderColor,
      borderTopColor: loaderColor,
      width,
      height: width,
    }}
  ></div>
);

export default Spinner;
