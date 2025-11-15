import './Home.scss'
import Controls from '../../components/controls/Controls'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLiveEvents } from '../../hooks/useLiveEvents';
import { useEffect, useState } from 'react';
import { BETTING_FREE } from '../../constants';

function LiveMatches() {
    const navigate = useNavigate();
    const [isPolling, setIsPolling] = useState(true);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { events, loading, error, refetch, startPolling, stopPolling } = useLiveEvents('football', 15000);
    const [leagues, setLeagues] = useState(null);

    const togglePolling = () => {
        if (isPolling) {
            stopPolling();
            setIsPolling(false);
        } else {
            startPolling();
            setIsPolling(true);
        }
    };

    // Helper functions
    const formatElapsedTime = (currentPeriodStartTimestamp, isSecondHalf = false) => {
        if (!currentPeriodStartTimestamp) return "00:00";

        const baseSeconds = Math.floor((new Date().getTime() - (currentPeriodStartTimestamp * 1000)) / 1000);
        const totalSeconds = isSecondHalf ? baseSeconds + (45 * 60) : baseSeconds;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Extract unique leagues from events
    useEffect(() => {
        const allLeagues = new Map();

        if (events) {
            events.forEach(event => {
                if (event.tournament && !allLeagues.has(event.tournament.id)) {
                    allLeagues.set(event.tournament.id, {
                        id: event.tournament.id,
                        name: event.tournament.name,
                        slug: event.tournament.slug,
                        category: event.tournament.category,
                        uniqueTournament: event.tournament.uniqueTournament,
                        priority: event.tournament.priority,
                        icon: "fa-futbol"
                    });
                }
            });
        }

        setLeagues(Array.from(allLeagues.values()));
    }, [events]);

    // Filter live events based on league and search
    const filteredEvents = events ? events.filter(event => {
        if (selectedLeague && event.tournament.id !== selectedLeague.id) {
            return false;
        }

        if (searchQuery) {
            return (
                event.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return true;
    }) : null;

    return (
        <div className="main-content">
            <Controls
                isLive={true}
                leagues={leagues}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedLeague={selectedLeague}
                onLeagueChange={setSelectedLeague}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Polling Controls */}
            {/*<div className="polling-controls">
                <div className="polling-status">
                    <span className={`polling-indicator ${isPolling ? 'active' : 'paused'}`}>
                        {isPolling ? (
                            <>
                                <i className="fas fa-sync fa-spin"></i> Live updates every 15s
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
            </div>*/}

            {/* Polling Controls */}
            <div className="section-header">
                <NavLink className="view-all" onClick={togglePolling}>{isPolling ? 'Pause Updates' : 'Resume Updates'}</NavLink>
                <NavLink className="view-all" onClick={refetch}><i className="fas fa-redo"></i> Refresh Now</NavLink>
            </div>

            {/* Live Matches Section */}
            <div className="section-header">
                {/*<h2><i className="fas fa-bolt"></i> Live Matches</h2>*/}
                <h2 className={`polling-indicator ${isPolling ? 'active' : 'paused'}`}>
                    {isPolling ? (
                            <>
                                <i className="fas fa-sync fa-spin"></i> Live updates every 15s
                            </>
                        ) : (
                            <>
                                <i className="fas fa-pause"></i> Updates paused
                            </>
                    )}
                </h2>
                <span className="view-all">{filteredEvents ? filteredEvents.length : 0} matches</span>
            </div>

            <div className="matches-grid">
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map(event => (
                        <div className="match-card live" key={event.id} onClick={() => navigate(`/live/${event.id}`)}>
                            <div className="match-status">
                                <span>{event.tournament.name}</span>
                                {event.status.type !== "inprogress" ?
                                    <span>Finished</span> :
                                    <div className="live-indicator">
                                        <i className="fas fa-circle"></i> LIVE
                                    </div>
                                }
                            </div>
                            <div className="match-teams">
                                <div className="team">
                                    <img
                                        src={`https://img.sofascore.com/api/v1/team/${event.homeTeam.id}/image`}
                                        alt=""
                                        className="team-logo"
                                    />
                                    <div className="team-name">{event.homeTeam.name}</div>
                                </div>
                                <div className="match-score">
                                    <div className="score">
                                        <span className={
                                            event.status.type === "inprogress" &&
                                            ["Started", "1st half", "2nd half"].includes(event.status.description) ? "live-score" : ""
                                        }>
                                            {event.homeScore.current}
                                        </span>
                                        -
                                        <span className={
                                            event.status.type === "inprogress" &&
                                            ["Started", "1st half", "2nd half"].includes(event.status.description) ? "live-score" : ""
                                        }>
                                            {event.awayScore.current}
                                        </span>
                                    </div>
                                    <div className="match-time">
                                        {event.status.type === "inprogress" ?
                                            (event.status.description === "Halftime" ? "HT" :
                                            `${formatElapsedTime(event.time?.currentPeriodStartTimestamp, event.lastPeriod === "period2")}'`)
                                            : new Date(event.startTimestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
                                        }
                                    </div>
                                </div>
                                <div className="team">
                                    <img
                                        src={`https://img.sofascore.com/api/v1/team/${event.awayTeam.id}/image`}
                                        alt=""
                                        className="team-logo"
                                    />
                                    <div className="team-name">{event.awayTeam.name}</div>
                                </div>
                            </div>
                            {
                                /*BETTING_FREE ? (DEBUG ?
                                    (<div className="match-info">
                                        <span><i className="fas fa-stadium"></i>{game.venue}</span>
                                        <span><i className="fas fa-user"></i>{game.attendance}</span>
                                    </div>) :
                                    (<div className="match-actions">
                                        <button className="action-btn" onClick={() => navigate('/fixtures')}><i className="fas fa-chart-line"></i> Stats</button>
                                        <button className="action-btn" onClick={() => navigate('/leagues')}><i className="fas fa-video"></i> Watch</button>
                                        <button className="action-btn" onClick={(e) => e.preventDefault()}><i className="far fa-bell"></i> Alert</button>
                                    </div>)) :*/

                                !BETTING_FREE && (<div className="betting-options">
                                    <div className="bet-option">
                                        <div className="option-name">Home</div>
                                        <div className="option-odds">1.84</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Draw</div>
                                        <div className="option-odds">3.14</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Away</div>
                                        <div className="option-odds">2.83</div>
                                    </div>
                                </div>)
                            }
                        </div>
                    ))
                ) : (
                    <div className="no-matches">
                        {loading ? 'Loading live matches...' : 'No live matches found'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveMatches;