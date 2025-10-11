import React from 'react'
import './MatchHeader.scss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function MatchHeader() {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div >
            <div className="detail-header">
                <button className="back-btn" id="backBtn" onClick={() => window.history.back()}>
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2>Match Details</h2>
            </div>

            <div className="match-card live">
                <div className="match-status">
                    <span>Premier League - Matchday 38</span>
                    <div className="live-indicator">
                        <i className="fas fa-circle"></i> LIVE
                    </div>
                </div>
                <div className="match-teams">
                    <div className="team">
                        <div className="team-logo">
                            <i className="fas fa-lion"></i>
                        </div>
                        <div className="team-name">Arsenal</div>
                    </div>
                    <div className="match-score">
                        <div className="score"><span className="live-score">2</span> - <span className="live-score">1</span></div>
                        <div className="match-time">63'</div>
                    </div>
                    <div className="team">
                        <div className="team-logo">
                            <i className="fas fa-dragon"></i>
                        </div>
                        <div className="team-name">Liverpool</div>
                    </div>
                </div>
                <div className="match-info">
                    <span><i className="fas fa-stadium"></i> Emirates Stadium</span>
                    <span><i className="fas fa-user"></i> 61,234</span>
                    <span><i className="fas fa-whistle"></i> Michael Oliver</span>
                </div>
                <NavLink to="/" className="highlight-btn">
                    <i className="fas fa-play-circle"></i> Watch Live
                </NavLink>
            </div>
    </div>
  )
}

export default MatchHeader