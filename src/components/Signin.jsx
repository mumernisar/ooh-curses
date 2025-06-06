import React, { useEffect, useRef } from "react";
import { useNavigate, Form, Link, useActionData } from "react-router-dom";
import { useUser } from "../UserContext";
import { useToast } from "../utils/useToast";

const Signin = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const { _, login } = useUser();
  const { showLoading, updateToast } = useToast();
  const id = useRef();
  const wakeUpTimeout = useRef();
  const hasLoggedIn = useRef(false);

  const clearWakeUp = () => {
    if (wakeUpTimeout.current) {
      clearTimeout(wakeUpTimeout.current);
      wakeUpTimeout.current = null;
    }
  };

  useEffect(() => {
    if (actionData?.success && !hasLoggedIn.current) {
      clearWakeUp();
      hasLoggedIn.current = true;
      (async () => {
        try {
          const result = await login();
          if (result.success) {
            updateToast(id.current, {
              render: "Authorized!",
              type: "success",
              isLoading: false,
              autoClose: 5000,
            });
          }
        } catch (error) {
          updateToast(id.current, {
            render: `Something went wrong: ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }
        setTimeout(() => {
          navigate("/");
        }, 100);
      })();
    } else if (actionData?.error) {
      clearWakeUp();
      updateToast(id.current, {
        render: `${actionData.error}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }, [actionData?.success, actionData?.error, login, navigate, updateToast]);

  const onSubmit = () => {
    id.current = showLoading("Please wait...");

    wakeUpTimeout.current = setTimeout(() => {
      updateToast(id.current, {
        render: "Waking up server...",
        isLoading: true,
      });
    }, 5000);
  };

  return (
    <Form method="post" className="mt-8 grid grid-cols-6 gap-6">
      <div className="col-span-6">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          autoComplete="off"
          id="Email"
          name="email"
          required
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="Password"
          name="password"
          required
          className="mt-1 w-full rounded-md border-gray-200 bg-white p-1.5 text-sm text-gray-700 shadow-xs"
        />
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          onClick={onSubmit}
          type="submit"
          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600"
        >
          Log in
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Don't have an account?
          <Link to="/auth/signup" className="mx-1 text-gray-700 underline">
            Sign up
          </Link>
          .
        </p>
      </div>
    </Form>
  );
};

export default Signin;
