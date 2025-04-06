import { useSearchHistory } from '../context/SearchHistoryContext';

export function SearchHistory({ onSelect }: { onSelect: (username: string) => void }) {
  const { searchHistory, clearHistory } = useSearchHistory();

  if (searchHistory.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <h3>Histórico de buscas</h3>
        <button onClick={clearHistory} className="clear-history-button">
          Limpar
        </button>
      </div>
      <ul className="history-list">
        {searchHistory.map((username) => (
          <li key={username} className="history-item">
            <button onClick={() => onSelect(username)}>
              {username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}