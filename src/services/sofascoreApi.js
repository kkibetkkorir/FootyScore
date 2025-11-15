// services/sofascoreApi.js
import axios from 'axios';
import { getCachedUserAgent, getUserAgents, testAllUserAgents } from './userAgents.js';

// Direct SofaScore API URL
//const BASE_URL = 'https://api.sofascore.com/';

// Use relative paths - will work in both development and production
const BASE_URL = '/api/';

// Create local rotation variables for this module
let currentUserAgent = null;
let lastRotationTime = 0;
const ROTATION_INTERVAL = 5 * 60 * 1000; // Rotate every 5 minutes

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

// Request interceptor to rotate User-Agents
apiClient.interceptors.request.use(
  (config) => {
    // Get a random User-Agent for each request
    //const userAgent = getCachedUserAgent();

    // Set headers for each request
    /*config.headers = {
      ...config.headers,
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.sofascore.com/',
      'Origin': 'https://www.sofascore.com/',
    };

    console.log(`🔧 Using User-Agent: ${userAgent.substring(0, 60)}...`)*/
    console.log(`🌐 Making request to: ${config.url}`);

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      userAgent: error.config?.headers?.['User-Agent']?.substring(0, 50)
    });

    // If we get 403, we might want to force rotate the User-Agent
    if (error.response?.status === 403) {
      console.log('🔄 403 detected - consider rotating User-Agent');
    }

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


  // ===== TESTING METHODS =====

  // Test all User-Agents to find which ones work
  testAllUserAgents: async () => {
    console.log('🧪 Testing all User-Agents...');

    const testFunction = async (userAgent) => {
      const testClient = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
          'User-Agent': userAgent,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      const response = await testClient.get(`api/v1/sport/football/events/live`);
      return response.data;
    };

    return await testAllUserAgents(testFunction);
  },

  // Get current User-Agent being used
  getCurrentUserAgent: () => getCachedUserAgent(),

  // Get all available User-Agents
  getAllUserAgents: () => getUserAgents(),

  // Force rotate to a new User-Agent
  rotateUserAgent: () => {
    currentUserAgent = null;
    lastRotationTime = 0;
    return getCachedUserAgent();
  }
};

export default sofascoreApi;