import './Home.scss'
import Controls from '../../components/controls/Controls'
import { useEffect, useState } from 'react';
import { useScheduledEvents } from '../../hooks/useScheduledEvents';
import { useNavigate } from 'react-router-dom';
import { BETTING_FREE } from '../../constants';

function Fixtures() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { fixtures, fixturesLoading, fixturesError } = useScheduledEvents(selectedDate.toISOString().split('T')[0]);
    const [leagues, setLeagues] = useState(null);
    const [filteredFixtures, setFilteredFixtures] = useState(null);
    const navigate = useNavigate();

    // Helper functions
    const formatMatchDate = (timestamp) => {
        const matchDate = new Date(timestamp * 1000);
        const today = new Date();

        if (matchDate.getDate() === today.getDate() &&
            matchDate.getMonth() === today.getMonth() &&
            matchDate.getFullYear() === today.getFullYear()) {
            return "Today";
        }

        return matchDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).replace(/(\d+)/, (day) => {
            const d = parseInt(day);
            return d + (d % 10 === 1 && d !== 11 ? 'st' :
                d % 10 === 2 && d !== 12 ? 'nd' :
                d % 10 === 3 && d !== 13 ? 'rd' : 'th');
        });
    };

    // Extract unique leagues from fixtures
    useEffect(() => {
        const allLeagues = new Map();

        // Add leagues from fixtures
        if (fixtures) {
            fixtures.forEach(fixture => {
                if (fixture.tournament && !allLeagues.has(fixture.tournament.id)) {
                    allLeagues.set(fixture.tournament.id, {
                        id: fixture.tournament.id,
                        name: fixture.tournament.name,
                        slug: fixture.tournament.slug,
                        category: fixture.tournament.category,
                        uniqueTournament: fixture.tournament.uniqueTournament,
                        priority: fixture.tournament.priority,
                        icon: "fa-futbol"
                    });
                }
            });
        }

        setLeagues(Array.from(allLeagues.values()));
    }, [fixtures]);

    // Filter fixtures based on league and search
    useEffect(() => {
        let filtered = fixtures;

        // Apply league filter
        if (selectedLeague && filtered) {
            filtered = filtered.filter(fixture =>
                fixture.tournament.id === selectedLeague.id
            );
        }

        // Apply search filter
        if (searchQuery && filtered) {
            filtered = filtered.filter(fixture =>
                fixture.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fixture.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                fixture.tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredFixtures(filtered);
    }, [fixtures, selectedLeague, searchQuery]);

    return (
        <div className="main-content">
            <Controls
                isLive={false}
                leagues={leagues}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                selectedLeague={selectedLeague}
                onLeagueChange={setSelectedLeague}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="section-header">
                <h2><i className="fas fa-calendar-alt"></i> Matches - {selectedDate.toDateString()}</h2>
            </div>

            <div className="matches-grid">
                {filteredFixtures && filteredFixtures.length > 0 ? (
                    filteredFixtures.map(match => (
                        match.status.type === "notstarted" ? (
                            <div className="match-card" key={match.id} onClick={() => navigate(`/live/${match.id}`)}>
                                <div className="match-status">
                                    <span>{match.tournament.name}</span>
                                    <span>{formatMatchDate(match.startTimestamp)}</span>
                                </div>
                                <div className="match-teams">
                                    <div className="team">
                                        <img
                                            src={`https://img.sofascore.com/api/v1/team/${match.homeTeam.id}/image`}
                                            alt=""
                                            className="team-logo"
                                        />
                                        <div className="team-name">{match.homeTeam.name}</div>
                                    </div>
                                    <div className="match-score">
                                        <div className="score">-:-</div>
                                        <div className="match-time">
                                            {new Date(match.startTimestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})}
                                        </div>
                                    </div>
                                    <div className="team">
                                        <img
                                            src={`https://img.sofascore.com/api/v1/team/${match.awayTeam.id}/image`}
                                            alt=""
                                            className="team-logo"
                                        />
                                        <div className="team-name">{match.awayTeam.name}</div>
                                    </div>
                                </div>
                                {
                                /*BETTING_FREE ? (<div className="match-info">
                                    <span><i className="fas fa-stadium"></i>{match.venue}</span>
                                </div>) :*/
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
                        ) : ( BETTING_FREE &&
                            <div className="match-card" key={match.id} onClick={() => navigate(`/live/${match.id}`)}>
                                <div className="match-status">
                                    <span>{match.tournament.name}</span>
                                    <span>
                                        {(() => {
                                            const matchDate = new Date(match.startTimestamp * 1000);
                                            const today = new Date();

                                            if (matchDate.getDate() === today.getDate() &&
                                                matchDate.getMonth() === today.getMonth() &&
                                                matchDate.getFullYear() === today.getFullYear()) {
                                                return `Today, ${matchDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
                                            } else {
                                                return matchDate.toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }).replace(/(\d+)/, (day) => {
                                                    const d = parseInt(day);
                                                    return d + (d % 10 === 1 && d !== 11 ? 'st' :
                                                        d % 10 === 2 && d !== 12 ? 'nd' :
                                                        d % 10 === 3 && d !== 13 ? 'rd' : 'th');
                                                }) + `, ${matchDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
                                            }
                                        })()}
                                    </span>
                                </div>
                                <div className="match-teams">
                                    <div className="team">
                                        <img
                                            src={`https://img.sofascore.com/api/v1/team/${match.homeTeam.id}/image`}
                                            alt=""
                                            className="team-logo"
                                        />
                                        <div className="team-name">{match.homeTeam.name}</div>
                                    </div>
                                    <div className="match-score">
                                        <div className="score">{match.homeScore.display} - {match.awayScore.display}</div>
                                        <div className="match-time">FT</div>
                                    </div>
                                    <div className="team">
                                        <img
                                            src={`https://img.sofascore.com/api/v1/team/${match.awayTeam.id}/image`}
                                            alt=""
                                            className="team-logo"
                                        />
                                        <div className="team-name">{match.awayTeam.name}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div className="no-matches">No matches found for selected filters</div>
                )}
            </div>
        </div>
    )
}

export default Fixtures;