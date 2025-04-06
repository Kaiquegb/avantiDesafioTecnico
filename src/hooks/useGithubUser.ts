import { useState } from 'react';
import { GitHubUser } from '../types/github';

export function useGithubUser() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = async (username: string) => {
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data: GitHubUser = await response.json();

      if (!response.ok) {
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

  return { userData, error, loading, fetchUser };
}