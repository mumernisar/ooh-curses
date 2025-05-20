import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useUser } from "../UserContext"; 
import { Cookies } from "react-cookie";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser, logout } = useUser();

  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    const cookies = new Cookies();

    if (hasCheckedAuth.current) return; 
    hasCheckedAuth.current = true; 


    const checkAuth = async () => {
      const token = cookies.get("jwt");

      if (!token) {
        logout();
        navigate("/auth/signin", { replace: true });
        return;
      }

      try {
        await refreshUser(); 

        if (location.pathname.startsWith("/auth")) {
          navigate("/", { replace: true }); 
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
