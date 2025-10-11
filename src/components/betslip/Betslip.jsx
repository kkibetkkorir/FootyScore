
import { useState } from 'react'
import './Betslip.scss'
import { TAX_FEE } from '../../constants';


function Betslip({ visible, setVisible }) {
    const [stake, setStake] = useState(100);
    let slipItems = [
        {
            id: "1",
            pick: "1",
            home: "Arsenal",
            away: "Liverpool",
            pickOdd: "3.25"
        },
        {
            id: "2",
            pick: "x",
            home: "Real Madrid",
            away: "Barcelona",
            pickOdd: "3.20"
        },
        {
            id: "3",
            pick: "2",
            home: "Chelsea",
            away: "Man U",
            pickOdd: "2.10"
        },
        {
            id: "1",
            pick: "1",
            home: "Arsenal",
            away: "Liverpool",
            pickOdd: "3.25"
        },
        {
            id: "2",
            pick: "x",
            home: "Real Madrid",
            away: "Barcelona",
            pickOdd: "3.20"
        },
        {
            id: "3",
            pick: "2",
            home: "Chelsea",
            away: "Man U",
            pickOdd: "2.10"
        }
    ]

    const returnTotalOdds = () => {
        let intialOdd = 1;
        slipItems.forEach(item => {
            intialOdd  *= parseFloat(item.pickOdd)
        })

        return intialOdd.toFixed(2)
    }

    const handleCalculate = () => {
        let intialOdd = 1;
        slipItems.forEach(item => {
            intialOdd  *= parseFloat(item.pickOdd)
        })

        return ((stake /*- (stake * 20)/100*/ ) * (intialOdd /*- (intialOdd * 20)/100*/)).toFixed(2)
    }

  return (
    <div className={`bet-slip ${visible && "visible" }`}  id="betSlip">
        <div className="slip-header">
            <div className="slip-title">
                <i className="fas fa-receipt"></i> Bet Slip
                <span className="slip-count" id="slipCount">{slipItems.length}</span>
            </div>
            <button className="close-slip" id="closeSlip" onClick={() => setVisible(!visible)}>
                <i className="fas fa-times"></i>
            </button>
        </div>

        <div className="slip-items">
            {
                slipItems.map((item) => {
                    return (<div className="slip-item" key={item.id}>
                        <div className="item-details">
                            <div className="item-match">{item.home} vs {item.away}</div>
                            <div className="item-bet">
                                {item.pick === "1" && `${item.home} to win`}
                                {item.pick === "x" && `${"Draw"}`}
                                {item.pick === "2" && `${item.away} to win`}
                            </div>
                        </div>
                        <div className="item-odds">{item.pickOdd}</div>
                        <button className="remove-item" onClick={() => {
                            slipItems = slipItems.reduce(slipItem => slipItem !== item)
                        }}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>)
                })
            }
        </div>
        <div className="potential-win">
            <div className="values-container">
                <div>Stake: <strong>£{stake}</strong></div>
                <div>Tax: <strong>£{((TAX_FEE * stake)/100).toFixed(2)}</strong></div>
            </div>
            <div className="values-container">
                <div>Final Stake: <strong>£{(stake - ((TAX_FEE * stake)/100)).toFixed(2)}</strong></div>
                <div>Total Odds: <strong>{returnTotalOdds()}</strong></div>
            </div>
            <div>Potential win: <strong>£{(returnTotalOdds() * ((stake - ((TAX_FEE * stake)/100)).toFixed(2))).toFixed(2) /*(handleCalculate() - ((handleCalculate() * 20)/100)).toFixed(2)*/}</strong></div>
        </div>
        <div className="slip-controls">
            <input type='number' className="stake-input" placeholder="Enter stake" value={stake} onChange={(e) => {
                if (e.target.value > 5000) {
                    setStake(5000)
                    alert("amount exceeds maximum stake of 5000")
                } else if (e.target.value < 10) {
                    setStake(10)
                    alert("amount is less than minimum stake of 10")
                } else {
                    setStake(e.target.value)
                }
            }}  max={5000}  f/>
            <button className="place-bet" onClick={() => alert("Potential win " + handleCalculate())}>Place Bet</button>
        </div>
    </div>
  )
}

export default Betslip