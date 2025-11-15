// services/sofascoreApi.js
import axios from 'axios';

// List of public CORS proxies (rotate through them)
const CORS_PROXIES = [
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://proxy.cors.sh/',
  'https://crossorigin.me/',
  'https://cors-proxy.htmldriven.com/?url=',
];

// Get a random proxy from the list
const getRandomProxy = () => {
  return CORS_PROXIES[Math.floor(Math.random() * CORS_PROXIES.length)];
};

// SofaScore base URL
const SOFASCORE_BASE = 'https://api.sofascore.com/';

const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add CORS proxy
apiClient.interceptors.request.use(
  (config) => {
    const proxy = getRandomProxy();
    const targetUrl = SOFASCORE_BASE + config.url;

    // Different proxies have different URL formats
    if (proxy.includes('allorigins.win') || proxy.includes('corsproxy.io') || proxy.includes('cors-proxy.htmldriven.com')) {
      config.url = proxy + encodeURIComponent(targetUrl);
    } else {
      config.url = proxy + targetUrl;
    }

    console.log(`🔧 Using proxy: ${proxy.substring(0, 30)}...`);
    console.log(`🌐 Final URL: ${config.url.substring(0, 80)}...`);

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Success: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ Proxy Error:', {
      message: error.message,
      status: error.response?.status,
      proxy: error.config?.url?.substring(0, 50)
    });

    // Retry with a different proxy if this one fails
    if (error.response?.status >= 400) {
      console.log('🔄 Retrying with different proxy...');
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

  // Event graph
  getEventGraph: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}/graph`),

  // Match highlights
  getMatchHighlights: (matchId) =>
    apiClient.get(`api/v1/event/${matchId}/highlights`),

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

  // ===== ADDITIONAL ENDPOINTS =====

  // Tournament statistics
  getTournamentStatistics: (tournamentId, seasonId) =>
    apiClient.get(`api/v1/unique-tournament/${tournamentId}/season/${seasonId}/statistics`),

  // Player tournament statistics
  getPlayerTournamentStats: (playerId, tournamentId, seasonId) =>
    apiClient.get(`api/v1/player/${playerId}/unique-tournament/${tournamentId}/season/${seasonId}/statistics/overall`),

  // Tournament statistics with filters
  getTournamentStatsWithFilters: (tournamentId, seasonId, params = {}) =>
    apiClient.get(`api/v1/unique-tournament/${tournamentId}/season/${seasonId}/statistics`, { params }),

  // ===== TESTING METHODS =====

  // Test all proxies to find which ones work
  testAllProxies: async () => {
    console.log('🧪 Testing all CORS proxies...');

    const results = [];

    for (let i = 0; i < CORS_PROXIES.length; i++) {
      const proxy = CORS_PROXIES[i];
      try {
        console.log(`Testing proxy ${i + 1}/${CORS_PROXIES.length}: ${proxy.substring(0, 30)}...`);

        const testUrl = proxy.includes('allorigins.win') || proxy.includes('corsproxy.io') || proxy.includes('cors-proxy.htmldriven.com')
          ? proxy + encodeURIComponent(SOFASCORE_BASE + 'api/v1/sport/football/events/live')
          : proxy + SOFASCORE_BASE + 'api/v1/sport/football/events/live';

        const response = await axios.get(testUrl, { timeout: 10000 });
        results.push({ proxy, success: true, status: response.status });
        console.log(`✅ Proxy ${i + 1} SUCCESS`);
      } catch (error) {
        results.push({
          proxy,
          success: false,
          error: error.message,
          status: error.response?.status
        });
        console.log(`❌ Proxy ${i + 1} FAILED: ${error.message}`);
      }

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
  },

  // Get all available proxies
  getAllProxies: () => CORS_PROXIES,

  // Force use specific proxy
  useSpecificProxy: (proxyIndex) => {
    if (proxyIndex >= 0 && proxyIndex < CORS_PROXIES.length) {
      const specificProxy = CORS_PROXIES[proxyIndex];
      // Override the interceptor for next request
      apiClient.interceptors.request.clear();
      apiClient.interceptors.request.use(
        (config) => {
          const targetUrl = SOFASCORE_BASE + config.url;
          if (specificProxy.includes('allorigins.win') || specificProxy.includes('corsproxy.io') || specificProxy.includes('cors-proxy.htmldriven.com')) {
            config.url = specificProxy + encodeURIComponent(targetUrl);
          } else {
            config.url = specificProxy + targetUrl;
          }
          console.log(`🔧 Using specific proxy: ${specificProxy.substring(0, 30)}...`);
          return config;
        },
        (error) => Promise.reject(error)
      );
      return `Using proxy: ${specificProxy}`;
    }
    throw new Error('Invalid proxy index');
  }
};

export default sofascoreApi;