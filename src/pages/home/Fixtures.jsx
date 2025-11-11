
import './Home.scss'
import Controls from '../../components/controls/Controls'
import { NavLink, useNavigate } from 'react-router-dom'
import { BETTING_FREE } from '../../constants'

function Fixtures() {
    const navigate = useNavigate();
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
            <div className="section-header">
                <h2><i className="fas fa-calendar-alt"></i> Upcoming Matches</h2>
                <div></div>
            </div>

            <div className="matches-grid">
            {
                upcoming.map(match => {
                    return (
                        <div className="match-card" data-match-id="4" onClick={() => navigate('/single/id')}>
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

export default Fixtures