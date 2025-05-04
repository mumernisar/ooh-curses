import React, { useState } from "react";
import { SortOptions } from "../utils/dropdownOptions";
import { useLog } from "../LogContext";
function Dropdown({ currentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedOption, toggleSort } = useLog();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    if (option == selectedOption.current) return;
    selectedOption.current = option;
    currentPage.current = 1;
    setIsOpen(false);

    toggleSort();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm font-medium text-[antiquewhite] hover:bg-gray-700 focus:ring-2 focus:ring-yellow-500"
      >
        {selectedOption.current} (Date)
        <svg
          className="ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4 4.5a.75.75 0 01-1.14 0l-4-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-md bg-gray-800 shadow-lg ring-1 ring-yellow-500">
          <ul className="py-1 text-sm text-[antiquewhite]">
            <li>
              <button
                onClick={() => handleOptionSelect(SortOptions.DESCENDING)}
                className={`block w-full px-4 py-2 text-left ${
                  selectedOption.current === SortOptions.DESCENDING
                    ? "bg-gray-700 text-yellow-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Descending
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOptionSelect(SortOptions.ASCENDING)}
                className={`block w-full px-4 py-2 text-left ${
                  selectedOption.current === SortOptions.ASCENDING
                    ? "bg-gray-700 text-yellow-500"
                    : "hover:bg-gray-700"
                }`}
              >
                Ascending
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
