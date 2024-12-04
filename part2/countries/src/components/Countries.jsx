import React from 'react'

function Countries({ countries, onCountryClick }) {
    return (
        <ul>{
            countries.map(country =>
            <li key={country.name.common}> {country.name.common}
            &nbsp;
            <button onClick={()=>onCountryClick(country.name.common)}>show</button>
            </li>
            
            )
        }
        </ul>
    )
}

export default Countries