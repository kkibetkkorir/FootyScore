import { useEffect, useState } from 'react';
import { BETTING_FREE } from '../../constants'
import './Controls.scss'
const sports = ["Football", "Basketball", "Tennis", "Cricket", "Esports", "Live Betting", "Promotions"];
const categories = [
    {
        label: "All Matches",
        icon: "fa-fire"
    },
    {
        label: "Favorites",
        icon: "fa-star"
    },
    {
        label: "Premier League",
        icon: "fa-crown"
    },
    {
        label: "La Liga",
        icon: "fa-futbol"
    },
    {
        label: "Bundesliga",
        icon: "fa-shield-alt"
    },
    {
        label: "Serie A",
        icon: "fa-star"
    }
]


function Controls({isLive=false}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedSport, setSelectedSport] = useState("football");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [search, setSearch] = useState("");


    function displayDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();

        if (currentDate.toDateString() === today.toDateString()) {
            return currentDate.toLocaleDateString('en-US', options) + ' <span style="color: var(--highlight);">(Today)</span>';
        } else {
            return currentDate.toLocaleDateString('en-US', options);
        }
    }

    const handleClick = (type) => {
        const newDate = new Date(currentDate);
        if (type === "add") {
            newDate.setDate(newDate.getDate() + 1);
        } else {
            newDate.setDate(newDate.getDate() - 1);
        }
        setCurrentDate(newDate);
    }

    const handleDatePicker = () => {
        setShowDatePicker(true);
    }

    const handleDateChange = (e) => {
        if (e.target.value) {
            setCurrentDate(new Date(e.target.value));
            setShowDatePicker(false);
        }
    }

    const handleTodayClick = () => {
        setCurrentDate(new Date());
        setShowDatePicker(false);
    }

    // Close date picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showDatePicker && !e.target.closest('.date-picker-modal') && !e.target.closest('#datePicker')) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDatePicker]);

    useEffect(() => {
        setSelectedCategory(categories[0]);
    }, []);

    return (
        <div>
            {!BETTING_FREE && <div className="filters">
                {
                    sports.map(sport => {
                        return (<button
                            key={sports[sport]}
                            className={`filter-btn ${sport.toLocaleLowerCase() === selectedSport ? "active" : ""}`}
                            onClick={() => setSelectedSport(sport.toLocaleLowerCase())}
                        >{sport}</button>)
                    })
                }
            </div>}
            {!isLive && (
                <div className="date-selector">
                    <div className="date-navigation">
                        <button className="date-btn" id="prevDate" onClick={() => handleClick("minus")}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div className="current-date" id="currentDate" dangerouslySetInnerHTML={{ __html: displayDate() }}></div>
                        <button className="date-btn" id="nextDate" onClick={() => handleClick("add")}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <button className="date-calendar" id="datePicker" onClick={handleDatePicker}>
                        <i className="fas fa-calendar-alt"></i> Select Date
                    </button>

                    {/* Date Picker Modal */}
                    {showDatePicker && (
                        <div className="date-picker-modal" style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            background: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '10px',
                            zIndex: 1000,
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            <input
                                type="date"
                                value={currentDate.toISOString().split('T')[0]}
                                onChange={handleDateChange}
                                autoFocus
                            />
                            <button
                                onClick={handleTodayClick}
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px 10px',
                                    background: 'var(--highlight)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer'
                                }}
                            >
                                Today
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* Controls */}
            <div className="controls">
                <div className="filters">
                    {
                        categories.map(category => {
                            return (<button
                                key={categories[category]}
                                className={`filter-btn ${category === selectedCategory && "active"}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <i className={`fas ${category.icon}`}></i>
                                {category.label}
                            </button>)
                        })
                    }
                </div>
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search for teams, leagues..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Controls;