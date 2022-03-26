import './Timer.css';
import React, { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Timer() {

    const [displayTime, setDisplayTime] = useState(["00", "00", "00"]);
    const [timerInput, setTimerInput] = useState([0, 0, 0]);
    const [timerLength, setTimerLength] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [curTime, setCurTime] = useState(null);



    const formatMilli = millis => {
        let h = Math.floor(millis/3600000);
        millis -= h * 3600000;

        let m = Math.floor(millis/60000);
        millis -= m * 60000;
        
        let s = Math.ceil(millis/1000);

        return [h, m, s];
    }

    const formatTime = time => {
        return time[0] * 3600000 + time[1] * 60000 + time[2] * 1000;
    }

    //Runs every millisecond to update current time
    useEffect(() => {

        if(startTime) {        
            const d = setInterval(() => setCurTime(new Date()), 100);
            return () => clearInterval(d);
        }

    });

    useEffect(() => {
        
        if(!startTime) {
            setDisplayTime(timerInput.map(val => val.toString().length === 2 ? val.toString() : "0"+val));
        }

    }, [timerInput])

    //if current time changes, update display
    useEffect(() => {

        if(startTime) {

            let timePassedMillis = curTime - startTime;
            let newDisplayTime = formatMilli(timerLength - timePassedMillis);
            setDisplayTime(newDisplayTime.map(val => val.toString().length === 2 ? val.toString() : "0"+val));

            if(timePassedMillis >= timerLength) {
                setDisplayTime(["00", "00", "00"]);
                setTimerLength([0, 0, 0]);
                setStartTime(null);
                setCurTime(null);

            }
        }

    }, [curTime])


    const startTimer = d => {
        setTimerLength(formatTime(timerInput));
        setStartTime(d);
        setCurTime(d);
    }


    const getPercentage = () => {
        return startTime ? (timerLength - (curTime - startTime)) / timerLength * 100 : 100;
    }


    return (
        <div className="timer-panel">

            <h4 className="bold">Timer</h4>

            <div className="progress-circle">
            <CircularProgressbar 
                value={getPercentage()} 
                text={`${displayTime[0]}:${displayTime[1]}:${displayTime[2]}`}
                styles={buildStyles({
                    strokeLinecap: "butt",
                    pathTransitionDuration: 0.3,
                    pathColor: "rgb(196, 98, 196)",
                    textColor: "rgb(196, 98, 196",
                    trailColor: "white"
                })}
            />
            </div>

            <div className="timer-input-section">

                <input 
                    type="text" 
                    className="timer-input"
                    placeholder="Hour"
                    onChange={e => setTimerInput([parseInt(e.target.value), timerInput[1], timerInput[2]])}
                    value={timerInput[0]}
                />

                <input 
                    type="text" 
                    className="timer-input"
                    placeholder="Hour"
                    onChange={e => setTimerInput([timerInput[0], parseInt(e.target.value), timerInput[2]])}
                    value={timerInput[1]}
                />

                <input 
                    type="text" 
                    className="timer-input"
                    placeholder="Hour"
                    onChange={e => setTimerInput([timerInput[0], timerInput[1], parseInt(e.target.value)])}
                    value={timerInput[2]}
                />

                <button className="timer-button" onClick={() => startTimer(new Date())}>Start</button>

            </div>
            
            
        </div>
    )
}

export default Timer
