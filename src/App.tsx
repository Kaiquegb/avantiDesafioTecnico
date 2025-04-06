"use client"

import { useState, useEffect } from "react"
import "./App.css"

interface GitHubUser {
  avatar_url: string
  name: string
  login: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  message?: string // tratar rate limit
}

export default function App() {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState<GitHubUser | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [animateIcon, setAnimateIcon] = useState(false)

  // trigger GitHub icon animation periodically
  useEffect(() => {
    const iconAnimationInterval = setInterval(() => {
      setAnimateIcon(true)
      setTimeout(() => setAnimateIcon(false), 2000)
    }, 8000)

    return () => clearInterval(iconAnimationInterval)
  }, [])

  const handleSearch = async () => {
    if (!username.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)
      const data: GitHubUser = await response.json()

      if (!response.ok) {
        // trata rate limit (403) ou usuário não encontrado (404)
        throw new Error(
          response.status === 403
            ? "Limite de requisições excedido. Aguarde 1 hora ou use um token GitHub."
            : "Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente",
        )
      }

      setUserData(data)
    } catch (err: any) {
      setError(err.message)
      setUserData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-wrapper">
      {/* animated background elements */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className="container">
        <h1>
          <div className={`github-icon ${animateIcon ? "animate" : ""}`}>
            <svg viewBox="0 0 16 16" width="32" height="32" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </div>
          Perfil GitHub
        </h1>

        <div className="search-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite um usuário do Github"
            disabled={loading}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading} className="search-button">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner-inner"></div>
              </div>
            ) : (
              <span>Buscar</span>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            {error.includes("Limite") && (
              <a
                href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting"
                target="_blank"
                className="rate-limit-link"
                rel="noreferrer"
              >
                Como resolver?
              </a>
            )}
          </div>
        )}

        {userData && (
          <div className="profile-card">
            <div className="avatar-container">
              <img src={userData.avatar_url || "/placeholder.svg"} alt="Avatar" className="avatar" />
              <div className="avatar-glow"></div>
            </div>
            <h2 className="profile-name">{userData.name || userData.login}</h2>
            <p className="username">@{userData.login}</p>
            <p className="bio">{userData.bio || "Sem biografia disponível."}</p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">{userData.public_repos}</span>
                <span className="stat-label">Repositórios</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.followers}</span>
                <span className="stat-label">Seguidores</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.following}</span>
                <span className="stat-label">Seguindo</span>
              </div>
            </div>
            <a
              href={`https://github.com/${userData.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-profile-button"
            >
              Visitar Perfil
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

