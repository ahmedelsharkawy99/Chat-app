// Packages
import { Link } from "react-router-dom";

// Types and Schemas

// Data and styles
import "./error.css";

// Functions and Hooks
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components

const Error = () => {
  const { currentUser } = useAuthContext();
  return (
    <main className="page_404">
      <div className="container">
        <div className="col-sm-10 col-sm-offset-1  text-center">
          <div className="four_zero_four_bg">
            <h1 className="text-center ">404</h1>
          </div>

          <div className="contant_box_404">
            <h3 className="h2">Look like you're lost</h3>

            <p>the page you are looking for not avaible!</p>

            <Link to={currentUser ? "/" : "/login"} className="link_404">
              {currentUser ? "Go to Chat Page" : "Go to Login Page"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Error;
