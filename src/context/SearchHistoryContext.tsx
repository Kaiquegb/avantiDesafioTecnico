import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addToHistory: (username: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export function SearchHistoryProvider({ children }: { children: ReactNode }) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const addToHistory = (username: string) => {
    if (!searchHistory.includes(username)) {
      setSearchHistory(prev => [username, ...prev].slice(0, 10)); // mantém apenas os 10 mais recentes
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addToHistory, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
}