import React from "react";
import { useLog } from "../LogContext";

function LogItem() {
  const { log } = useLog();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <div className="mt-2 space-y-3">
      {log?.map((entry, index) => (
        <div
          key={index}
          className="rounded-lg border border-yellow-500/30 bg-gray-700/70 p-4 shadow-md transition hover:scale-105"
        >
          <p className="text-sm text-white">
            📅 <strong>{formatTimestamp(entry.timestamp)}</strong>
          </p>
          <p className="text-white">{entry.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default LogItem;
