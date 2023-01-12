import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [isTooManyCountries, setIsTooManyCountries] = useState(false)
  const [isSpecificCountry, setIsSpecificCountry] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value;
    const countriesTemp = countries.filter(country => country.name.common.toUpperCase().includes(value.toUpperCase()))
    if (countriesTemp.length > 10) {
      setIsTooManyCountries(true)
      setIsSpecificCountry(false);
    } else if (countriesTemp.length === 1) {
      setIsTooManyCountries(false);
      setIsSpecificCountry(true);
      setCountriesToShow(countriesTemp)
    } else {
      setIsTooManyCountries(false);
      setIsSpecificCountry(false);
      setCountriesToShow(countriesTemp)
    }
  }

  return (
    <div className="App">
      find countries <input onChange={handleSearch}></input>
      {
        isTooManyCountries ?
          <p>Too many countries</p> :
          isSpecificCountry ?
            countriesToShow.map(country => {
              return (<>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h2>languages</h2>
                <ul>
                  {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png}></img>
              </>)
            }) :
            countriesToShow.map(country => <p key={country.name.common}>{country.name.common}</p>)
      }
    </div>
  );
}

export default App;
