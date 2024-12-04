import { useState } from 'react'
import CountryService from './services/countries'
import Country from './components/Country'
import Countries from './components/Countries'
import Weather from './components/Weather'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState();
  const [country, setCountry] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (search) {
      CountryService.getAll().then((response) => {
        const filteredCountries = response.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setCountries(filteredCountries);

        if (filteredCountries.length === 1) {
          setCountry(filteredCountries[0]);
        }
      });
    }
  }, [search])

  useEffect(() => {
    if (country) {
      CountryService.getWeatherDetails(country)
        .then((response) => {
          setWeather(response);
        });
    }
  }, [country])

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const onCountryClick = async (e) => {
    const countryResponse = await CountryService.getCountry(e)
    setCountry(countryResponse);

    if (countryResponse) {
      const weatherResponse = await CountryService.getWeatherDetails(countryResponse)
      setWeather(weatherResponse);
    }
  }

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <ul>
        {
          countries.length == 1 ? <p></p> :
            countries.length <= 10 ?
              <Countries countries={countries} onCountryClick={onCountryClick}></Countries>
              :
              <p>Too many matches, specify another filter</p>
        }
      </ul>

      <div>
        {
          country ?
            <>
              <Country country={country}></Country>
              <Weather weather={weather}></Weather>
            </>
            : <p></p>
        }
      </div>
    </>
  )
}

export default App
