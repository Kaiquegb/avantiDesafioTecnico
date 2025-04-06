import { useState } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite um usuário do Github"
        disabled={loading}
      />
      <button type="submit" disabled={loading} className="search-button">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner-inner"></div>
          </div>
        ) : (
          <span>Buscar</span>
        )}
      </button>
    </form>
  );
}