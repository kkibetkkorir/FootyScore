
import './Home.scss'
import Controls from '../../components/controls/Controls'
import { Links, NavLink, useNavigate } from 'react-router-dom'
import { BETTING_FREE, DEBUG } from '../../constants'

function Home() {
    const navigate = useNavigate();
    const games = [
        {
            home: "Real Madrid",
            away: "Barcelona",
            homeOdd: "3.25",
            drawOdd: "3.80",
            awayOdd: "2.10",
            matchDay: "26",
            competition: "Premier League",
            date: "Today",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            status: "playing",
            timeElapsed: 37,
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            homeOdd: "3.25",
            drawOdd: "3.80",
            awayOdd: "2.10",
            matchDay: "26",
            competition: "Premier League",
            date: "Today",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            status: "paused",
            timeElapsed: 37,
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            homeOdd: "3.25",
            drawOdd: "3.80",
            awayOdd: "2.10",
            matchDay: "26",
            competition: "Premier League",
            date: "Today",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            status: "finished",
            timeElapsed: 37,
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
    ]


    const upcoming = [
        {
            home: "Arsenal",
            away: "Liverpool",
            homeOdd: "2.10",
            drawOdd: "3.20",
            awayOdd: "2.25",
            matchDay: "28",
            competition: "Premier League",
            date: "Tomorrow",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver"
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            homeOdd: "3.25",
            drawOdd: "3.80",
            awayOdd: "2.10",
            matchDay: "26",
            competition: "Premier League",
            date: "Today",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            homeOdd: "3.25",
            drawOdd: "3.80",
            awayOdd: "2.10",
            matchDay: "26",
            competition: "Premier League",
            date: "Today",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver"
        },
    ]

    const finishedGames = [
        {
            home: "Real Madrid",
            away: "Barcelona",
            matchDay: "26",
            competition: "Premier League",
            date: "Yesterday",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            matchDay: "26",
            competition: "Premier League",
            date: "Yesterday",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            matchDay: "26",
            competition: "Premier League",
            date: "Yesterday",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            matchDay: "26",
            competition: "Premier League",
            date: "Yesterday",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
        {
            home: "Real Madrid",
            away: "Barcelona",
            matchDay: "26",
            competition: "Premier League",
            date: "Yesterday",
            time: "19:45",
            venue: "Emirates Stadium",
            ref: "Michael Oliver",
            homeScore: 0,
            awayScore: 1,
            attendance: '61,234',
        },
    ]
    /*const returnActions = (status) => {
        switch (status) {
            case "pedning":
                return (<div />)
            case "pedning":
                return (<div />)
            case "pedning":
                return (<div />)
            case "pedning":
                return (<div />)
        }
    }*/

  return (
    <div className="main-content">
          <Controls isLive={false} />
        {/* Live Matches Section */}
        <div className="section-header">
            <h2><i className="fas fa-bolt"></i> Live Matches</h2>
            <NavLink to="/" className="view-all">View All</NavLink>
        </div>

        <div className="matches-grid">
            {
                games.map(game => {
                    return (
                        <div className="match-card live" onClick={() => navigate('/single/:id')}>
                            <div className="match-status">
                                <span>{game.competition} - Matchday {game.matchDay}</span>
                                {
                                    game.status === "finished" ? <span>Finished</span> : <div className="live-indicator">
                                        <i className="fas fa-circle"></i> LIVE
                                    </div>
                                }
                            </div>
                            <div className="match-teams">
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-lion"></i>
                                    </div>
                                    <div className="team-name">{game.home}</div>
                                </div>
                                <div className="match-score">
                                    <div className="score"><span className={game.status !== "finished" && "live-score"}>{game.homeScore}</span> - <span className={game.status !== "finished" && "live-score"}>{game.awayScore}</span></div>
                                    <div className="match-time">{
                                        game.status === "finished" ? "FT" : `${game.timeElapsed}'`
                                    }</div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-dragon"></i>
                                    </div>
                                    <div className="team-name">{game.away}</div>
                                </div>
                            </div>
                            {
                                BETTING_FREE ? (DEBUG ?
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
                                </div>)
                            }
                        </div>);
                })
            }
        </div>

        <div className="section-header">
                <h2><i className="fas fa-calendar-alt"></i> Upcoming Matches</h2>
                <NavLink to="/fixtures" className="view-all">View All</NavLink>
            </div>

            <div className="matches-grid">
            {
                upcoming.map(match => {
                    return (
                        <div className="match-card" data-match-id="4">
                            <div className="match-status">
                                <span>Premier League - Matchday {match.matchDay}</span>
                                <span>{match.date}</span>
                            </div>
                            <div className="match-teams">
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-sun"></i>
                                    </div>
                                    <div className="team-name">{match.home}</div>
                                </div>
                                <div className="match-score">
                                    <div className="score">- : -</div>
                                    <div className="match-time">{match.time}</div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-ship"></i>
                                    </div>
                                    <div className="team-name">{match.away}</div>
                                </div>
                            </div>
                            {
                                BETTING_FREE ? (<div className="match-info">
                                    <span><i className="fas fa-stadium"></i>{match.venue}</span>
                                </div>) :

                                (<div className="betting-options">
                                    <div className="bet-option">
                                        <div className="option-name">Home</div>
                                        <div className="option-odds">{match.homeOdd}</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Draw</div>
                                        <div className="option-odds">{match.drawOdd}</div>
                                    </div>
                                    <div className="bet-option">
                                        <div className="option-name">Away</div>
                                        <div className="option-odds">{match.awayOdd}</div>
                                    </div>
                                </div>)
                            }
                        </div>
                    )
                })
            }
            </div>

        {/* Recent Results Section */}
        {BETTING_FREE && <div className="section-header">
            <h2><i className="fas fa-history"></i> Recent Results</h2>
            <NavLink to="/" className="view-all">View All</NavLink>
        </div>}

        {BETTING_FREE && <div className="matches-grid">
            {
                finishedGames.map(match => {
                    return (
                        <div className="match-card">
                            <div className="match-status">
                                <span>{match.competition} - Matchday {match.matchDay}</span>
                                <span>{match.date}</span>
                            </div>
                            <div className="match-teams">
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-rocket"></i>
                                    </div>
                                    <div className="team-name">{match.home}</div>
                                </div>
                                <div className="match-score">
                                    <div className="score">{match.homeScore} - {match.awayScore}</div>
                                    <div className="match-time">FT</div>
                                </div>
                                <div className="team">
                                    <div className="team-logo">
                                        <i className="fas fa-feather-alt"></i>
                                    </div>
                                    <div className="team-name">{match.away}</div>
                                </div>
                            </div>
                            <div className="match-actions">
                                <button className="action-btn"><i className="fas fa-chart-line"></i> Stats</button>
                                <button className="action-btn"><i className="fas fa-video"></i> Highlights</button>
                                <button className="action-btn"><i className="fas fa-share-alt"></i> Share</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>}

        {!BETTING_FREE && <div className="section-header">
            <h2><i className="fas fa-gift"></i> Special Offers</h2>
            <NavLink to="/" className="view-all">View All</NavLink>
        </div>}

        {!BETTING_FREE && <div className="promotions">
            <div className="promo-card">
                <h3 className="promo-title">Welcome Bonus</h3>
                <p className="promo-desc">Get £30 in free bets when you deposit and bet £10</p>
                <button className="promo-btn">Claim Now</button>
            </div>

            <div className="promo-card">
                <h3 className="promo-title">Acca Boost</h3>
                <p className="promo-desc">Get up to 50% bonus on your accumulator wins</p>
                <button className="promo-btn">Learn More</button>
            </div>

            <div className="promo-card">
                <h3 className="promo-title">Free Bet Club</h3>
                <p className="promo-desc">Earn free bets every week with our loyalty program</p>
                <button className="promo-btn">Join Now</button>
            </div>
        </div>}
    </div>
  )
}

export default Home