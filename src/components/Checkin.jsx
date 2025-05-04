import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLog } from "../LogContext";
import { useUser } from "../UserContext";
import { useToast } from "../utils/useToast";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Checkin() {
  const { log, handleCheckIn } = useLog();
  const { user, _ } = useUser();

  const [input, setInput] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const { showLoading, updateToast } = useToast();

  useEffect(() => {
    if (log?.length > 0 && user) {
      const lastCheckInDate = new Date(user?.lastCheckIn);
      updateTimeAgo(lastCheckInDate);

      const interval = setInterval(() => {
        updateTimeAgo(lastCheckInDate);
      }, 60000);

      return () => {
        clearInterval(interval); // Clean up the interval
      };
    }
  }, [log, user]);

  const updateTimeAgo = (lastCheckInDate) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - lastCheckInDate) / 60000);
    if (diffInMinutes < 1) {
      setTimeAgo("Just now");
    } else if (diffInMinutes < 60) {
      setTimeAgo(`${diffInMinutes} min ago`);
    } else if (diffInMinutes < 1440) {
      setTimeAgo(`${Math.floor(diffInMinutes / 60)} hours ago`);
    } else if (diffInMinutes < 2880) {
      setTimeAgo(`${Math.floor(diffInMinutes / 1440)} day ago`);
    } else {
      setTimeAgo(`${Math.floor(diffInMinutes / 1440)} days ago`);
    }
  };
  const onSubmit = async () => {
    const id = showLoading("Disabling curse protocols...");

    try {
      const result = await handleCheckIn(input);

      if (result.success) {
        updateToast(id, {
          render: "Lock IN Confirmed!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        updateToast(id, {
          render: ` ${result.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      updateToast(id, {
        render: `Something went wrong: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setInput("");
  };
  return (
    <div className="relative z-10 mt-12 w-[90%] max-w-xl rounded-2xl border border-yellow-500/30 bg-gray-800/80 p-6 shadow-lg backdrop-blur-lg">
      <Link
        to="/character"
        className="absolute top-4 right-4 text-sm font-bold text-white transition-all hover:text-yellow-500"
      >
        Update Character 🤵
      </Link>

      <h1 className="mt-4 text-center text-3xl font-bold text-white">
        📜 Daily Check-in
      </h1>
      {/* <p className="mt-2 text-center text-white">
        Dodge the hex, check in now!
      </p> */}

      {/* Last Check-in Display */}

      <p className="mt-2 text-center text-sm text-white">
        Last check-in: {(log?.length > 0 && timeAgo) || "Loading..."}
      </p>

      {/* Textarea */}
      <textarea
        className="mt-4 w-full rounded-lg border border-yellow-500/40 bg-gray-900/60 p-3 text-white placeholder-gray-400"
        placeholder="What have I been up to?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      {/* Button */}
      <button
        onClick={onSubmit}
        className="mt-4 w-full rounded-xl bg-yellow-600 px-4 py-2 font-bold text-white shadow-lg transition-all hover:bg-yellow-700 hover:shadow-yellow-500/50"
      >
        Lock IN
      </button>
    </div>
  );
}

export default Checkin;
