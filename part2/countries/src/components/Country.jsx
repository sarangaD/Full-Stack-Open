import React from 'react'
import '../App.css'
import Weather from './Weather'
function Country({ country }) {

    return (
        <>
            <h2>{country.name.common}</h2>
            <p>capitol {country.capital}</p>
            <p>area {country.area}</p>
            <h3>Languages:</h3>
            <ul>
                {
                Object.values(country.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                ))
                }
            </ul>
            <img className='image' src={country.flags.svg}></img>
        </>
    )
}

export default Country