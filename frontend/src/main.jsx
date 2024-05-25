import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AddBook from "./pages/AddBook";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";
import EditBook from "./pages/EditBook";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import NotFound from "./components/NotFound";
import FavouriteBooks from "./pages/FavouriteBooks";
import Users from "./pages/Users";

const ProtectedRoute = ({ children, roles }) => {
  const { role, isLoading, isLoggedIn } = useAuth("protecroute");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !roles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/books/" replace />,
      },
      {
        path: "/books",
        element: <Homepage />,
      },
      {
        path: "/books/add",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AddBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favourites",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <FavouriteBooks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/books/:id",
        element: <Details />,
      },
      {
        path: "/books/:id/edit",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <EditBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
