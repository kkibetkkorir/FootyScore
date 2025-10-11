import React from 'react'
import './H2H.scss'

function H2H() {
  return (
    <div className="tab-content" id="h2h">
            <h2>Last 5 Meetings</h2>
            <div className="h2h-matches">
                <div className="h2h-match">
                    <div className="h2h-team">Arsenal</div>
                    <div className="h2h-score">3 - 1</div>
                    <div className="h2h-team">Manchester United</div>
                    <div className="h2h-date">Jan 22, 2023</div>
                </div>
                <div className="h2h-match">
                    <div className="h2h-team">Manchester United</div>
                    <div className="h2h-score">1 - 0</div>
                    <div className="h2h-team">Arsenal</div>
                    <div className="h2h-date">Sep 4, 2022</div>
                </div>
                <div className="h2h-match">
                    <div className="h2h-team">Arsenal</div>
                    <div className="h2h-score">2 - 1</div>
                    <div className="h2h-team">Manchester United</div>
                    <div className="h2h-date">Apr 23, 2022</div>
                </div>
                <div className="h2h-match">
                    <div className="h2h-team">Manchester United</div>
                    <div className="h2h-score">3 - 2</div>
                    <div className="h2h-team">Arsenal</div>
                    <div className="h2h-date">Dec 2, 2021</div>
                </div>
                <div className="h2h-match">
                    <div className="h2h-team">Arsenal</div>
                    <div className="h2h-score">0 - 0</div>
                    <div className="h2h-team">Manchester United</div>
                    <div className="h2h-date">Jan 30, 2021</div>
                </div>
            </div>
        </div>
  )
}

export default H2H