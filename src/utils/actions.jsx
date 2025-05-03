import { Cookies } from "react-cookie";

// CONSTANTS
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const userData = {
    name: formData.get("first_name") + " " + formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch(`${API_URL}/users/sign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data, "data");
      return { error: data.message || "Signup failed!" };
    }

    console.log("signup success. Proceed to login");
    return { success: true, message: "Signup successful!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const signInAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log(response, "response");
    console.log(data, "data");

    if (!response.ok) {
      return { error: data.message || "Login failed!" };
    }

    const cookies = new Cookies();
    cookies.set("jwt", data.token, {
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
    });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong. Please try again!" };
  }
};
