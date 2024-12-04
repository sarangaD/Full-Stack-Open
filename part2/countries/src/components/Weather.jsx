import React from 'react'

function Weather({ weather }) {
    if(weather===undefined)
        return;
    
    const iconUrl=`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

    return (
        <div>
            <h3>Weather in {weather.name}</h3>
            <p>temperature {weather.main.temp} Celcius</p>
            <img src={iconUrl}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather