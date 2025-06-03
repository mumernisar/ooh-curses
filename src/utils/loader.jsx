import { redirect } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useUser } from "../UserContext";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const loaderApp = ({ request }) => {
  console.log("loading...");

  const cookies = new Cookies();
  const token = cookies.get("jwt");

  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!token && !pathname.includes("/auth")) {
    return redirect("/auth/signin");
  }

  return null; // loader must return something
};

export const loaderGithub = async ({ request }) => {
  const url = new URL(request.url);
  const ins = url.searchParams.get("installation_id");
  if (!ins) return null;

  const data = await fetchData(`${API_URL}/github/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ installation_id: Number(ins) }),
  });

  return data;
};

const fetchData = async (url, options = {}) => {
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  if (!token) {
    return [];
  }
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await response.json();

  console.log(data, "data------");
  return data;
};
