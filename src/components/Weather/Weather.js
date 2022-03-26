import './Weather.css';
import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import { FaSearch } from 'react-icons/fa';
import { 
    TiWeatherCloudy,
    TiWeatherDownpour,
    TiWeatherNight,
    TiWeatherPartlySunny,
    TiWeatherShower,
    TiWeatherSnow,
    TiWeatherStormy,
    TiWeatherSunny,
    TiWeatherWindyCloudy
} from 'react-icons/ti';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//require('dotenv').config();

const weatherAPI = {
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {
    
    const [query, setQuery] = useState("Windsor");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]); //[{main, temp}, ...]

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date();
    const date = {
        day: d.getDay(),
        date: d.getDate()
    };

    const weatherIcons = {
        "Thunderstorm" : <TiWeatherStormy />,
        "Drizzle" : <TiWeatherShower />,
        "Rain" : <TiWeatherDownpour />,
        "Snow" : <TiWeatherSnow />,
        "Clear" : <TiWeatherSunny />, //"Clear" : [<TiWeatherSunny />, <TiWeatherNight />], //day, night
        "Clouds" : <TiWeatherCloudy />, //"Clouds" : [<TiWeatherPartlySunny />, <TiWeatherCloudy />], //few clouds, all other
        "Other" : <TiWeatherWindyCloudy />
    }

    //search weather
    const search = () => {
        if(!query || /^\s*$/.test(query)) {
            setQuery("");
            return;
        }

        fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`) //fetch data
            .then(res => res.json())
            .then(result => {
                setWeather(result); //update weather
            }).catch(err => console.log("ERROR : " + err));
        
        fetch(`${weatherAPI.base}forecast?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`) //fetch data
            .then(res => res.json())
            .then(result => {

                let newForecast = [];

                for(let i = 0; i < 40; i++) {

                    let forecastDate = parseInt(result.list[i].dt_txt.split(" ")[0].substring(8, 10))
                    let forecastHour = parseInt(result.list[i].dt_txt.split(" ")[1].substring(0, 2));

                    if(forecastHour === 12) {
                        newForecast.push({
                                weather: result.list[i].weather[0].main,
                                temp: result.list[i].main.temp
                            }
                        )

                    }
                }
                
                setForecast(newForecast); //update weather
                setQuery(""); //reset input field

            }).catch(err => console.log("ERROR : " + err));
    }

    //console.log(navigator.geolocation.getCurrentPosition(console.log, console.log));

    //on first render
    useEffect(() => {
        search();
    }, []);


    return (
        <Container className="weather-panel">

            <Row>
                <Col className="search">
                    <input 
                        type="text" 
                        className="search-bar"
                        placeholder="Search for city..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={e => {
                            if(e.code === "Enter") search() //enter to search
                        }}
                    />
                    <button className="search-button" onClick={search}><FaSearch /></button>
                </Col>
            </Row>

            {(typeof weather.main != "undefined") ? (
                <Row>
                    <Col>
                        <div className="weather">
                            <div className="weather-icon">
                                {typeof weatherIcons[weather.weather[0].main] != "undefined" ? weatherIcons[weather.weather[0].main] : weatherIcons["Other"]}
                            </div>
                            <div className="weather-box-1">
                                <div className="temperature">
                                    <h1 className="temp-value bold">{Math.round(weather.main.temp)}°C</h1>
                                </div>
                                <h4 className="location bold">{weather.name}, {weather.sys.country}</h4>
                                <h5 className="weather-description font-mono regular">{weather.weather[0].description}</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            ) : ""}
            
            {(typeof weather.main != "undefined" && forecast.length === 5) ? (
                <Row className="forecast-container">
                    <Forecast day={days[(date.day+1)%7]} weather={forecast[0].weather} temperature={forecast[0].temp} weatherIcons={weatherIcons} />
                    <Forecast day={days[(date.day+2)%7]} weather={forecast[1].weather} temperature={forecast[1].temp} weatherIcons={weatherIcons} />
                    <Forecast day={days[(date.day+3)%7]} weather={forecast[2].weather} temperature={forecast[2].temp} weatherIcons={weatherIcons} />
                    <Forecast day={days[(date.day+4)%7]} weather={forecast[3].weather} temperature={forecast[3].temp} weatherIcons={weatherIcons} />
                    <Forecast day={days[(date.day+5)%7]} weather={forecast[4].weather} temperature={forecast[4].temp} weatherIcons={weatherIcons} />
                </Row>
            ) : ""}

            
            
        </Container>
    )
}

export default Weather
