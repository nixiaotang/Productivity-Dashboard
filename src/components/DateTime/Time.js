import "./Time.css";
import React, { useState, useEffect } from 'react';

function Time() {

    const [time, setDateTime] = useState(new Date());
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");

    useEffect(() => {
        const d = setInterval(() => setDateTime(new Date()), 500);

        return () => clearInterval(d);

    }, []);

    useEffect(() => {
        let h = time.toLocaleTimeString().substring(0, time.toLocaleTimeString().indexOf(":"));
        if(h.length !== 2) setHour("0"+h);
        else setHour(h);

        setMinute(time.toLocaleTimeString().substring(time.toLocaleTimeString().indexOf(":")+1, time.toLocaleTimeString().indexOf(":")+3));

    }, [time]);



    return (

        <div className="time">
            <div><h1 className="time-value font-mono">{hour}:{minute}</h1></div>
        </div>        

    )

}

export default Time;

