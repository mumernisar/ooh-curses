import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  entriesPerPage,
}) {

  const totalCeiled = Math.ceil(totalPages);
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {(currentPage.current - 1) * entriesPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(
            currentPage.current * entriesPerPage,
            totalPages * entriesPerPage,
          )}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages * entriesPerPage}
        </span>{" "}
        Entries
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        {/* Previous Button */}
        <button
          onClick={() => {
            onPageChange(currentPage.current - 1);
            currentPage.current--;
          }}
          disabled={currentPage.current === 1}
          className={`flex h-10 items-center justify-center rounded-s px-4 text-base font-medium text-white transition-colors ${
            currentPage.current === 1
              ? "cursor-not-allowed bg-gray-300"
              : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          <svg
            className="me-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Prev
        </button>
        {/* Next Button */}
        <button
          onClick={() => {
            onPageChange(currentPage.current + 1);
            currentPage.current++;
          }}
          disabled={currentPage.current == totalCeiled}
          className={`flex h-10 items-center justify-center rounded-e px-4 text-base font-medium text-white transition-colors ${
            currentPage.current === totalCeiled
              ? "cursor-not-allowed bg-gray-300"
              : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          Next
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
