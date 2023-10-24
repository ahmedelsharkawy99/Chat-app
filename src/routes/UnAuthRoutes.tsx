// Packages
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Types and Schemas

// Data and styles

// Functions and Hooks
import useAuthContext from "../hooks/useAuthContext/useAuthContext";

// Components
import Spinner from "../components/Shared/Spinner/Spinner";

const UnAuthRoutes: React.FC = () => {
  const { currentUser } = useAuthContext();
  if (currentUser) return <Navigate to="/" replace={true} />;

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner width="80px" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default UnAuthRoutes;
