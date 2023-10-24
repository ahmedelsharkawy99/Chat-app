// Packages
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Types and Schemas
import { FirebaseError } from "firebase/app";

// Data and styles
import "./navbar.css";

// Functions and Hooks
import { logout } from "../../firebase/handlers/auth";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuthContext();
  const clickHandler = async () => {
    try {
      await logout();
      setCurrentUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
    }
  };

  return (
    <nav className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src={currentUser?.photoURL || ""}
          alt={`${currentUser?.displayName} pic`}
          loading="lazy"
        />
        <span>{currentUser?.displayName}</span>
        <button onClick={clickHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
