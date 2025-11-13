import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        if(err.name === "QuotaExceededError"){
            console.warn("localStorage full clearing old cache...");
            const cleaned = purgeOldEntries(value, 5);
            localStorage.setItem(key, JSON.stringify(cleaned));
        }
        else{
            console.error("Failed to save to localStorage:", err);
        }
    }
  }, [key, value]);

  return [value, setValue];
}
