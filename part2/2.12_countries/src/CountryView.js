import { useEffect, useState } from 'react'
import axios from "axios";

const CountryView = ({ country }) => {

  const [isWeatherLoaded, setIsWeatherLoaded] = useState(false)
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}&units=metric`)
      .then((response) => {
        setIsWeatherLoaded(true);
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img alt={`${country.name.common} flag`} src={country.flags.png}></img>
      {isWeatherLoaded ?
        <>
          <h2>weather in {country.capital}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p>wind {weather.wind.speed} m/s</p>
        </> : <></>
      }
    </div >
  )
}

export default CountryView