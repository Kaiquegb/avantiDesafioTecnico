import { useState } from 'react';

interface UserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('Usuário não encontrado');
      const data: UserData = await response.json();
      setUserData(data);
      setError('');
    } catch (err) {
      setError('Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-16 px-4">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Perfil GitHub</h1>

      {/* Campo de Busca */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite um usuário do Github"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-sm text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      {/* Card de Perfil (aparece quando há dados) */}
      {userData && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm mt-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={userData.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-200"
            />
            <div>
              <h2 className="font-bold text-xl">{userData.name || userData.login}</h2>
              <p className="text-gray-600">@{userData.login}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{userData.bio || 'Sem biografia disponível.'}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Seguidores: {userData.followers}</span>
            <span>Seguindo: {userData.following}</span>
            <span>Repositórios: {userData.public_repos}</span>
          </div>
        </div>
      )}
    </div>
  );
}