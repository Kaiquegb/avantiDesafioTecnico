// src/components/SearchHistory.tsx
import { useSearchHistory } from '../context/SearchHistoryContext';

export function SearchHistory({ onSelect }: { onSelect: (username: string) => void }) {
  const { searchHistory, clearHistory } = useSearchHistory();

  if (searchHistory.length === 0) return null;

  // Estilos inline para garantir que sejam aplicados
  const styles = {
    searchHistory: {
      margin: '25px 0',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
      position: 'relative' as const,
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: '1px solid #e1e4e8'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(225, 228, 232, 0.6)'
    },
    title: {
      fontSize: '1.1rem',
      color: '#24292e',
      margin: 0,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    clearButton: {
      backgroundColor: '#2ea44f',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: 500,
      cursor: 'pointer',
      padding: '8px 14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative' as const,
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    historyList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px'
    },
    historyItem: {
      animation: 'fadeIn 0.5s ease-out'
    },
    historyButton: {
      backgroundColor: '#f6f8fa',
      border: '1px solid #e1e4e8',
      borderRadius: '10px',
      padding: '8px 16px',
      fontSize: '0.95rem',
      color: '#0366d6',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
    }
  };

  return (
    <div style={styles.searchHistory}>
      <div style={styles.header}>
        <h3 style={styles.title}>
          {/* Ícone de relógio SVG inline */}
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#0366d6" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Histórico de buscas
        </h3>
        <button 
          onClick={clearHistory} 
          style={styles.clearButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2c974b';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2ea44f';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Limpar
        </button>
      </div>
      <ul style={styles.historyList}>
        {searchHistory.map((username) => (
          <li key={username} style={styles.historyItem}>
            <button 
              onClick={() => onSelect(username)} 
              style={styles.historyButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(3, 102, 214, 0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(3, 102, 214, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f6f8fa';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#e1e4e8';
              }}
            >
              {/* Ícone de download SVG inline */}
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#0366d6" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{opacity: 0.7}}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}