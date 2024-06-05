import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { Loader2 } from "lucide-react";
import { RecoilRoot, useRecoilValue } from "recoil";
import {
  isLoggedInAtom,
  isUserLoadingAtom,
  userRoleAtom,
} from "./atoms/userData";
import { ThemeProvider } from "./components/theme-provider";

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
  const userRole = useRecoilValue(userRoleAtom);
  const isLoading = useRecoilValue(isUserLoadingAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !roles.includes(userRole)) {
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
            <Loader2 className="mx-auto  h-10 w-10 animate-spin dark:text-zinc-50" />
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
            <Loader2 className="mx-auto  h-10 w-10 animate-spin dark:text-zinc-50" />
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
                <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
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
                  <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
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
                  <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
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
                  <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
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
                <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
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
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </ThemeProvider>
);
