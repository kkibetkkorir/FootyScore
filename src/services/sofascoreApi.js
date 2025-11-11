// services/sofascoreApi.js
import axios from 'axios';

const BASE_URL = 'https://api.sofascore.com/';

// Create axios instance with base configuration
import { getRandomUserAgent } from './userAgents';

const apiClient = axios.create({
  baseURL: 'https://api.sofascore.com/',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers['User-Agent'] = getRandomUserAgent();
    config.headers['Accept'] = 'application/json';
    config.headers['Accept-Language'] = 'en-US,en;q=0.9';
    config.headers['Origin'] = 'https://www.sofascore.com';
    config.headers['Referer'] = 'https://www.sofascore.com/';

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
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
};

export default sofascoreApi;