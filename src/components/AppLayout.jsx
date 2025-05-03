import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useUser } from "../UserContext"; // ✅ Import from context
import { Cookies } from "react-cookie";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading, refreshUser, logout } = useUser();

  const hasCheckedAuth = useRef(false); // ✅ Prevents re-executing `checkAuth()`

  useEffect(() => {
    const cookies = new Cookies();

    if (hasCheckedAuth.current) return; // ✅ Prevents re-triggering
    hasCheckedAuth.current = true; // ✅ Mark as checked

    console.log("Checking authentication...");

    const checkAuth = async () => {
      const token = cookies.get("jwt");

      if (!token) {
        console.log("No JWT found, redirecting to login...");
        logout();
        navigate("/auth/signin", { replace: true });
        return;
      }

      try {
        console.log("Fetching user...");
        await refreshUser(); // ✅ Fetch user authentication state
        console.log("User fetched!");

        if (location.pathname.startsWith("/auth")) {
          navigate("/", { replace: true }); // ✅ Redirect if logged in
        }
      } catch (error) {
        console.error("Error during auth check:", error);
        logout();
        navigate("/auth/signin", { replace: true });
      }
    };

    checkAuth();
  }, [refreshUser, logout, navigate, location.pathname]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
