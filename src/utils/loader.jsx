import { redirect } from "react-router-dom";
import { Cookies } from "react-cookie";

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
