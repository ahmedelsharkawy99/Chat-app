import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Routes from "./routes";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="dark"
      />
    </>
  );
}

export default App;
