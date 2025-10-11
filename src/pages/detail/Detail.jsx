import './Detail.scss'
import Lineups from './lineups/Lineups'
//import Lineup from './tabs/lineup/Lineup'
import Table from './table/Table'
import H2H from './h2h/H2H'
import MatchHeader from './match-header/MatchHeader'
import MatchDetails from './match-details/MatchDetails'
import { useState } from 'react'
import Lineup from './lineup/Lineup'

function Detail() {
  const [tab, setTab] = useState('overview');

  const returnTab = () => {
    switch (tab) {
      case "overview":
        return <MatchDetails />
      case "h2h":
        return <H2H />
      case "table":
        return <Table />
      case "lineups":
        return <div className='l-container'><Lineup /><Lineups /></div>
      default:
        return <MatchDetails />
    }
  }
  return (
    <div className="detail-content" id="detailContent">
        <MatchHeader />
        <div className="tabs">
            <div className={`tab ${tab === "overview" && "active"}`} data-tab="match-details" onClick={() => setTab("overview")}>Overview</div>
            <div className={`tab ${tab === "h2h" && "active"}`} data-tab="h2h" onClick={() => setTab("h2h")}>H2H</div>
            <div className={`tab ${tab === "table" && "active"}`} data-tab="table" onClick={() => setTab("table")}>Table</div>
            <div className={`tab ${tab === "lineups" && "active"}`} data-tab="lineup" onClick={() => setTab("lineups")}>Lineups</div>
        </div>
        {returnTab()}
    </div>
  )
}

export default Detail