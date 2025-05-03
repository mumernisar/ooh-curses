// AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Reaper from "../utils/Reaper";
import cover from "../assets/temp-7.jpeg";
import coversm from "../assets/header-small.jpg";
const AuthLayout = () => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            src={cover}
            alt=""
            className="absolute inset-0 hidden h-full w-full object-contain lg:block"
          />
          <img
            src={coversm}
            alt=""
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
          />
        </div>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-gray-600" href="#">
              <span className="sr-only">Home</span>
              <Reaper />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              OOH CURSES 🙀
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Embrace the chaos
            </p>
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
