import React from "react";
import EvilGhoul from "./../assets/404.png";

export default function NotFoundPage({ message }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
      <img
        src={EvilGhoul} // Replace this with the actual path
        alt="404 Ghost"
        className="max-w-xs sm:max-w-md md:max-w-lg"
      />

      {/* Text */}
      <h1 className="mt-4 text-4xl font-bold text-yellow-400">Oops!</h1>
      <p className="mt-2 text-center text-lg text-gray-300">
        {message ? message : "Looks like this page doesn't exist."}
      </p>

      {/* Go Back Button */}
      <a href="/" className="mt-6">
        <button className="rounded-lg bg-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-yellow-700 hover:shadow-yellow-500/50">
          Back to buisness
        </button>
      </a>
    </div>
  );
}
