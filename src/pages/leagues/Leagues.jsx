import React from 'react'
import './Leagues.scss'

function Leagues() {
  return (
    <div className="leagues">
        <div className="league-card active">
            <div className="league-logo">
                <i className="fas fa-crown"></i>
            </div>
            <div className="league-name">Premier League</div>
        </div>
        <div className="league-card">
            <div className="league-logo">
                <i className="fas fa-futbol"></i>
            </div>
            <div className="league-name">La Liga</div>
        </div>
        <div className="league-card">
            <div className="league-logo">
                <i className="fas fa-shield-alt"></i>
            </div>
            <div className="league-name">Bundesliga</div>
        </div>
        <div className="league-card">
            <div className="league-logo">
                <i className="fas fa-star"></i>
            </div>
            <div className="league-name">Serie A</div>
        </div>
        <div className="league-card">
            <div className="league-logo">
                <i className="fas fa-trophy"></i>
            </div>
            <div className="league-name">Ligue 1</div>
        </div>
    </div>
  )
}

export default Leagues