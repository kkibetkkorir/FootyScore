import './Header.scss'
import { APP_NAME, BETTING_FREE } from '../../constants'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const [isLightMode, setIsLightMode] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
      setIsLightMode(true)
      document.body.classList.add('light-mode')
    }
  }, [])

  const toggleTheme = () => {
    if (isLightMode) {
      // Switching to dark mode
      document.body.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      // Switching to light mode
      document.body.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    }
    setIsLightMode(!isLightMode)
  }

  return (
    <header>
      <div className="logo">
        {
          BETTING_FREE ? <><i className="fas fa-futbol" /><span>{APP_NAME}</span></> :
            <><i className="fas fa-coins" /><span>{APP_NAME}</span></>
        }
      </div>
        {
        BETTING_FREE ? (<nav className="nav-links">
          <NavLink to="/">All</NavLink>
          <NavLink to="/live">Live</NavLink>
          <NavLink to="/fixtures">Fixtures</NavLink>
          <NavLink to="/leagues">Leagues</NavLink>
        </nav>) :
          (<div className="user-actions">
            <div className="balance">
              <i className="fas fa-wallet"></i>
              £1,250.75
            </div>
            <button className="account-btn">
              <i className="fas fa-user"></i> My Account
                      </button>
            {
                !BETTING_FREE && <button className="icon-button" id="theme-toggle" onClick={toggleTheme}>
                    <i className={isLightMode ? "fas fa-sun" : "fas fa-moon"}></i>
                </button>
            }
          </div>)
          }
        {
            BETTING_FREE && <button className="icon-button" id="theme-toggle" onClick={toggleTheme} >
              <i className={isLightMode ? "fas fa-sun" : "fas fa-moon"}></i>
            </button>
        }
    </header>
  )
}

export default Header