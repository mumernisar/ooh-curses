import { createContext, useContext, useReducer } from "react";
import { Cookies } from "react-cookie";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const UserContext = createContext();

const initialState = {
  user: null,
  isLoading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      console.log("loading...");
      return { ...state, isLoading: true, error: null };

    case "user/login":
      console.log("user/login");
      return { ...state, isLoading: false, user: action.payload, error: null };

    case "user/logout":
      return { ...state, isLoading: false, user: null, error: null };

    case "user/update":
      return { ...state, isLoading: false, user: action.payload, error: null };

    case "user/error":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookies = new Cookies();

  const refreshUser = async () => {
    const cookie = new Cookies();

    console.log("refreshUser called");
    dispatch({ type: "loading" });

    const token = cookie.get("jwt");

    if (!token) {
      dispatch({ type: "user/logout" });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/users/verifyToken`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid token");
      }
      console.log("user/login", data, "verify/token");

      dispatch({ type: "user/login", payload: data.user });
      return { success: true, data: data.user };
    } catch (error) {
      console.log(error);
      dispatch({ type: "user/error", payload: error.message });
      cookie.remove("jwt");
      return { success: false, data: error.message };
    }
  };
  async function login() {
    return await refreshUser();
  }

  function logout() {
    cookies.remove("jwt");
    dispatch({ type: "user/logout" });
  }

  function updateCharacter(user) {
    dispatch({ type: "user/update", payload: user });
  }

  async function updateUser(updates) {
    const token = cookies.get("jwt");

    if (!token) {
      console.error("No token available. User may not be authenticated.");
      return { success: false, error: "Unauthorized" };
    }

    try {
      dispatch({ type: "loading" });

      const response = await fetch(`${API_URL}/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Update failed:", data);
        dispatch({
          type: "user/error",
          payload: data.message || "Update failed",
        });
        return Promise.reject({
          success: false,
          error: data.message || "Update failed",
        });
      }

      dispatch({ type: "user/update", payload: data.user });

      return { success: true, data: data.user };
    } catch (error) {
      dispatch({ type: "user/error", payload: error.message });
      return Promise.reject({ success: false, error: error.message || error });
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        refreshUser,
        updateCharacter,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
