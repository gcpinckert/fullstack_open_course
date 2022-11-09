import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_COUNTRY_URL = 'https://restcountries.com/v3.1';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const Weather = ({ data }) => {
  if (data) {
    return (
      <div>
        <h3>Weather in {data.name}</h3>
        <div>temperature: {data.main.temp} F</div>
        <img alt={data.weather.description} src={`http://openweathermap.org/img/wn/${data.weather.icon}@2x.png`} />
      </div>
    )
  }
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_WEATHER_URL}?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
      .then(response => {
        setWeather(response.data);
      });
  }, [country]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map(pair => {
          return <li key={pair[0]}>{pair[1]}</li>
        })}
      </ul>
      <img alt={`${country.name.common} flag`} src={country.flags.svg} width="200" height="200"/>
      <Weather data={weather} />
    </div>
  )
}

const Countries = ({ countries, clickHandler }) => {
  if (countries.length > 10) {
    return (
      <div>
        To many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <CountryDetails country={countries[0]} />
    )
  } else {
    return (
      <div>
        {countries.map(country => 
          <div key={country.cca2}>
            {country.name.common}
            <button data-country={country.name.common} onClick={clickHandler}>show</button>
          </div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_COUNTRY_URL}/all`)
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setFilteredCountries(getCountriesMatchingSearch(event.target.value));
  }

  const handleShowCountry = (event) => {
    let countryName = event.target.getAttribute('data-country');
    setFilteredCountries(getCountriesMatchingSearch(countryName));
  }

  const getCountriesMatchingSearch = (searchTerm) => {
    let regex = new RegExp(`${searchTerm}`, 'i');
    return countries.filter(country => {
      return regex.test(country.name.common);
    });
  }

  return (
    <div>
      find countries: <input value={searchTerm} onChange={handleInputChange} />
      <Countries countries={filteredCountries} clickHandler={handleShowCountry}/>
    </div>
  )
}

export default App;
