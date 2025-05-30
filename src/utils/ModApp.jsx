import React, { useEffect, useRef } from "react";
import { useUser } from "../UserContext.jsx";
import { Cookies } from "react-cookie";
import { RouterProvider } from "react-router-dom";

import LoaderFull from "../components/LoaderFull.jsx";
import Error from "../pages/Error.jsx";

function ModApp({ router }) {
  let { isLoading, error, refreshUser, logout } = useUser();

  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    const cookies = new Cookies();
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;
    const checkAuth = async () => {
      const token = cookies.get("jwt");

      if (!token) {
        logout();
        return;
      }
      try {
        await refreshUser();
      } catch (error) {
        console.error("Error during auth check:", error);
        logout();
      }
    };
    checkAuth();
  }, [refreshUser, logout]);

  if (isLoading) {
    return <LoaderFull />;
  } else if (error) {
    return <Error message={error} />;
  }
  return <RouterProvider router={router} />;
}

export default ModApp;
