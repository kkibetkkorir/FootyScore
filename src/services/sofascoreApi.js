// services/sofascoreApi.js
import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  // For development - use proxy server on localhost:3001
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api/proxy/';
  }
  // For production - use your deployed proxy
  else {
    return 'https://footyscore.onrender.com/api/proxy/';
  }
};

//const BASE_URL = getBaseURL();
// Use proxy for ALL environments to avoid CORS issues
const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:3001/api/proxy/'
  : '/api/proxy/'; // Relative path for production

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      baseURL: error.config?.baseURL
    });
    return Promise.reject(error);
  }
);


// API service methods
export const sofascoreApi = {
  // ===== MATCH ENDPOINTS =====

  // Scheduled events by date
  getScheduledEvents: (sport, date) =>
    apiClient.get(`api/v1/sport/${sport}/scheduled-events/${date}`),

  // Live events
  getLiveEvents: (sport) =>
    apiClient.get(`api/v1/sport/${sport}/events/live`),

  // Match by ID
  getMatchById: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}`),

  // Match statistics
  getMatchStatistics: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/statistics`),

  // Match incidents
  getMatchIncidents: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}/incidents`),

  // Head-to-head
  getHeadToHead: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/head2head`),

  // Match lineups
  getMatchLineups: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/lineups`),

  // Alternative lineups endpoint
  getMatchLineupsAlt: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}/lineups`),

  // Match odds
  getMatchOdds: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/odds`),

  // Match details
  getMatchDetails: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/details`),

  // Match player statistics
  getMatchPlayerStats: (matchId) =>
    apiClient.get(`mobile/v4/event/${matchId}/player-statistics`),

  // Pre-game form
  getPregameForm: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}/pregame-form`),

  //Event graph
  getEventGraph: (matchId) =>
    apiClient.get(`https://api.sofascore.com/api/v1/event/${matchId}/graph`),

  //Match highlights
  getMatchHighlights: (matchId) =>
    apiClient.get(`https://api.sofascore.com/api/v1/event/${matchId}/highlights`),

  // ===== PLAYER ENDPOINTS =====

  // Player details
  getPlayerDetails: (playerId) =>
    apiClient.get(`mobile/v4/player/${playerId}/details`),

  // Player transfer history
  getPlayerTransferHistory: (playerId) =>
    apiClient.get(`mobile/v4/player/${playerId}/transfer-history`),

  // ===== TEAM ENDPOINTS =====

  // Team performance
  getTeamPerformance: (teamId) =>
    apiClient.get(`mobile/v4/team/${teamId}/performance`),

  // Team players
  getTeamPlayers: (teamId) =>
    apiClient.get(`mobile/v4/team/${teamId}/players`),

  // Team details
  getTeamDetails: (teamId) =>
    apiClient.get(`mobile/v4/team/${teamId}/details`),

  // Team past & next matches
  getTeamLastNext: (teamId) =>
    apiClient.get(`mobile/v4/team/${teamId}/lastnext`),

  // ===== MANAGER ENDPOINTS =====

  // Manager details
  getManagerDetails: (managerId) =>
    apiClient.get(`mobile/v4/manager/${managerId}/details`),

  // ===== TOURNAMENT & CATEGORY ENDPOINTS =====

  // Sport categories
  getSportCategories: (sport) =>
    apiClient.get(`api/v1/sport/${sport}/categories`),

  // Category tournaments
  getCategoryTournaments: (categoryId) =>
    apiClient.get(`api/v1/category/${categoryId}/unique-tournaments`),

  // Tournament seasons
  getTournamentSeasons: (tournamentId) =>
    apiClient.get(`mobile/v4/unique-tournament/${tournamentId}/seasons`),

  // Tournament top players
  getTournamentTopPlayers: (tournamentId, seasonId) =>
    apiClient.get(`mobile/v4/unique-tournament/${tournamentId}/season/${seasonId}/top-players`),

  // Tournament standings
  getTournamentStandings: (tournamentId, seasonId) =>
    apiClient.get(`mobile/v4/unique-tournament/${tournamentId}/season/${seasonId}/standings`),

  // Tournament events/matches
  getTournamentEvents: (tournamentId, seasonId) =>
    apiClient.get(`mobile/v4/unique-tournament/${tournamentId}/season/${seasonId}/events`),

  // Cup tree
  getCupTree: (tournamentId, seasonId) =>
    apiClient.get(`mobile/v4/unique-tournament/${tournamentId}/season/${seasonId}/cuptree`),

  //https://www.sofascore.com/api/v1/unique-tournament/1/season/56953/statistics
  //https://api.sofascore.com/api/v1/player/827606/unique-tournament/17/season/52186/statistics/overall
  //https://www.sofascore.com/api/v1/unique-tournament/1/season/56953/statistics?limit=20&order=-rating&offset=20&accumulation=total&group=summary
};

export default sofascoreApi;