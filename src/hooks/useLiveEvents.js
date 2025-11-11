// hooks/useLiveEvents.js
import { useState, useEffect, useRef } from 'react';
import { useSofaScoreApi } from './useSofaScoreApi';

export const useLiveEvents = (sport = 'football', refreshInterval = 30000) => {
  const { getLiveEvents, loading, error } = useSofaScoreApi();
  const [events, setEvents] = useState([]);
  const intervalRef = useRef();

  const fetchLiveEvents = async () => {
    try {
      const data = await getLiveEvents(sport);
      setEvents(data?.events || []);
    } catch (err) {
      console.error('Error fetching live events:', err);
    }
  };

  useEffect(() => {
    fetchLiveEvents(); // Initial fetch

    if (refreshInterval > 0) {
      intervalRef.current = setInterval(fetchLiveEvents, refreshInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sport, refreshInterval]);

  return { events, loading, error, refetch: fetchLiveEvents };
};