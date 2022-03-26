import "./Forecast.css";
import React from 'react';
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Forecast({day, weather, temperature, weatherIcons}) {
    return (
        <Col className="forecast">
            <h6 className="forecast-day font-mono regular">{day.substring(0, 3)}</h6>
            <div className="forecast-icon">{weatherIcons[weather]}</div>
            <h5 className="forecast-temp">{Math.round(temperature)}°C</h5>
        </Col>
    )
}

export default Forecast
