'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import fetchUsage from '../service/interview/fetchUsage';

export const UsageContext = createContext();

export function UsageContextProvider({ children }) {
  const [usage, setUsage] = useState(null);
  const [usageLoading, setUsageLoading] = useState(true);

  useEffect(() => {
    const getUsage = async () => {
      const result = await fetchUsage();
      setUsage(result?.data?.remaining_minutes || null);
      setUsageLoading(false);
    };

    getUsage();
  }, []);

  return (
    <UsageContext.Provider value={{ usage, setUsage, usageLoading }}>
      {children}
    </UsageContext.Provider>
  );
}
