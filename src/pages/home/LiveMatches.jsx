
import './Home.scss'
import Controls from '../../components/controls/Controls'
import { Links, NavLink, useNavigate } from 'react-router-dom'
import { BETTING_FREE, DEBUG } from '../../constants'
import { useLiveEvents } from '../../hooks/useLiveEvents';
import { useEffect } from 'react';

function LiveMatches() {
    const navigate = useNavigate();
    const { events, loading, error } = useLiveEvents('football', 30000);

    useEffect(() => {
        events && console.log(events)
    }, [events]);

  return (
    <div className="main-content">
          <Controls isLive={true} />
        {/* Live Matches Section */}
        <div className="section-header">
            <h2><i className="fas fa-bolt"></i> Live Matches</h2>
        </div>

        <div className="matches-grid">
            {
                events && events.map(event => {
                    return (
                        <div className="match-card live" key={event.id} onClick={() => navigate(`/live/${event.id}`)}>
                            <div className="match-status">
                                <span>{event.tournament.name} {/*- Matchday {game.matchDay}*/}</span>
                                {
                                    event.status.type !== "inprogress" ? <span>Finished</span> : <div className="live-indicator">
                                        <i className="fas fa-circle"></i> LIVE
                                    </div>
                                }
                            </div>
                            <div className="match-teams">
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-lion"></i>
                                    </div>
                                    <div className="team-name">{event.homeTeam.name}</div>
                                </div>
                                <div className="match-score">
                                    <div className="score"><span className={event.status.type === "inprogress" && "live-score"}>{event.homeScore.current}</span> - <span className={event.status.type === "inprogress" && "live-score"}>{event.awayScore.current}</span></div>
                                    {/*<div className="match-time">{
                                        event.status.type != "finished" ? "FT" : `${game.timeElapsed}'`
                                    }</div>*/}
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-dragon"></i>
                                    </div>
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
                                    </div>)) :

                                (<div className="betting-options">
                                    <div className="bet-option">
                                        <div className="option-name">Home</div>
                                        <div className="option-odds">{game.homeOdd}</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Draw</div>
                                        <div className="option-odds">{game.drawOdd}</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Away</div>
                                        <div className="option-odds">{game.awayOdd}</div>
                                    </div>
                                </div>)*/
                            }
                        </div>);
                })
            }
        </div>
    </div>
  )
}

export default LiveMatches