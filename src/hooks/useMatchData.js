// hooks/useMatchData.js
import { useState, useEffect } from 'react';
import { useSofaScoreApi } from './useSofaScoreApi';

export const useMatchData = (matchId) => {
  const {
    getMatchById,
    getMatchStatistics,
    getMatchIncidents,
    getMatchLineups,
    getHeadToHead,
    loading,
    error
  } = useSofaScoreApi();

  const [matchData, setMatchData] = useState({
    detail: null,
    statistics: null,
    incidents: null,
    lineups: null,
    h2h: null
  });

  const fetchMatchData = async () => {
    if (!matchId) return;

    try {
      const [detail, statistics, incidents, lineups, h2h] = await Promise.all([
        getMatchById(matchId),
        getMatchStatistics(matchId),
        getMatchIncidents(matchId),
        getMatchLineups(matchId),
        getHeadToHead(matchId)
      ]);

      setMatchData({
        detail,
        statistics,
        incidents,
        lineups,
        h2h
      });
    } catch (err) {
      console.error('Error fetching match data:', err);
    }
  };

  useEffect(() => {
    fetchMatchData();
  }, [matchId]);

  return {
    ...matchData,
    loading,
    error,
    refetch: fetchMatchData
  };
};