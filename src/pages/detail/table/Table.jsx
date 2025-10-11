import React from 'react'
import './Table.scss'

function Table() {
  return (
    <div className="tab-content active" id="table">
            <h2>Premier League Table</h2>
            <table className="league-table">
                <thead>
                    <tr>
                        <th className="position">#</th>
                        <th>Team</th>
                        <th>PL</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="position">1</td>
                        <td>Manchester City</td>
                        <td>23</td>
                        <td>16</td>
                        <td>3</td>
                        <td>4</td>
                        <td>+35</td>
                        <td>51</td>
                    </tr>
                    <tr>
                        <td className="position">2</td>
                        <td>Liverpool</td>
                        <td>23</td>
                        <td>15</td>
                        <td>6</td>
                        <td>2</td>
                        <td>+32</td>
                        <td>51</td>
                    </tr>
                    <tr className="highlight">
                        <td className="position">3</td>
                        <td>Arsenal</td>
                        <td>23</td>
                        <td>15</td>
                        <td>4</td>
                        <td>4</td>
                        <td>+24</td>
                        <td>49</td>
                    </tr>
                    <tr>
                        <td className="position">4</td>
                        <td>Aston Villa</td>
                        <td>23</td>
                        <td>14</td>
                        <td>4</td>
                        <td>5</td>
                        <td>+19</td>
                        <td>46</td>
                    </tr>
                    <tr>
                        <td className="position">5</td>
                        <td>Tottenham</td>
                        <td>23</td>
                        <td>13</td>
                        <td>5</td>
                        <td>5</td>
                        <td>+14</td>
                        <td>44</td>
                    </tr>
                    <tr className="highlight">
                        <td className="position">6</td>
                        <td>Manchester United</td>
                        <td>23</td>
                        <td>12</td>
                        <td>2</td>
                        <td>9</td>
                        <td>-3</td>
                        <td>38</td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default Table