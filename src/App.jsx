import React, { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { UserProvider, useUser } from "./UserContext.jsx";
import { signUpAction, signInAction } from "./utils/actions";
import { LogProvider } from "./LogContext";
import LoaderFull from "./components/LoaderFull";

const AppLayout = lazy(() => import("./components/AppLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthLayout = lazy(() => import("./pages/AuthLayout"));
const SignIn = lazy(() => import("./components/Signin"));
const SignUp = lazy(() => import("./components/Signup"));
const Error = lazy(() => import("./pages/Error"));
const Character = lazy(() => import("./pages/Character"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      hydrateFallbackElement: <LoaderFull />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/character",
          element: <Character />,
        },
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            {
              path: "signin",
              element: <SignIn />,
              action: signInAction,
            },
            {
              path: "signup",
              element: <SignUp />,
              action: signUpAction,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ],
  {
    hydrateFallback: (
      <div className="flex h-screen items-center justify-center">
        <div className="loader h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
        <p>Loading...</p>
      </div>
    ),
  },
);

function AppWithAuth() {
  let { isLoading, error } = useUser();
  console.log(isLoading, "isLoading");
  isLoading = isLoading ? false : isLoading;
  if (isLoading) {
    return <LoaderFull />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <LogProvider>
          <Suspense fallback={<LoaderFull />}>
            <AppWithAuth />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Suspense>
        </LogProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
