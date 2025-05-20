import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Cookies } from "react-cookie";
import { SortOptions } from "./utils/dropdownOptions";
const entriesPerPage = 7;

const API_URL = import.meta.env.VITE_API_BASE_URL;
const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [log, setLog] = useState([]);
  const [logCollection, setLogCollection] = useState([]);
  const [docCount, setDocCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingLog = useRef(false);
  const selectedOption = useRef(SortOptions.DESCENDING);

  const fetchData = async (url, options = {}) => {
    const cookies = new Cookies();
    const token = cookies.get("jwt");
    if (!token) {
      return [];
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "An error occurred while fetching data");
    }
    return data;
  };

  const logLoader = useCallback(async (entriesPerPage, lastTimeStamp) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        limit: entriesPerPage,
        ...(lastTimeStamp && { lastTimestamp: lastTimeStamp }),
        order: selectedOption.current.toUpperCase().slice(0, 3),
      });

      const { data } = await fetchData(`${API_URL}/activity/get?${query}`);
      if (!data) return;
      setLogCollection((prev) => [...prev, ...data]);
      return data;
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadLogs = useCallback(
    async (entriesPerPage, currentPage) => {
      if (loadingLog.current) return;

      loadingLog.current = true;
      const start = (currentPage - 1) * entriesPerPage;
      const hasCachedLogs = logCollection.length > start;

      try {
        if (hasCachedLogs) {
          const cachedLogs = logCollection.slice(start, start + entriesPerPage);
          setLog(cachedLogs);
        } else {
          const lastTimeStamp = logCollection.at(-1)?.timestamp || null;
          const newLogs = await logLoader(entriesPerPage, lastTimeStamp);
          if (!newLogs) {
            setLog([]);
            return;
          }

          setLog(newLogs);
        }
      } catch (err) {
        console.error("Failed to load logs:", err);
      } finally {
        loadingLog.current = false;
      }
    },
    [logCollection, logLoader],
  );

  const handleCheckIn = useCallback(
    async (comment) => {
      if (!comment.trim()) {
        return { success: false, message: "Comment cannot be empty" };
      }

      const newCheckIn = { timestamp: new Date().toISOString(), comment };
      try {
        await fetchData(`${API_URL}/activity/checkin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCheckIn),
        });
        if (selectedOption.current == SortOptions.ASCENDING) {
          clearAll();
          loadLogs(entriesPerPage, 1);
        } else {
          setLogCollection((prev) => [newCheckIn, ...prev]);
        }
        setDocCount((prev) => prev + 1);
        return { success: true };
      } catch (err) {
        console.error("Check-in failed:", err);
        return { success: false, message: err.message };
      }
    },
    [loadLogs],
  );

  const getDocCount = useCallback(async () => {
    try {
      const { count } = await fetchData(`${API_URL}/activity/count`);
      if (!count) return;
      setDocCount(count);
      return count;
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  }, []);

  const clearAll = () => {
    setLogCollection([]);
    setLog([]);
  };

  const toggleSort = clearAll;

  return (
    <LogContext.Provider
      value={{
        handleCheckIn,
        loadLogs,
        log,
        logCollection,
        docCount,
        isLoading,
        error,
        setLog,
        setLogCollection,
        getDocCount,
        toggleSort,
        entriesPerPage,
        selectedOption,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLog must be used within a LogProvider");
  }
  return context;
};
