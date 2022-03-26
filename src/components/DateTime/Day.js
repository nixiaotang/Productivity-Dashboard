import "./Day.css";
import React, { useState, useEffect } from 'react'

function Day() {

    const [time, setDateTime] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const d = setInterval(() => setDateTime(new Date()), 500);
        return () => clearInterval(d);

    }, []);


    return (
        <div className="date-panel">
            <div className="date-header">
                <h5 className="date-day font-mono">{days[time.getDay()]}</h5>
            </div>
            <div className="date-content">
                <p className="date-month font-mono">{months[time.getMonth()]}</p>
                <h5 className="date-date black">{time.getDate()}</h5>
                <p className="date-year font-mono">{time.getFullYear()}</p>
            </div>
        </div>
    )
}

export default Day


