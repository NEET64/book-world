import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import useAuth from "./hooks/useAuth";
import { Loader2 } from "lucide-react";

const AddBook = lazy(() => import("./pages/AddBook"));
const Homepage = lazy(() => import("./pages/Homepage"));
const Details = lazy(() => import("./pages/Details"));
const EditBook = lazy(() => import("./pages/EditBook"));
const LoginForm = lazy(() => import("./pages/Login"));
const SignupForm = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./components/NotFound"));
const FavouriteBooks = lazy(() => import("./pages/FavouriteBooks"));
const Users = lazy(() => import("./pages/Users"));

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
    element: (
      <Suspense
        fallback={
          <div className="w-full grid items-center h-screen">
            <Loader2 className="mx-auto  h-10 w-10 animate-spin" />
          </div>
        }>
        <SignupForm />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense
        fallback={
          <div className="w-full grid items-center h-screen">
            <Loader2 className="mx-auto  h-10 w-10 animate-spin" />
          </div>
        }>
        <LoginForm />
      </Suspense>
    ),
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
        element: (
          <Suspense
            fallback={
              <div className="w-full">
                <Loader2 className="mx-auto h-10 w-10 animate-spin" />
              </div>
            }>
            <Homepage />
          </Suspense>
        ),
      },
      {
        path: "/books/add",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Suspense
              fallback={
                <div className="w-full">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin" />
                </div>
              }>
              <AddBook />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/favourites",
        element: (
          <ProtectedRoute roles={["user", "admin"]}>
            <Suspense
              fallback={
                <div className="w-full">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin" />
                </div>
              }>
              <FavouriteBooks />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Suspense
              fallback={
                <div className="w-full">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin" />
                </div>
              }>
              <Users />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/books/:id",
        element: (
          <Suspense
            fallback={
              <div className="w-full">
                <Loader2 className="mx-auto h-10 w-10 animate-spin" />
              </div>
            }>
            <Details />
          </Suspense>
        ),
      },
      {
        path: "/books/:id/edit",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Suspense
              fallback={
                <div className="w-full">
                  <Loader2 className="mx-auto h-10 w-10 animate-spin" />
                </div>
              }>
              <EditBook />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense
        fallback={
          <div className="w-full">
            <Loader2 className="mx-auto h-10 w-10 animate-spin" />
          </div>
        }>
        <NotFound />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
