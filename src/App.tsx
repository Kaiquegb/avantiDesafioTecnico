import { useState } from 'react';
import { FiGithub, FiSearch } from 'react-icons/fi';
import './App.css';

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  message?: string; // tratar rate limit
}

export default function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data: GitHubUser = await response.json();

      if (!response.ok) {
        // Trata rate limit (403) ou usuário não encontrado (404)
        throw new Error(
          response.status === 403 
            ? 'Limite de requisições excedido. Aguarde 1 hora ou use um token GitHub.' 
            : 'Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente'
        );
      }

      setUserData(data);
    } catch (err: any) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Perfil GitHub</h1>

      <div className="search-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite um usuário do Github"
          disabled={loading}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <img src="/src/assets/loading.svg" alt="Loading" className="loading-icon" />
          ) : (
            'Buscar'
          )}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          {error.includes('Limite') && (
            <a 
              href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting" 
              target="_blank"
              className="rate-limit-link"
            >
              Como resolver?
            </a>
          )}
        </div>
      )}

      {userData && (
        <div className="profile-card">
          <img src={userData.avatar_url} alt="Avatar" className="avatar" />
          <h2>{userData.name || userData.login}</h2>
          <p className="bio">{userData.bio || 'Sem biografia disponível.'}</p>
          <div className="stats">
            <div>
              <span className="stat-number">{userData.public_repos}</span>
              <span>Repositórios</span>
            </div>
            <div>
              <span className="stat-number">{userData.followers}</span>
              <span>Seguidores</span>
            </div>
            <div>
              <span className="stat-number">{userData.following}</span>
              <span>Seguindo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}