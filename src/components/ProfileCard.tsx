import { GitHubUser } from '../types/github';

interface ProfileCardProps {
  user: GitHubUser;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="avatar-container">
        <img src={user.avatar_url || "/placeholder.svg"} alt="Avatar" className="avatar" />
        <div className="avatar-glow"></div>
      </div>
      <h2 className="profile-name">{user.name || user.login}</h2>
      <p className="username">@{user.login}</p>
      <p className="bio">{user.bio || 'Sem biografia disponível.'}</p>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-number">{user.public_repos}</span>
          <span className="stat-label">Repositórios</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{user.followers}</span>
          <span className="stat-label">Seguidores</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{user.following}</span>
          <span className="stat-label">Seguindo</span>
        </div>
      </div>
      <a 
        href={`https://github.com/${user.login}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="visit-profile-button"
      >
        Visitar Perfil
      </a>
    </div>
  );
}