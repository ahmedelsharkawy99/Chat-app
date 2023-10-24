// Packages
import { lazy } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

// Types and Schemas

// Data and styles

// Functions and Hooks

// Components
import AuthRoutes from "./AuthRoutes";
import UnAuthRoutes from "./UnAuthRoutes";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Error = lazy(() => import("../pages/Error/Error"));

const Routes = () => {
  const authRoutes: RouteObject[] = [
    {
      path: "/",
      element: <AuthRoutes />,
      children: [{ index: true, element: <Home /> }],
    },
  ];

  const unAuthRoutes: RouteObject[] = [
    {
      path: "/",
      element: <UnAuthRoutes />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Register /> },
      ],
    },
  ];

  const errorRoutes: RouteObject = { path: "*", element: <Error /> };

  const router = createBrowserRouter([
    ...authRoutes,
    ...unAuthRoutes,
    errorRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
