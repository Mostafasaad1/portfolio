// GitHub API Configuration
// To enable authenticated API access and avoid rate limiting:
// 1. Create a GitHub Personal Access Token with 'public_repo' scope
// 2. Replace the empty string below with your token
// 3. Rebuild and redeploy the application

export const GITHUB_CONFIG = {
  username: 'Mostafasaad1',
  // Add your GitHub Personal Access Token here for authenticated requests
  // This increases rate limit from 60 to 5,000 requests/hour
  token: '', // Example: 'ghp_your_token_here'
  reposPerPage: 9,
  sortBy: 'stars',
}

// Helper function to get headers for GitHub API requests
export const getGitHubHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }
  
  // Add authorization header if token is provided
  if (GITHUB_CONFIG.token && GITHUB_CONFIG.token.trim() !== '') {
    headers['Authorization'] = `token ${GITHUB_CONFIG.token}`
  }
  
  return headers
}

// Construct the API URL
export const getReposUrl = () => {
  return `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=${GITHUB_CONFIG.sortBy}&per_page=${GITHUB_CONFIG.reposPerPage}`
}
