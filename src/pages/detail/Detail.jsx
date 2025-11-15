import './Detail.scss'
import Lineups from './lineups/Lineups'
import Table from './table/Table'
import H2H from './h2h/H2H'
import MatchHeader from './match-header/MatchHeader'
import MatchDetails from './match-details/MatchDetails'
import { useEffect, useState } from 'react'
import Lineup from './lineup/Lineup'
import { useMatchData } from '../../hooks/useMatchData'
import { useLocation } from 'react-router-dom'

function Detail() {
  const [tab, setTab] = useState('overview');
  const [isPolling, setIsPolling] = useState(true);
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  // Use hook with polling (10 seconds interval)
  const { detail, statistics, incidents, lineups, h2h, loading, error, refetch, startPolling, stopPolling } = useMatchData(id, 100000);

  const togglePolling = () => {
    if (isPolling) {
      stopPolling();
      setIsPolling(false);
    } else {
      startPolling();
      setIsPolling(true);
    }
  };

  const returnTab = () => {
    switch (tab) {
      case "overview":
        return <MatchDetails
          match={detail}
          statistics={statistics}
          incidents={incidents}
          loading={loading}
          isLive={detail?.status?.type === "inprogress"}
        />
      case "h2h":
        return <H2H
          h2hData={h2h}
          loading={loading}
        />
      case "table":
        return <Table
          match={detail}
          loading={loading}
        />
      case "lineups":
        return (
          <div className='l-container'>
            <Lineup

              lineups={lineups}
              loading={loading}
            />
            <Lineups
              match={detail.event}
              lineups={lineups}
              loading={loading}
            />
          </div>
        )
      default:
        return <MatchDetails
          match={detail}
          statistics={statistics}
          incidents={incidents}
          loading={loading}
          isLive={detail?.status?.type === "inprogress"}
        />
    }
  }

  // Auto-stop polling when match is finished
  useEffect(() => {
    if (detail?.status?.type === "finished") {
      stopPolling();
      setIsPolling(false);
    }
  }, [detail?.status?.type]);

  if (loading && !detail) {
    return (
      <div className="detail-content">
        <div className="loading">Loading match data for ID: {id}...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-content">
        <div className="error">Error loading match data: {error}</div>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="detail-content">
        <div className="no-data">No match data found for ID: {id}</div>
      </div>
    );
  }

  const isLiveMatch = detail?.status?.type === "inprogress";

  return (
    <div className="detail-content" id="detailContent">
        <MatchHeader match={detail} />

        {/* Polling Controls */}
        {isLiveMatch && (
          <div className="polling-controls">
            <div className="polling-status">
              <span className={`polling-indicator ${isPolling ? 'active' : 'paused'}`}>
                {isPolling ? (
                  <>
                    <i className="fas fa-sync fa-spin"></i> Auto-updating
                  </>
                ) : (
                  <>
                    <i className="fas fa-pause"></i> Updates paused
                  </>
                )}
              </span>
            </div>
            <button className="polling-toggle-btn" onClick={togglePolling}>
              {isPolling ? 'Pause Updates' : 'Resume Updates'}
            </button>
            <button className="refresh-btn" onClick={refetch}>
              <i className="fas fa-redo"></i> Refresh Now
            </button>
          </div>
        )}

        <div className="tabs">
            <div className={`tab ${tab === "overview" && "active"}`} onClick={() => setTab("overview")}>
              Overview {isLiveMatch && <span className="live-dot"></span>}
            </div>
            <div className={`tab ${tab === "h2h" && "active"}`} onClick={() => setTab("h2h")}>H2H</div>
            <div className={`tab ${tab === "table" && "active"}`} onClick={() => setTab("table")}>Table</div>
            <div className={`tab ${tab === "lineups" && "active"}`} onClick={() => setTab("lineups")}>Lineups</div>
        </div>
        {returnTab()}
    </div>
  )
}

export default Detail;