import React, { useState, useRef } from "react";
import Loader from "./../components/Loader";
import { useNavigate } from "react-router-dom";
import { Form, Link, useActionData } from "react-router-dom";
import { useToast } from "../utils/useToast";

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const actionData = useActionData();
  const { showLoading, updateToast } = useToast();

  const id = useRef();


  if (actionData) {
    if (actionData.success) {
      navigate("/auth/signin");
      updateToast(id.current, {
        render: "Authorized!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } else {
      updateToast(id.current, {
        render: `${actionData.error || "Internal Server Error"}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  const onSubmit = () => {
    id.current = showLoading("Please wait...");
  };

  return (
    <Form method="post" className="mt-8 grid grid-cols-6 gap-6">
      <Loader isLoading={isLoading} setIsLoading={setIsLoading} />
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="FirstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>

        <input
          type="text"
          id="FirstName"
          name="first_name"
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="LastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>

        <input
          type="text"
          id="LastName"
          name="last_name"
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          {" "}
          Email{" "}
        </label>

        <input
          type="email"
          autoComplete="false"
          id="Email"
          name="email"
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          {" "}
          Password{" "}
        </label>

        <input
          type="password"
          id="Password"
          name="password"
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="PasswordConfirmation"
          className="block text-sm font-medium text-gray-700"
        >
          Password Confirmation
        </label>

        <input
          type="password"
          id="PasswordConfirmation"
          name="password_confirmation"
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          onClick={onSubmit}
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
        >
          Sign up
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <Link to="/auth/signin" className="mx-1 text-gray-700 underline">
            Sign in
          </Link>
          .
        </p>
      </div>
    </Form>
  );
}

export default Signup;
