export interface GitHubUser {
    avatar_url: string;
    login: string;
    name: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
  }