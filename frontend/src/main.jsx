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
import UserDetails from "./pages/UserDetails";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AddBook = lazy(() => import("./pages/AddBook"));
const Homepage = lazy(() => import("./pages/Homepage"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const EditBook = lazy(() => import("./pages/EditBook"));
const LoginForm = lazy(() => import("./pages/Login"));
const SignupForm = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
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
        path: "/users/:userId",
        element: (
          <Suspense
            fallback={
              <div className="w-full">
                <Loader2 className="mx-auto h-10 w-10 animate-spin dark:text-zinc-50" />
              </div>
            }>
            <UserDetails />
          </Suspense>
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
            <BookDetails />
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
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RecoilRoot>
        <Toaster
          gap="8"
          offset="20px"
          position="top-center"
          theme={"light"}
          richColors
        />
        <RouterProvider router={router} />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </ThemeProvider>
);
